import React from 'react';
import { Stack, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

const EmptyTable = () => {
  return (
    <Stack my={10} alignItems="center" justifyContent="center">
      <Typography fontSize={14} color="#9B9EA4">
        <FormattedMessage id="app.collection.emptytable" />
      </Typography>
    </Stack>
  );
}

export default EmptyTable;