import { toast } from 'react-toastify';
import { getAllItemLikes, addLIke, removeLike } from '../../utils/requests/requests';
import { likesActionTypes } from '../action-types/action-types';

export const requestLikes = (itemId) => {
  return (dispatch) => {
    getAllItemLikes(itemId)
      .then(res => {
        dispatch({ type: likesActionTypes.FETCH_LIKES_SUCCESS, payload: res });
      }).catch(error => {
        console.log(error);
        dispatch({ type: likesActionTypes.FETCH_LIKES_ERROR });
      })
  }
};

export const onAddLike = (itemId) => {
  return (dispatch) => {
    dispatch({ type: likesActionTypes.ADD_LIKE_START });
    addLIke(itemId)
      .then()
      .catch(error => {
        console.log(error);
        dispatch({ type: likesActionTypes.ADD_LIKE_ERROR });
        toast.error('Failed to process request, try again later', { position: 'top-right' });
      })
  }
};

export const onRemoveLike = (itemId) => {
  return (dispatch) => {
    dispatch({ type: likesActionTypes.REMOVE_LIKE_START });
    removeLike(itemId)
      .then()
      .catch(error => {
        console.log(error);
        dispatch({ type: likesActionTypes.REMOVE_LIKE_ERROR });
        toast.error('Failed to process request, try again later', { position: 'top-right' });
      })
  }
};

export const checkLike = () => {
  return (dispatch) => {
    dispatch({ type: likesActionTypes.CHECK_LIKE });
  }
};

export const pusherAddLike = (like) => {
  return (dispatch) => {
    dispatch({ type: likesActionTypes.ADD_LIKE_SUCCESS, payload: like });
  }
}

export const pusherRemoveLike = (likeId) => {
  return (dispatch) => {
    dispatch({ type: likesActionTypes.REMOVE_LIKE_SUCCESS, payload: likeId });
  }
}