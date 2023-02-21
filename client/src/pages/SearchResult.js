import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Stack, Typography, Grid } from '@mui/material';
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
  const [byTag, setByTag] = useState(false);

  useEffect(() => {
    value.slice(0, 7) === '--tag--' ? setByTag(true) : setByTag(false);
  }, [value]);

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
      <Grid item lg={3} md={4} sm={6} xs={12} key={item._id}>
        <ItemCard {...item} />
      </Grid>
    );
  });

  const errorMessage = error ? <ErrorMessage error={error} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <Grid container spacing={2} mt={4} mb={10}>
      {itemsCards}
    </Grid>
  ) : null;

  return (
    <>
      <BreadCrumbs
        prevLinks={[{ 'Home': '/' }]}
        current='Search'
      />
      <Stack mt={4} spacing={1}>
        <Typography variant="h6" color="#142339" noWrap>
          {
            byTag
              ? <>Search results for tag «{value.slice(7)}»</>
              : <>Search results for «{value}»</>
          }
        </Typography>
        <Typography fontSize={14} color="#9B9EA4">
          {items.length} results
        </Typography>
      </Stack>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
}