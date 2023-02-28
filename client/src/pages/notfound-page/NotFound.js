import React from 'react';
import { Link } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

export const NotFound = () => {
  return (
    <Stack alignItems="center" justifyContent="center" spacing={5} mt={15}>
      <Typography variant="h5">
        <FormattedMessage id="app.notfound.text" />
      </Typography>
      <Link to='/'>
        <FormattedMessage id="app.notfound.link" />
      </Link>
    </Stack>
  );
}