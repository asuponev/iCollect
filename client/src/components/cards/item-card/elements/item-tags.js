import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

import CustomizeMui from '../../../../utils/theme/customizeMui';

const ItemTags = ({ tags, compact }) => {
  const { tagStyles } = CustomizeMui();

  const tagsView = tags.map((tag, i) => {
    return (
      <Typography key={i} sx={tagStyles} noWrap>
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
            <Box sx={tagStyles}>
              +{tagsView.length - 2}
            </Box>
          </>
        ) : <>{tagsView}</>
      }
    </Stack>
  );
}

export default ItemTags;