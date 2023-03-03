import { tagsActionTypes } from '../action-types/action-types'

const initialState = {
  loading: false,
  tags: [],
  error: null,
}

export const tagsReducer = (state = initialState, action) => {
  switch (action.type) {
    case tagsActionTypes.FETCH_TAGS_START:
      return {
        loading: true,
        tags: [],
        error: null,
      };
    case tagsActionTypes.FETCH_TAGS_SUCCESS:
      return {
        loading: false,
        tags: action.payload,
        error: null,
      };
    case tagsActionTypes.FETCH_TAGS_ERROR:
      return {
        loading: false,
        tags: [],
        error: action.payload,
      };
    default:
      return state;
  }
}
