import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

const ItemTags = ({ tags, compact }) => {

  const tagStyle = {
    color: "#797E85",
    backgroundColor: "#EEEFF0",
    borderRadius: "100px",
    padding: "4px 8px",
    maxWidth: "100%"
  };

  const tagsView = tags.map((tag, i) => {
    return (
      <Typography key={i} sx={tagStyle} noWrap>
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
            <Box sx={tagStyle}>
              +{tagsView.length - 2}
            </Box>
          </>
        ) : <>{tagsView}</>
      }
    </Stack>
  );
}

export default ItemTags;