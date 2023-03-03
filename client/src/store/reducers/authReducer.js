import { authActionTypes } from '../action-types/action-types'

const initialState = {
  status: {
    isAuth: false,
    isAdmin: false,
    isActive: true,
  },
  userInfo: {
    userId: '',
    firstName: '',
    lastName: ''
  },
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authActionTypes.CHANGESTATUS_ADMIN:
      return {
        status: {
          isAuth: true,
          isAdmin: true,
          isActive: true,
        },
        userInfo: {
          userId: action.payload._id,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName
        },
      };
    case authActionTypes.CHANGESTATUS_USER:
      return {
        status: {
          isAuth: true,
          isAdmin: false,
          isActive: true,
        },
        userInfo: {
          userId: action.payload._id,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName
        },
      };
    case authActionTypes.REMOVE_AUTHDATA:
      return {
        status: {
          isAuth: false,
          isAdmin: false,
          isActive: true,
        },
        userInfo: {
          userId: '',
          firstName: '',
          lastName: ''
        },
      };
    default:
      return state;
  }
}
