import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Stack, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { getTags } from '../../../store/action-creators/tags';
import CustomizeMui from '../../../utils/theme/customizeMui';

import ErrorMessage from '../../../components/ErrorMessage';
import Spinner from '../../../components/Spinner';

const TagsCloud = () => {
  const dispatch = useDispatch();
  const { loading, tags, error } = useSelector(state => state.tags);
  const [countView, setCountView] = useState(10);

  const { tagStylesCloud } = CustomizeMui();

  useEffect(() => {
    dispatch(getTags());
    // eslint-disable-next-line
  }, []);

  const tagsView = tags.map((tag, i) => {
    return (
      <Link to={`/search/--tag--${tag}`} style={{ textDecoration: "none" }} key={i}>
        <Typography sx={tagStylesCloud} noWrap>
          {tag}
        </Typography>
      </Link>
    );
  });

  const errorMessage = error ? <ErrorMessage error={error} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <Stack direction="row" flexWrap="wrap" gap={1}>
      {tagsView.slice(0, countView)}
      {
        tagsView.length > countView ? (
          <Box onClick={() => setCountView(prev => prev + 10)}>
            <Typography sx={tagStylesCloud} noWrap>
              +10
            </Typography>
          </Box>
        ) : (
          <Box onClick={() => setCountView(10)}>
            <Typography sx={tagStylesCloud} noWrap>
              <FormattedMessage id="app.home-page.tagshide" />
            </Typography>
          </Box>
        )
      }
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