import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';

import { getLastItems } from '../../../utils/requests/requests';

import ErrorMessage from '../../../components/ErrorMessage';
import Spinner from '../../../components/Spinner';
import ItemCard from '../../../components/cards/item-card/item-card';

const LastItems = () => {
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