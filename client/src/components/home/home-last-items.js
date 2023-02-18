import React, { useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/material';

import { getLastItems } from '../../utils/requests/requests';
import ItemCard from './home-elements.js/item-card';
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
  }

  const items = lastItems.map(item => {
    return (
      <ItemCard
        key={item._id}
        {...item}
      />
    )
  })

  const errorMessage = error ? <ErrorMessage error={error} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <Stack direction="row" flexWrap="wrap" gap={2}>
      {items}
    </Stack>
  ) : null;

  return (
    <Stack mt={5}>
      <Typography variant="h6" mb={4}>Last added items</Typography>
      {errorMessage}
      {spinner}
      {content}
    </Stack>
  )
}

export default HomeLastItems;