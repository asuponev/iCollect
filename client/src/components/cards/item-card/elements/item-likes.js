import React, { useEffect, useState, useContext } from 'react';
import { useIntl } from 'react-intl';
import { Stack, IconButton, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { ToastContainer, toast } from 'react-toastify';

import GlobalContext from '../../../../utils/context/GlobalContext';

import { addLIke, removeLike, getAllItemLikes } from '../../../../utils/requests/requests';

const ItemLikes = ({ itemId }) => {
  const { userInfo } = useContext(GlobalContext);
  const [likesData, setLikesData] = useState([]);
  const [isLike, setIsLike] = useState(false);

  const { messages } = useIntl();

  useEffect(() => {
    onGetRequest(itemId);
  }, [itemId]);

  useEffect(() => {
    if (likesData) {
      likesData.forEach(like => {
        if (like.userId === userInfo.userId) {
          setIsLike(true);
        };
      })
    }
  }, [likesData, userInfo.userId]);

  const onAddLike = (itemId) => {
    setIsLike(true);
    addLIke(itemId)
      .then(res => {
        onGetRequest(itemId);
      }).catch(error => {
        setIsLike(false);
        console.log(error);
        toast.error(messages["app.item.likeserror"], { position: 'top-right' });
      })
  };

  const onRemoveLike = (itemId) => {
    setIsLike(false);
    removeLike(itemId)
      .then(res => {
        onGetRequest(itemId);
      }).catch(error => {
        setIsLike(true);
        console.log(error);
        toast.error(messages["app.item.likeserror"], { position: 'top-right' });
      })
  };

  const onGetRequest = (itemId) => {
    getAllItemLikes(itemId)
      .then(res => {
        setLikesData(res);
      }).catch(error => {
        console.log(error);
        setLikesData([]);
      })
  };

  return (
    <>
      <ToastContainer />
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography fontSize={13} color="text.secondary">
          {messages["app.item.likes"]} {likesData.length}
        </Typography>
        {isLike ?
          (
            <IconButton onClick={() => onRemoveLike(itemId)}>
              <FavoriteIcon />
            </IconButton>
          ) : (
            <IconButton onClick={() => onAddLike(itemId)}>
              <FavoriteBorderIcon />
            </IconButton>
          )
        }
      </Stack >
    </>
  );
}

export default ItemLikes;