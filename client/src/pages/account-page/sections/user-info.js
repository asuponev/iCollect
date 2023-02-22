import React from 'react';
import { Stack, Avatar, Typography, Grid } from '@mui/material';

import ErrorMessage from '../../../components/ErrorMessage';

const UserInfo = ({ data }) => {
  if (!Object.keys(data).length) return <ErrorMessage />;

  return (
    <Stack direction="row" spacing={2} alignItems="center" mt={4} mb={6}>
      <Avatar
        sx={{
          background: "linear-gradient(180deg, #F43B47 0%, #453A94 100%)",
          width: 72,
          height: 72,
          fontSize: 24,
        }}>
        {data.firstName[0]}{data.lastName[0]}
      </Avatar>
      <Grid container wrap="nowrap" direction="column" width="calc(100% - 88px)">
        <Typography variant="h6" noWrap>
          {data.firstName} {data.lastName}
        </Typography>
        <Typography variant="caption" fontSize="14px" color="text.secondary" noWrap>
          {data.email}
        </Typography>
      </Grid>
    </Stack>
  );
}

export default UserInfo;