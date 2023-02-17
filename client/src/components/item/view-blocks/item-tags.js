import React from 'react';
import { Box, Stack } from '@mui/material';

const ItemTags = ({ tags }) => {

  const tagsView = tags.map(tag => {
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
    <Stack direction="row" alignItems="center" justifyContent="flex-start">
      {tagsView}
    </Stack>
  )
}

export default ItemTags;