import { likesActionTypes } from '../action-types/action-types'

const initialState = {
  likes: [],
  isLike: false,
}

export const likesReducer = (state = initialState, action) => {
  switch (action.type) {
    case likesActionTypes.FETCH_LIKES_SUCCESS:
      return {
        likes: action.payload,
      };
    case likesActionTypes.FETCH_LIKES_ERROR:
      return {
        likes: [],
      };
    case likesActionTypes.ADD_LIKE_START:
      return {
        ...state,
        isLike: true,
      };
    case likesActionTypes.ADD_LIKE_SUCCESS:
      return {
        ...state,
        likes: [...state.likes, action.payload]
      };
    case likesActionTypes.ADD_LIKE_ERROR:
      return {
        ...state,
        isLike: false,
      };
    case likesActionTypes.REMOVE_LIKE_START:
      return {
        ...state,
        isLike: false,
      };
    case likesActionTypes.REMOVE_LIKE_SUCCESS:
      return {
        ...state,
        likes: state.likes.filter(like => like._id !== action.payload)
      };
    case likesActionTypes.REMOVE_LIKE_ERROR:
      return {
        ...state,
        isLike: true,
      };
    case likesActionTypes.CHECK_LIKE:
      return {
        ...state,
        isLike: true,
      };
    default:
      return state;
  }
}