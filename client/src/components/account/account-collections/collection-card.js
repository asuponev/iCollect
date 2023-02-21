import React, { useContext } from 'react';
import { Stack, Typography, Card, CardContent, CardMedia, CardActionArea, Grid } from '@mui/material';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import imageNotFound from '../../../utils/constants/image-not-found';
import CollectionCardTools from './collection-card-tools';
import GlobalContext from '../../../utils/context/GlobalContext';

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
  inAccount
}) => {
  const { status, userInfo } = useContext(GlobalContext);
  let navigate = useNavigate();

  return (
    <Card
      sx={{
        border: "1px solid #F9F9F9",
        boxShadow: "2px 2px 16px rgba(0, 0, 0, 0.08)",
        borderRadius: 2,
      }}
    >
      <CardActionArea onClick={() => navigate(`/collections/${_id}`)}>
        <CardMedia
          sx={{ height: 160 }}
          image={coverUrl || imageNotFound}
          title={title}
        />
        <CardContent sx={{ padding: "16px 16px 0", height: 100 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            color="text.secondary"
          >
            <Typography variant="overline" lineHeight="18px">{subject}</Typography>
            <Typography variant="caption">{items} items</Typography>
          </Stack>
          <Grid container wrap="nowrap" direction="column">
            <Typography gutterBottom variant="h6" noWrap>{title}</Typography>
            <Typography variant="body2" color="text.secondary" noWrap>{description}</Typography>
          </Grid>
        </CardContent>
      </CardActionArea>
      {
        inAccount ? (
          (status.isAuth && authorId === userInfo.userId) || status.isAdmin ? (
            <CollectionCardTools
              onEditCollection={onEditCollection}
              onDeleteCollection={onDeleteCollection}
              collectionId={_id}
            />
          ) : null
        ) : (
          <Grid container wrap="nowrap" p={2}>
            <Typography variant="overline" color="#797E85" noWrap>
              by <Link to={`/users/${authorId._id}`}>
                {authorId.firstName} {authorId.lastName}
              </Link>
            </Typography>
          </Grid>
        )
      }
    </Card>
  );
}

export default CollectionCard;