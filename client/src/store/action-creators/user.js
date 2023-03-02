import { getOneUser } from '../../utils/requests/requests';
import { userActionTypes } from '../action-types/action-types';

export const requestGetUser = (userId) => {
  return (dispatch) => {
    dispatch({ type: userActionTypes.FETCH_USER_START });
    getOneUser(userId)
      .then(res => {
        dispatch({ type: userActionTypes.FETCH_USER_SUCCESS, payload: res });
      })
      .catch(error => {
        dispatch({ type: userActionTypes.FETCH_USER_ERROR, payload: error.message });
      })
  }
};