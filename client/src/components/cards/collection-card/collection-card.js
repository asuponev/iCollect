import React, { useContext } from 'react';
import { Stack, Typography, Card, CardContent, CardMedia, CardActionArea, Grid } from '@mui/material';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useIntl, FormattedMessage } from 'react-intl';
import Markdown from 'markdown-to-jsx';

import GlobalContext from '../../../utils/context/GlobalContext';
import imageNotFound from '../../../utils/constants/image-not-found';
import CustomizeMui from '../../../utils/theme/customizeMui';

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
  inAccount,
  loadingEdit,
  loadingDelete,
  currentCollectionId
}) => {
  const { status, userInfo } = useContext(GlobalContext);
  let navigate = useNavigate();
  const { messages } = useIntl();
  const { cardStyles } = CustomizeMui();

  return (
    <Card sx={cardStyles}>
      <CardActionArea onClick={() => navigate(`/collections/${_id}`)}>
        <CardMedia
          sx={{ height: 160 }}
          image={coverUrl || imageNotFound}
          title={title}
        />
        <CardContent sx={{ p: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="overline" lineHeight="18px" color="text.secondary">
              {subject}
            </Typography>
            <Typography variant="caption" color="text.disabled">
              {messages["app.collection.amount-items"]} {items}
            </Typography>
          </Stack>
          <Grid container wrap="nowrap" direction="column">
            <Typography gutterBottom variant="h6" noWrap>
              {title}
            </Typography>
            <Typography component={'div'} variant="body2" color="text.secondary" noWrap>
              <Markdown>
                {description}
              </Markdown>
            </Typography>
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
              loadingEdit={loadingEdit}
              loadingDelete={loadingDelete}
              currentCollectionId={currentCollectionId}
            />
          ) : null
        ) : (
          <Grid container wrap="nowrap" p={2} gap={1}>
            <Typography variant="overline" color="text.secondary">
              <FormattedMessage id="app.collection.by" />
            </Typography>
            <Typography variant="overline" color="text.secondary" noWrap>
              <Link to={`/users/${authorId._id}`}>
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