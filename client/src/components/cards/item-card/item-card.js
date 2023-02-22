import React from 'react';
import { useNavigate } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Typography, Card, CardContent, CardActionArea, Grid } from '@mui/material';

import ItemTags from './elements/item-tags';

const ItemCard = ({ _id, title, tags, collectionId, collection }) => {
  let navigate = useNavigate();

  return (
    <Card
      sx={{
        boxShadow: "2px 2px 16px rgba(0, 0, 0, 0.08)",
        borderRadius: 2,
      }}
    >
      <CardActionArea onClick={() => navigate(`/collections/${collectionId}/items/${_id}`)}>
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography fontSize={10} color="#9B9EA4">
            ID {_id}
          </Typography>
          <Typography fontSize={16} color="#142339" fontWeight={700} gutterBottom>
            {title}
          </Typography>
          <ItemTags tags={tags} compact={true} />
          <Grid container wrap="nowrap" mt={1} sx={{ color: "#797E85" }} gap={1}>
            <Typography variant="overline" noWrap>
              {collection.title}
            </Typography>
            <Typography variant="overline">—</Typography>
            <Typography variant="overline" >
              <FormattedMessage id="app.collection.by" />
            </Typography>
            <Typography variant="overline" noWrap>
              {collection.authorId.firstName} {collection.authorId.lastName}
            </Typography>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ItemCard;