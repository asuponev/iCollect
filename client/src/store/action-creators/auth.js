import { toast } from 'react-toastify';
import { checkAuth } from '../../utils/requests/requests';
import { authActionTypes } from '../action-types/action-types';

export const requestLogin = (values, request, navigate) => {
  return (dispatch) => {
    request(values)
      .then(res => {
        localStorage.setItem('token', res.token);
        if (res.role === 'ADMIN') {
          dispatch({ type: authActionTypes.CHANGESTATUS_ADMIN, payload: res });
        } else {
          dispatch({ type: authActionTypes.CHANGESTATUS_USER, payload: res });
        }
        navigate('/');
      }).catch(error => {
        dispatch({ type: authActionTypes.REMOVE_AUTHDATA });
        toast.error(error.message, { position: 'top-right' });
      })
  }
}

export const removeAuthData = () => {
  return (dispatch) => {
    dispatch({ type: authActionTypes.REMOVE_AUTHDATA });
  }
}

export const checkAuthUser = () => {
  return (dispatch) => {
    checkAuth()
      .then(res => {
        if (res.role === 'ADMIN') {
          dispatch({ type: authActionTypes.CHANGESTATUS_ADMIN, payload: res });
        } else {
          dispatch({ type: authActionTypes.CHANGESTATUS_USER, payload: res });
        }
      })
      .catch(error => {
        console.log(error.message);
        dispatch({ type: authActionTypes.REMOVE_AUTHDATA });
      })
  }
}