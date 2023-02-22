import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Stack } from '@mui/material';
import { getItem } from '../utils/requests/requests';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import BreadCrumbs from '../components/BreadCrumbs';
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
  };

  const authorName = `
  ${itemData.collection?.authorId.firstName} 
  ${itemData.collection?.authorId.lastName}
`;
  const collectionTitle = `${itemData.collection?.title}`;

  const errorMessage = error ? <ErrorMessage error={error} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <Stack mb={10} spacing={4}>
      <BreadCrumbs
        prevLinks={[
          { [authorName]: `/users/${itemData.collection.authorId._id}` },
          { [collectionTitle]: `/collections/${itemData.collection._id}` }
        ]}
        current={itemData.title}
      />
      <ItemView itemData={itemData} />
    </Stack>

  ) : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
}