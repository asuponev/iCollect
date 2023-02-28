import React from 'react';
import { useNavigate } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Typography, Card, CardContent, CardActionArea, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import CustomizeMui from '../../../utils/theme/customizeMui';

import ItemTags from './elements/item-tags';

const ItemCard = ({ _id, title, tags, collectionId, collection }) => {
  let navigate = useNavigate();
  const { cardStyles } = CustomizeMui();

  return (
    <Card sx={cardStyles}>
      <CardActionArea onClick={() => navigate(`/collections/${collectionId}/items/${_id}`)}>
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography fontSize={10} color="text.disabled">
            ID {_id}
          </Typography>
          <Typography fontSize={16} fontWeight={700} gutterBottom noWrap>
            {title}
          </Typography>
          <ItemTags tags={tags} compact={true} />
        </CardContent>
      </CardActionArea>
      <Grid container wrap="nowrap" px={2} py={1} gap={1}>
        <Typography variant="overline" color="text.secondary" noWrap>
          <Link to={`/collections/${collection._id}`}>
            {collection.title}
          </Link>
        </Typography>
        <Typography variant="overline" color="text.secondary">—</Typography>
        <Typography variant="overline" color="text.secondary">
          <FormattedMessage id="app.collection.by" />
        </Typography>
        <Typography variant="overline" color="text.secondary" noWrap>
          <Link to={`/users/${collection.authorId._id}`}>
            {collection.authorId.firstName} {collection.authorId.lastName}
          </Link>
        </Typography>
      </Grid>
    </Card>
  );
}

export default ItemCard;