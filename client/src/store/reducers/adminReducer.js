import { adminActionTypes } from '../action-types/action-types'

const initialState = {
  loading: false,
  users: [],
  error: null,
  loadingBtn: false,
  currentAction: {
    id: '',
    action: ''
  },
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminActionTypes.FETCH_USERS_START:
      return {
        ...state,
        loading: true,
        users: [],
        error: null,
      };
    case adminActionTypes.FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: null,
      };
    case adminActionTypes.FETCH_USERS_ERROR:
      return {
        ...state,
        loading: false,
        items: [],
        error: action.payload,
      };
    case adminActionTypes.BLOCK_START:
      return {
        ...state,
        loadingBtn: true,
        currentAction: {
          id: action.payload,
          action: 'block'
        },
      };
    case adminActionTypes.MAKEADMIN_START:
      return {
        ...state,
        loadingBtn: true,
        currentAction: {
          id: action.payload,
          action: 'admin'
        },
      };
    case adminActionTypes.UPDATE_SUCCESS:
      return {
        ...state,
        loadingBtn: false,
        users: state.users.map(user => user._id === action.payload._id ? action.payload : user),
      };
    case adminActionTypes.DELETE_START:
      return {
        ...state,
        loadingBtn: true,
        currentAction: {
          id: action.payload,
          action: 'delete'
        },
      };
    case adminActionTypes.DELETE_SUCCESS:
      return {
        ...state,
        loadingBtn: false,
        users: state.users.filter(user => user._id !== action.payload._id),
      };
    case adminActionTypes.DELETE_USERS_START:
      return {
        ...state,
        loadingBtn: true,
      };
    case adminActionTypes.DELETE_USERS_SUCCESS:
      return {
        ...state,
        loadingBtn: false,
        users: state.users.filter(user => !action.payload.includes(user._id)),
      };
    case adminActionTypes.UPDATE_ERROR:
      return {
        ...state,
        loadingBtn: false,
        currentAction: {
          id: '',
          action: ''
        },
      };
    default:
      return state;
  }
}
