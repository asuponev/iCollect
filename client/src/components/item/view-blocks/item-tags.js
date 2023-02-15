import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

const ItemTags = ({ itemData }) => {

  const tagsView = itemData.tags.map(tag => {
    return (
      <Box
        key={tag} mr={1}
        sx={{
          color: "#797E85",
          backgroundColor: "#EEEFF0",
          borderRadius: "100px",
          padding: "4px 8px"
        }}
      >{tag}</Box>
    )
  });

  return (
    <Stack mt={3} spacing={1.5}>
      <Typography>Tags</Typography>
      <Stack direction="row" alignItems="center" justifyContent="flex-start">
        {tagsView}
      </Stack>
    </Stack>
  )
}

export default ItemTags;