import React from 'react';
import { Stack, Grid, Typography } from '@mui/material';
import Markdown from 'markdown-to-jsx';

import imageNotFound from '../../../utils/constants/image-not-found';

const CollectionInfo = ({ data }) => {
  if (Object.keys(data).length === 0) return;
  return (
    <Stack direction="row" spacing={2} alignItems="flex-start" my={4}>
      <img
        src={`${data.coverUrl || imageNotFound}`}
        alt={data.title}
        style={{ objectFit: "cover", borderRadius: "8px" }}
        width="100" height="100"
      />
      <Grid container wrap="nowrap" direction="column" width="calc(100% - 116px)">
        <Typography variant="overline" lineHeight={1.5} color="text.disabled">
          {data.subject}
        </Typography>
        <Typography variant="h6" mt={0.5} mb={1} sx={{ wordWrap: "break-word" }}>
          {data.title}
        </Typography>
        <Typography component={'div'} color="text.secondary" sx={{ wordWrap: "break-word" }}>
          <Markdown>{data.description}</Markdown>
        </Typography>
      </Grid>
    </Stack>
  );
}

export default CollectionInfo;