import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOneCollection } from '../utils/requests/requests';

import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import CollectionBreadcrumbs from '../components/collection/view-blocks/collection-breadcrumbs';
import CollectionView from '../components/collection/collection-view';

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

  const errorMessage = error ? <ErrorMessage error={error} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <>
      <CollectionBreadcrumbs collectionData={collectionData} />
      <CollectionView
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