import React, { useState, useEffect } from 'react';
import { Stack, Typography } from '@mui/material';

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
        console.log(res)
        setBiggestCollections(res);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setError(error.message);
      })
  }

  const collections = biggestCollections.map(collection => {
    return (
      <CollectionCard
        key={collection._id}
        {...collection}
        hidden={true}
      />
    )
  })

  const errorMessage = error ? <ErrorMessage error={error} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <Stack direction="row" flexWrap="wrap" gap={2}>
      {collections}
    </Stack>
  ) : null;

  return (
    <Stack mt={5}>
      <Typography variant="h6" mb={4}>The biggest collections</Typography>
      {errorMessage}
      {spinner}
      {content}
    </Stack>
  )
}

export default HomeBiggestCollections;