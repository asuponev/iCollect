import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getOneCollection } from '../../utils/requests/requests';

import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import BreadCrumbs from '../../components/BreadCrumbs';
import CollectionInfo from './sections/collection-info';
import Items from './sections/items';

export const Collection = () => {
  const { collectionId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [collectionData, setCollectionData] = useState({});

  useEffect(() => {
    onCollectionRequest(collectionId);
  }, [collectionId]);

  const onCollectionRequest = (collectionId) => {
    setError(null);
    setLoading(true);
    getOneCollection(collectionId)
      .then(res => {
        setCollectionData(res);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setError(error.message);
      })
  };

  const authorName = `
  ${collectionData.authorId?.firstName} 
  ${collectionData.authorId?.lastName}
`;

  const errorMessage = error ? <ErrorMessage error={error} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <>
      <BreadCrumbs
        prevLinks={[{
          [authorName]: `/users/${collectionData.authorId._id}`
        }]}
        current={collectionData.title}
      />
      <CollectionInfo data={collectionData} />
      <Items
        collectionId={collectionId}
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