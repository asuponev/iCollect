import React from 'react';
import { Stack, Typography } from '@mui/material';
import imageNotFound from '../../../utils/constants/image-not-found';

const CollectionInfo = ({ data }) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center" my={4}>
      <img
        src={`${data.coverUrl || imageNotFound}`}
        alt={data.title}
        style={{ objectFit: "cover", borderRadius: "8px"}}
        width="100" height="100"
      />
      <Stack maxWidth={400}>
        <Typography variant="h6">{data.title}</Typography>
        <Typography>{data.description}</Typography>
      </Stack>
    </Stack>
  );
}

export default CollectionInfo;