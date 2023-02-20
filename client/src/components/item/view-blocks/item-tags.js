import React from 'react';
import { Box, Stack } from '@mui/material';

const ItemTags = ({ tags, compact }) => {

  const tagsView = tags.map((tag, i) => {
    if (compact && (tag.length > 10)) tag = `${tag.slice(0, 10)}...`;
    return (
      <Box key={i} sx={tagStyle}>{tag}</Box>
    );
  });

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
      flexWrap="wrap"
      spacing={1}
    >
      {
        compact && tagsView.length > 2 ? (
          <>
            {tagsView.slice(0, 2)}
            <Box sx={tagStyle}>
              +{tagsView.length - 2}
            </Box>
          </>
        ) : (
          <>{tagsView}</>
        )
      }
    </Stack>
  );
}

export default ItemTags;

const tagStyle = {
  color: "#797E85",
  backgroundColor: "#EEEFF0",
  borderRadius: "100px",
  padding: "4px 8px"
};