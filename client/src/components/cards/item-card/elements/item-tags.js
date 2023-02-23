import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

import { TagStylesSmall } from '../../../../styles/tag-styles';

const ItemTags = ({ tags, compact }) => {

  const tagsView = tags.map((tag, i) => {
    return (
      <Typography key={i} sx={TagStylesSmall} noWrap>
        {tag}
      </Typography>
    );
  });

  return (
    <Stack
      direction="row"
      alignItems="center"
      flexWrap={compact ? "nowrap" : "wrap"}
      gap={1}
    >
      {
        compact && tagsView.length > 2 ? (
          <>
            {tagsView.slice(0, 2)}
            <Box sx={TagStylesSmall}>
              +{tagsView.length - 2}
            </Box>
          </>
        ) : <>{tagsView}</>
      }
    </Stack>
  );
}

export default ItemTags;