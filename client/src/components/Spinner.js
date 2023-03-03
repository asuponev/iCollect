import React from 'react';
import { Stack, CircularProgress, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

const Spinner = () => {
  return (
    <Stack alignItems="center" justifyContent="center" spacing={3} my={10}>
      <CircularProgress />
      <Typography>
        <FormattedMessage id="app.loading" />
      </Typography>
    </Stack>
  );
}

export default Spinner;