import React from 'react';
import { useNavigate } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Typography, Card, CardContent, CardActionArea, Grid } from '@mui/material';

import ItemTags from './elements/item-tags';
import { CardStyles } from '../../../styles/card-styles'

const ItemCard = ({ _id, title, tags, collectionId, collection }) => {
  let navigate = useNavigate();

  return (
    <Card sx={CardStyles}>
      <CardActionArea onClick={() => navigate(`/collections/${collectionId}/items/${_id}`)}>
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography fontSize={10} color="text.disabled">
            ID {_id}
          </Typography>
          <Typography fontSize={16} fontWeight={700} gutterBottom noWrap>
            {title}
          </Typography>
          <ItemTags tags={tags} compact={true} />
          <Grid container wrap="nowrap" mt={1} gap={1}>
            <Typography variant="overline" color="text.secondary" noWrap>
              {collection.title}
            </Typography>
            <Typography variant="overline" color="text.secondary">—</Typography>
            <Typography variant="overline" color="text.secondary">
              <FormattedMessage id="app.collection.by" />
            </Typography>
            <Typography variant="overline" color="text.secondary" noWrap>
              {collection.authorId.firstName} {collection.authorId.lastName}
            </Typography>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ItemCard;