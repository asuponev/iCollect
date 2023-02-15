import React from 'react';
import { Stack, Typography, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const ItemLikes = () => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography>0 likes</Typography>
      <IconButton>
        <FavoriteBorderIcon />
      </IconButton>
    </Stack>
  )
}

export default ItemLikes;