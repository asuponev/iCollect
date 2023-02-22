import React, { useEffect, useState } from 'react';
import { Typography, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

import { getAllTags } from '../../../utils/requests/requests';

import ErrorMessage from '../../../components/ErrorMessage';
import Spinner from '../../../components/Spinner';

const TagsCloud = () => {
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

  const tagStyle = {
    color: "#797E85",
    backgroundColor: "#EEEFF0",
    borderRadius: "100px",
    padding: "10px 18px",
    "&:hover": {
      color: "#142339",
      backgroundColor: "#DEDFE1",
    }
  };

  const tagsView = tags.map((tag, i) => {
    return (
      <Link to={`/search/--tag--${tag}`} style={{ textDecoration: "none" }} key={i}>
        <Typography sx={tagStyle} noWrap>
          {tag}
        </Typography>
      </Link>
    );
  });

  const errorMessage = error ? <ErrorMessage error={error} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <Stack direction="row" flexWrap="wrap" gap={1}>
      {tagsView}
    </Stack>
  ) : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
}

export default TagsCloud;