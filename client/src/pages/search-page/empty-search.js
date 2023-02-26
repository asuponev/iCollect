import React from 'react';
import { Stack, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

const EmptySearch = ({ value }) => {
  return (
    <Stack my={10} alignItems="center" justifyContent="center">
      <Typography fontSize={14} color="#9B9EA4" textAlign="center">
        <FormattedMessage id="app.search-results.empty" values={{ br: <br />, value: value }} />
      </Typography>
    </Stack>
  );
}

export default EmptySearch;