import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';

import { getBiggestCollections } from '../../../utils/requests/requests';

import ErrorMessage from '../../../components/ErrorMessage';
import Spinner from '../../../components/Spinner';
import CollectionCard from '../../../components/cards/collection-card/collection-card';

const BiggestCollections = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [biggestCollections, setBiggestCollections] = useState([]);

  useEffect(() => {
    onRequest();
  }, []);

  const onRequest = () => {
    setError(null);
    setLoading(true);
    getBiggestCollections()
      .then(res => {
        setBiggestCollections(res);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setError(error.message);
      })
  };

  const collections = biggestCollections.map(collection => {
    return (
      <Grid item lg={3} md={4} sm={6} xs={12} key={collection._id}>
        <CollectionCard {...collection} />
      </Grid>
    )
  });

  const errorMessage = error ? <ErrorMessage error={error} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <Grid container spacing={2}>
      {collections}
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