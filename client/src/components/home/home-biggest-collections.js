import React, { useState, useEffect } from 'react';
import { Stack, Typography, Grid } from '@mui/material';

import { getBiggestCollections } from '../../utils/requests/requests';
import ErrorMessage from '../ErrorMessage';
import Spinner from '../Spinner';
import CollectionCard from '../account/account-collections/collection-card';

const HomeBiggestCollections = () => {
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
    <Stack>
      <Typography variant="h6" mb={4}>The biggest collections</Typography>
      {errorMessage}
      {spinner}
      {content}
    </Stack>
  );
}

export default HomeBiggestCollections;