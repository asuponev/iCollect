import { userActionTypes } from '../action-types/action-types'

const initialState = {
  loading: false,
  user: {},
  error: null,
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActionTypes.FETCH_USER_START:
      return {
        loading: true,
        user: {},
        error: null,
      };
    case userActionTypes.FETCH_USER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        error: null,
      };
    case userActionTypes.FETCH_USER_ERROR:
      return {
        loading: false,
        user: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
