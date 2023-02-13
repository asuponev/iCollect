import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOneCollection, getOneUser } from '../utils/requests/requests';

import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import BreadCrumbs from '../components/BreadCrumbs';
import CollectionView from '../components/collection/collection-view';

export const Collection = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [collectionData, setCollectionData] = useState({});
  const [authorInfo, setAuthorInfo] = useState({});

  useEffect(() => {
    onCollectionRequest(id);
  }, [id]);

  useEffect(() => {
    if (collectionData.authorId) {
      onUserInfoRequest(collectionData.authorId);
    }
  }, [collectionData.authorId]);

  const onCollectionRequest = (id) => {
    setError(null);
    setLoading(true);
    getOneCollection(id)
      .then(res => {
        setCollectionData(res);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setError(error.message);
      })
  }

  const onUserInfoRequest = (id) => {
    getOneUser(id)
      .then(res => {
        setAuthorInfo(res);
      })
      .catch(error => {
        setError(error.message);
      })
  }

  const authorName = `${authorInfo.firstName || ''} ${authorInfo.lastName || ''}`;

  const errorMessage = error ? <ErrorMessage error={error} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <>
      <BreadCrumbs
        prevLinks={[
          { Home: '/' },
          { [authorName]: `/users/${authorInfo._id}` }
        ]}
        current={collectionData.title}
      />
      <CollectionView
        collectionData={collectionData}
      />
    </>
  ) : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
}