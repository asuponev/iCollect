import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getItem } from '../utils/requests/requests';

import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import ItemView from '../components/item/item-view';

export const Item = () => {
  const { collectionId, itemId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemData, setItemData] = useState({});

  useEffect(() => {
    onItemRequest(collectionId, itemId);
  }, [collectionId, itemId]);

  const onItemRequest = (collectionId, itemId) => {
    setError(null);
    setLoading(true);
    getItem(collectionId, itemId)
      .then(res => {
        setItemData(res);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setError(error.message);
      })
  }

  const errorMessage = error ? <ErrorMessage error={error} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <ItemView itemData={itemData} />
  ) : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  )
}