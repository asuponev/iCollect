import React, { useEffect, useState, useContext } from 'react';
import { Stack, Tooltip, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GlobalContext from '../../../utils/context/GlobalContext';

import { addLIke, removeLike, getAllItemLikes } from '../../../utils/requests/requests';

const ItemLikes = ({ itemId }) => {
  const { userInfo } = useContext(GlobalContext);
  const [likesData, setLikesData] = useState([]);
  const [isLike, setIsLike] = useState(false);

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
    <Stack direction="row" spacing={1} alignItems="center">
      <Tooltip title={`${likesData.length} likes`} placement="left">
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
      </Tooltip>
    </Stack >
  );
}

export default ItemLikes;