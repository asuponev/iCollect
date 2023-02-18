import React from 'react';
import { useNavigate } from 'react-router';
import { Stack, Typography, Card, CardContent, CardActionArea } from '@mui/material';
import ItemTags from '../../item/view-blocks/item-tags';

const ItemCard = ({ _id, title, tags, collectionId, collection }) => {
  let navigate = useNavigate();

  return (
    <Card
      sx={{
        width: 336,
        boxShadow: "2px 2px 16px rgba(0, 0, 0, 0.08)",
        borderRadius: "8px",
      }}
    >
      <CardActionArea onClick={() => navigate(`/collections/${collectionId}/items/${_id}`)}>
        <CardContent>
          <Stack spacing={1}>
            <Typography fontSize={10} color="#9B9EA4">ID {_id}</Typography>
            <Typography fontSize={16} color="#142339" fontWeight={700}>{title}</Typography>
            <ItemTags tags={tags} />
            <Stack direction="row" spacing={1} sx={{ color: "#797E85" }}>
              <Typography variant="overline">{collection.title}</Typography>
              <Typography variant="overline">—</Typography>
              <Typography variant="overline">by {collection.authorId.firstName} {collection.authorId.lastName}</Typography>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ItemCard;