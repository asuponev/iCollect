import React from 'react';
import { Stack, Typography } from '@mui/material';

const ItemExtraFields = ({ itemData, extraFields }) => {

  const constKeys = ['_id', 'title', 'tags', 'collectionId', 'createdAt', 'updatedAt', '__v'];
  const extraFieldsView = [];
  for (let key in itemData) {
    if (!constKeys.includes(key) && key) {
      extraFields.forEach(field => {
        if (field.type === key) {
          extraFieldsView.push(
            <Stack mt={3} spacing={1.5} key={key}>
              <Typography>{field.name}</Typography>
              <Typography fontSize={16} fontWeight={700}>{`${itemData[key]}`}</Typography>
            </Stack>
          )
        }
      })
    }
  };

  return (
    <>
      {extraFieldsView}
    </>
  );
}

export default ItemExtraFields;