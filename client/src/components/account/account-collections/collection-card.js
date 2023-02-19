import React from 'react';
import { Stack, Typography, Card, CardContent, CardMedia, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import imageNotFound from '../../../utils/constants/image-not-found';
import CollectionCardTools from './collection-card-tools';

const CollectionCard = ({
  _id,
  subject,
  title,
  description,
  coverUrl,
  authorId,
  items,
  onEditCollection,
  onDeleteCollection,
  hidden
}) => {
  let navigate = useNavigate();
  if (description.length > 100) description = `${description.slice(0, 100)}...`;

  return (
    <Card
      sx={{
        width: 336,
        border: "1px solid #F9F9F9",
        boxShadow: "2px 2px 16px rgba(0, 0, 0, 0.08)",
        borderRadius: "8px",
      }}
    >
      <CardActionArea onClick={() => navigate(`/collections/${_id}`)}>
        <CardMedia
          sx={{ height: 160 }}
          image={coverUrl || imageNotFound}
          title={title}
        />
        <CardContent sx={{ padding: "16px 16px 0", height: 140 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            color="text.secondary"
          >
            <Typography variant="overline" lineHeight="18px">{subject}</Typography>
            <Typography variant="caption">{items} items</Typography>
          </Stack>
          <Typography gutterBottom variant="h6">{title}</Typography>
          <Typography variant="body2" color="text.secondary">{description}</Typography>
        </CardContent>
      </CardActionArea>
      {
        !hidden ? (
          <CollectionCardTools
            onEditCollection={onEditCollection}
            onDeleteCollection={onDeleteCollection}
            collectionId={_id}
          />
        ) : (
          <Stack p={2}>
            <Typography variant="overline" lineHeight="18px" color="#797E85">
              by <Link to={`/users/${authorId._id}`}>{authorId.firstName} {authorId.lastName}</Link>
            </Typography>
          </Stack>
        )
      }
    </Card>
  );
}

export default CollectionCard;