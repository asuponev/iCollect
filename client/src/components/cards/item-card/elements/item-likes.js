import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { Stack, IconButton, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Pusher from 'pusher-js';
import { ToastContainer } from 'react-toastify';

import {
  requestLikes,
  onAddLike,
  onRemoveLike,
  checkLike,
  pusherAddLike,
  pusherRemoveLike
} from '../../../../store/action-creators/likes';

const ItemLikes = ({ itemId }) => {
  const dispatch = useDispatch();
  const { likes, isLike } = useSelector(state => state.likes);
  const { userInfo } = useSelector(state => state.auth);
  const { messages } = useIntl();

  useEffect(() => {
    const pusher = new Pusher(process.env.REACT_APP_pusher_key, {
      cluster: process.env.REACT_APP_pusher_cluster,
      encrypted: true
    });
    const channel = pusher.subscribe(process.env.REACT_APP_pusher_channel);
    channel.bind('new_like', like => {
      if (like.itemId === itemId) dispatch(pusherAddLike(like));
    });
    channel.bind('remove_like', likeId => {
      dispatch(pusherRemoveLike(likeId));
    });

    return (() => pusher.unsubscribe(process.env.REACT_APP_pusher_channel));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(requestLikes(itemId));
    // eslint-disable-next-line
  }, [itemId]);

  useEffect(() => {
    if (likes) {
      likes.forEach(like => {
        if (like.userId === userInfo.userId) {
          dispatch(checkLike());
        };
      })
    }
    // eslint-disable-next-line
  }, [likes, userInfo.userId]);

  return (
    <>
      <ToastContainer />
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography fontSize={13} color="text.secondary">
          {messages["app.item.likes"]} {likes.length}
        </Typography>
        {isLike ?
          (
            <IconButton onClick={() => dispatch(onRemoveLike(itemId))}>
              <FavoriteIcon />
            </IconButton>
          ) : (
            <IconButton onClick={() => dispatch(onAddLike(itemId))}>
              <FavoriteBorderIcon />
            </IconButton>
          )
        }
      </Stack >
    </>
  );
}

export default ItemLikes;