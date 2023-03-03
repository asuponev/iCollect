import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';

import { requestGetLastItems } from '../../../store/action-creators/items';

import ErrorMessage from '../../../components/ErrorMessage';
import Spinner from '../../../components/Spinner';
import ItemCard from '../../../components/cards/item-card/item-card';

const LastItems = () => {
  const dispatch = useDispatch();
  const { loading, lastItems, error } = useSelector(state => state.items);

  useEffect(() => {
    dispatch(requestGetLastItems());
    // eslint-disable-next-line
  }, []);

  const items = lastItems.map(item => {
    return (
      <Grid item lg={3} md={4} sm={6} xs={12} key={item._id}>
        <ItemCard {...item} />
      </Grid>
    );
  });

  const errorMessage = error ? <ErrorMessage error={error} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <Grid container spacing={2}>
      {items}
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

export default LastItems;