import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getItem, getOneCollection, getOneUser } from '../utils/requests/requests';

import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import ItemView from '../components/item/item-view';

export const Item = () => {
  const { collectionId, itemId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemData, setItemData] = useState({});
  const [collectionData, setCollectionData] = useState([]);
  const [authorData, setAuthorData] = useState({});

  useEffect(() => {
    onItemRequest(collectionId, itemId);
    onCollectionRequest(collectionId);
  }, [collectionId, itemId]);

  useEffect(() => {
    if (collectionData.authorId) {
      onAuthorRequest(collectionData.authorId);
    }
  }, [collectionData.authorId]);

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

  const onCollectionRequest = (collectionId) => {
    getOneCollection(collectionId)
      .then(res => {
        setCollectionData(res);
      })
      .catch(error => {
        setError(error.message);
      })
  }

  const onAuthorRequest = (userId) => {
    getOneUser(userId)
      .then(res => {
        setAuthorData(res);
      })
      .catch(error => {
        setError(error.message);
      })
  }

  const errorMessage = error ? <ErrorMessage error={error} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <ItemView
      itemData={itemData}
      collectionData={collectionData}
      authorData={authorData}
    />
  ) : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  )
}