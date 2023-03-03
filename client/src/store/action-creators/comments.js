import { getAllItemComment } from '../../utils/requests/requests';
import { commentsActionTypes } from '../action-types/action-types';

export const requestComments = (itemId) => {
  return (dispatch) => {
    dispatch({ type: commentsActionTypes.FETCH_COMMENTS_START });
    getAllItemComment(itemId)
      .then(res => {
        dispatch({ type: commentsActionTypes.FETCH_COMMENTS_SUCCESS, payload: res });
      }).catch(error => {
        dispatch({ type: commentsActionTypes.FETCH_COMMENTS_ERROR, payload: error.message });
      })
  }
};

export const updateComments = (comment) => {
  return (dispatch) => {
    dispatch({ type: commentsActionTypes.UPDATE_COMMENTS, payload: comment });
  }
}