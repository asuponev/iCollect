import React from 'react';
import { Stack, Grid, Typography } from '@mui/material';

import imageNotFound from '../../../utils/constants/image-not-found';

const CollectionInfo = ({ data }) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center" my={4}>
      <img
        src={`${data.coverUrl || imageNotFound}`}
        alt={data.title}
        style={{ objectFit: "cover", borderRadius: "8px" }}
        width="100" height="100"
      />
      <Grid container wrap="nowrap" direction="column" width="calc(100% - 116px)">
        <Typography variant="h5" sx={{ wordWrap: "break-word" }}>
          {data.title}
        </Typography>
        <Typography color="text.secondary" sx={{ wordWrap: "break-word" }}>
          {data.description}
        </Typography>
      </Grid>
    </Stack>
  );
}

export default CollectionInfo;