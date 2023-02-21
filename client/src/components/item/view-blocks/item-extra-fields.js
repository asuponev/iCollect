import React, { Fragment } from 'react';
import { Grid, Typography } from '@mui/material';

const ItemExtraFields = ({ itemData, extraFields }) => {

  const constKeys = ['_id', 'title', 'tags', 'collectionId', 'createdAt', 'updatedAt', '__v'];
  const extraFieldsView = [];
  for (let key in itemData) {
    if (!constKeys.includes(key) && key) {
      extraFields.forEach((field, i) => {
        if (field.type === key) {
          extraFieldsView.push(
            <Fragment key={i}>
              <Typography noWrap mt={2.5} mb={1}>{field.name}</Typography>
              <Typography fontSize={16} fontWeight={700} noWrap>{`${itemData[key]}`}</Typography>
            </Fragment>
          )
        }
      })
    }
  };

  return (
    <Grid container wrap="nowrap" direction="column">
      {extraFieldsView}
    </Grid>
  );
}

export default ItemExtraFields;