import React, { useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/material';

import { getAllTags } from '../../utils/requests/requests';
import ErrorMessage from '../ErrorMessage';
import Spinner from '../Spinner';
import TagsCloud from './home-elements/tags-cloud';

const HomeTagsCloud = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    onRequest();
  }, []);

  const onRequest = () => {
    setError(null);
    setLoading(true);
    getAllTags()
      .then(res => {
        setTags(res);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setError(error.message);
      })
  };

  const errorMessage = error ? <ErrorMessage error={error} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? <TagsCloud tags={tags} /> : null;

  return (
    <Stack my={5} alignItems="center">
      <Typography variant="h6" mb={4}>Explore by tags</Typography>
      {errorMessage}
      {spinner}
      {content}
    </Stack>
  );
}

export default HomeTagsCloud;