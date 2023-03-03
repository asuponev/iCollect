import { toast } from 'react-toastify';
import {
  getUsers,
  blockUser,
  makeAdmin,
  deleteUser,
  deleteUsers
} from '../../utils/requests/requests';
import { adminActionTypes } from '../action-types/action-types';

export const requestGetUsers = () => {
  return (dispatch) => {
    dispatch({ type: adminActionTypes.FETCH_USERS_START });
    getUsers()
      .then(res => {
        dispatch({ type: adminActionTypes.FETCH_USERS_SUCCESS, payload: res });
      })
      .catch(error => {
        dispatch({ type: adminActionTypes.FETCH_USERS_ERROR, payload: error.message });
      })
  }
};

export const blockSelectedUser = (userId) => {
  return (dispatch) => {
    dispatch({ type: adminActionTypes.BLOCK_START, payload: userId });
    blockUser(userId)
      .then(res => {
        dispatch({ type: adminActionTypes.UPDATE_SUCCESS, payload: res });
      }).catch(error => {
        console.log(error);
        dispatch({ type: adminActionTypes.UPDATE_ERROR });
        toast.error(error.message, { position: 'top-right' });
      })
  }
};

export const makeAdminSelectedUser = (userId) => {
  return (dispatch) => {
    dispatch({ type: adminActionTypes.MAKEADMIN_START, payload: userId });
    makeAdmin(userId)
      .then(res => {
        dispatch({ type: adminActionTypes.UPDATE_SUCCESS, payload: res });
      }).catch(error => {
        console.log(error);
        dispatch({ type: adminActionTypes.UPDATE_ERROR });
        toast.error(error.message, { position: 'top-right' });
      })
  }
};

export const deleteSelectedUser = (userId) => {
  return (dispatch) => {
    dispatch({ type: adminActionTypes.DELETE_START, payload: userId });
    deleteUser(userId)
      .then(res => {
        dispatch({ type: adminActionTypes.DELETE_SUCCESS, payload: res });
        toast.info(`User "${res._id} deleted`, { position: 'top-right' });
      }).catch(error => {
        console.log(error);
        dispatch({ type: adminActionTypes.UPDATE_ERROR });
        toast.error(error.message, { position: 'top-right' });
      })
  }
};

export const deleteSelectedUsers = (usersId) => {
  return (dispatch) => {
    dispatch({ type: adminActionTypes.DELETE_USERS_START });
    deleteUsers(usersId)
      .then(res => {
        dispatch({ type: adminActionTypes.DELETE_USERS_SUCCESS, payload: res });
        toast.info('Users deleted', { position: 'top-right' });
      }).catch(error => {
        console.log(error);
        dispatch({ type: adminActionTypes.UPDATE_ERROR });
        toast.error(error.message, { position: 'top-right' });
      })
  }
};