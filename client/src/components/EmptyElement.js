import React from 'react';
import { Stack, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

const emptyText = {
  table: "app.collection.emptytable",
  account: "app.account.empty",
  search: "app.search-results.empty"
}

const EmptyElement = ({ target, values }) => {
  return (
    <Stack my={10} alignItems="center" justifyContent="center">
      <Typography fontSize={14} color="#9B9EA4" textAlign="center">
        <FormattedMessage id={emptyText[target]} values={values} />
      </Typography>
    </Stack>
  );
}

export default EmptyElement;