import React, { useEffect, useState } from 'react';
import { Grid, Stack, Typography } from '@mui/material';

import { getLastItems } from '../../utils/requests/requests';
import ItemCard from './home-elements/item-card';
import ErrorMessage from '../ErrorMessage';
import Spinner from '../Spinner';

const HomeLastItems = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastItems, setLastItems] = useState([]);

  useEffect(() => {
    onRequest();
  }, []);

  const onRequest = () => {
    setError(null);
    setLoading(true);
    getLastItems()
      .then(res => {
        setLastItems(res);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setError(error.message);
      })
  };

  const items = lastItems.map(item => {
    return (
      <Grid item lg={3} md={6} xs={12} key={item._id}>
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
    <Stack mt={5}>
      <Typography variant="h6" mb={4}>Last added items</Typography>
      {errorMessage}
      {spinner}
      {content}
    </Stack>
  );
}

export default HomeLastItems;