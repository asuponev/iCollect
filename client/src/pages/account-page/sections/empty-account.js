import React from 'react';
import { Stack, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

const EmptyAccount = () => {
  return (
    <Stack my={10} alignItems="center" justifyContent="center">
      <Typography fontSize={14} color="#9B9EA4">
        <FormattedMessage id="app.account.empty" />
      </Typography>
    </Stack>
  );
}

export default EmptyAccount;