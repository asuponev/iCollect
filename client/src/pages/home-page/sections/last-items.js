import React from 'react';
import { Grid } from '@mui/material';

import { useGetLastItemsQuery } from '../../../store/api/items.api';

import ErrorMessage from '../../../components/ErrorMessage';
import Spinner from '../../../components/Spinner';
import ItemCard from '../../../components/cards/item-card/item-card';

const LastItems = () => {
  const { isLoading, data, isError, error } = useGetLastItemsQuery();

  if (isLoading) {
    return <Spinner />;
  };

  if (isError) {
    return <ErrorMessage error={error.error} />;
  };

  return (
    <Grid container spacing={2}>
      {data.map(item => {
        return (
          <Grid item lg={3} md={4} sm={6} xs={12} key={item._id}>
            <ItemCard {...item} />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default LastItems;