import { commentsActionTypes } from '../action-types/action-types'

const initialState = {
  loading: false,
  comments: [],
  error: null,
}

export const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case commentsActionTypes.FETCH_COMMENTS_START:
      return {
        loading: true,
        comments: [],
        error: null,
      };
    case commentsActionTypes.FETCH_COMMENTS_SUCCESS:
      return {
        loading: false,
        comments: action.payload,
        error: null,
      };
    case commentsActionTypes.FETCH_COMMENTS_ERROR:
      return {
        loading: false,
        comments: [],
        error: action.payload,
      };
    case commentsActionTypes.UPDATE_COMMENTS:
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    default:
      return state;
  }
}
