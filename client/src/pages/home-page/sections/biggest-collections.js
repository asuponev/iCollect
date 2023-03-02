import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';

import { requestGetBiggestCollections } from '../../../store/action-creators/collections';

import ErrorMessage from '../../../components/ErrorMessage';
import Spinner from '../../../components/Spinner';
import CollectionCard from '../../../components/cards/collection-card/collection-card';

const BiggestCollections = () => {
  const dispatch = useDispatch();
  const { loading, biggestCollections, error } = useSelector(state => state.collections);

  useEffect(() => {
    dispatch(requestGetBiggestCollections());
    // eslint-disable-next-line
  }, []);

  const cards = biggestCollections.map(collection => {
    return (
      <Grid item lg={3} md={4} sm={6} xs={12} key={collection._id}>
        <CollectionCard data={collection} />
      </Grid>
    )
  });

  const errorMessage = error ? <ErrorMessage error={error} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <Grid container spacing={2}>
      {cards}
    </Grid>
  ) : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
}

export default BiggestCollections;