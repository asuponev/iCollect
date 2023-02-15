import React from 'react';
import { Stack, Typography } from '@mui/material';

const ItemExtraFields = ({ itemData }) => {

  const constKeys = ['_id', 'title', 'tags', 'collectionId', 'createdAt', 'updatedAt', '__v'];
  const extraFields = [];
  for (let key in itemData) {
    if (!constKeys.includes(key) && key) {
      extraFields.push(
        <Stack mt={3} spacing={1.5} key={key}>
          <Typography>{key}</Typography>
          <Typography fontSize={16} fontWeight={700}>{`${itemData[key]}`}</Typography>
        </Stack>
      )
    }
  }

  return (
    <>
      {extraFields}
    </>
  )
}

export default ItemExtraFields;