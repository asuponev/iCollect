import React from 'react';
import { useNavigate } from 'react-router';
import { Stack, Typography, Card, CardContent, CardActionArea } from '@mui/material';
import ItemTags from '../../item/view-blocks/item-tags';

const ItemCard = ({ _id, title, tags, collectionId, collection }) => {
  let navigate = useNavigate();
  let collectionTitle = collection.title,
      firstName = collection.authorId.firstName,
      lastName = collection.authorId.lastName;

  if (collectionTitle.length > 16) {
    collectionTitle = `${collectionTitle.slice(0, 16)}...`;
    if ((firstName.length + lastName.length) > 12) {
      firstName = firstName.length > 8 ? `${firstName.slice(0, 8)}...` : firstName;
      lastName = `${lastName[0]}.`;
    };
  };

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
            <ItemTags tags={tags} compact={true} />
            <Stack direction="row" spacing={1} sx={{ color: "#797E85" }}>
              <Typography variant="overline">{collectionTitle}</Typography>
              <Typography variant="overline">—</Typography>
              <Typography variant="overline">by {firstName} {lastName}</Typography>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ItemCard;