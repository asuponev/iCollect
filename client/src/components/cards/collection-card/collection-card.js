import React from 'react';
import { useSelector } from 'react-redux';
import { Stack, Typography, Card, CardContent, CardMedia, CardActionArea, Grid } from '@mui/material';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useIntl, FormattedMessage } from 'react-intl';
import Markdown from 'markdown-to-jsx';

import imageNotFound from '../../../utils/constants/image-not-found';
import CustomizeMui from '../../../utils/theme/customizeMui';

import CollectionCardTools from './collection-card-tools';

const CollectionCard = ({ data, inAccount }) => {
  const { status, userInfo } = useSelector(state => state.auth);
  let navigate = useNavigate();
  const { messages } = useIntl();
  const { cardStyles } = CustomizeMui();

  return (
    <Card sx={cardStyles}>
      <CardActionArea onClick={() => navigate(`/collections/${data._id}`)}>
        <CardMedia
          sx={{ height: 160 }}
          image={data.coverUrl || imageNotFound}
          title={data.title}
        />
        <CardContent sx={{ p: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="overline" lineHeight="18px" color="text.secondary">
              {data.subject}
            </Typography>
            <Typography variant="caption" color="text.disabled">
              {messages["app.collection.amount-items"]} {data.items}
            </Typography>
          </Stack>
          <Grid container wrap="nowrap" direction="column">
            <Typography gutterBottom variant="h6" noWrap>
              {data.title}
            </Typography>
            <Typography component={'div'} variant="body2" color="text.secondary" noWrap>
              <Markdown>
                {data.description}
              </Markdown>
            </Typography>
          </Grid>
        </CardContent>
      </CardActionArea>
      {
        inAccount ? (
          (status.isAuth && data.authorId === userInfo.userId) || status.isAdmin ? (
            <CollectionCardTools collectionId={data._id} />
          ) : null
        ) : (
          <Grid container wrap="nowrap" p={2} gap={1}>
            <Typography variant="overline" color="text.secondary">
              <FormattedMessage id="app.collection.by" />
            </Typography>
            <Typography variant="overline" color="text.secondary" noWrap>
              <Link to={`/users/${data.authorId._id}`}>
                {data.authorId.firstName} {data.authorId.lastName}
              </Link>
            </Typography>
          </Grid>
        )
      }
    </Card>
  );
}

export default CollectionCard;