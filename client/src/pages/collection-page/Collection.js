import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Stack } from '@mui/material';

import { requestGetCollection } from '../../store/action-creators/collection';

import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import BreadCrumbs from '../../components/BreadCrumbs';
import CollectionInfo from './sections/collection-info';
import Items from './sections/Items';

export const Collection = () => {
  const { collectionId } = useParams();
  const dispatch = useDispatch();
  const { loading, collection, error } = useSelector(state => state.collection);

  useEffect(() => {
    dispatch(requestGetCollection(collectionId));
    // eslint-disable-next-line
  }, [collectionId]);

  const authorName = `
  ${collection.authorId?.firstName} 
  ${collection.authorId?.lastName}
`;

  const errorMessage = error ? <ErrorMessage error={error} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <Stack mb={10}>
      <BreadCrumbs
        prevLinks={[{
          [authorName]: `/users/${collection.authorId?._id}`
        }]}
        current={collection.title}
      />
      <CollectionInfo data={collection} />
      <Items collectionId={collectionId} />
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