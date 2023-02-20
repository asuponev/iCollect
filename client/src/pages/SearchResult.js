import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import { getSearchItems } from '../utils/requests/requests';
import BreadCrumbs from '../components/BreadCrumbs';
import ErrorMessage from '../components/ErrorMessage';
import Spinner from '../components/Spinner';
import ItemCard from '../components/home/home-elements/item-card';

export const SearchResult = () => {
  const { value } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    onRequest(value);
  }, [value]);

  const onRequest = (value) => {
    setError(null);
    setLoading(true);
    getSearchItems(value)
      .then(res => {
        setItems(res);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setError(error.message);
      })
  };

  const itemsCards = items.map(item => {
    return (
      <ItemCard
        key={item._id}
        {...item}
      />
    )
  });

  const errorMessage = error ? <ErrorMessage error={error} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <Stack direction="row" flexWrap="wrap" gap={2} my={4}>
      {itemsCards}
    </Stack>
  ) : null;

  return (
    <>
      <BreadCrumbs
        prevLinks={[{ 'Home': '/' }]}
        current='Search'
      />
      <Stack mt={5}>
        <Typography variant="h6" mb={1} color="#142339">
          Search results for «{value}»
        </Typography>
        <Typography fontSize={14} color="#9B9EA4">
          {items.length} results
        </Typography>
        {errorMessage}
        {spinner}
        {content}
      </Stack>
    </>
  );
}