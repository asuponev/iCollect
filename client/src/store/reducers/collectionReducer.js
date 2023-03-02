import { collectionActionTypes } from '../action-types/action-types'

const initialState = {
  loading: false,
  collection: {},
  error: null,
}

export const collectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case collectionActionTypes.FETCH_COLLECTION_START:
      return {
        loading: true,
        collection: {},
        error: null,
      };
    case collectionActionTypes.FETCH_COLLECTION_SUCCESS:
      return {
        loading: false,
        collection: action.payload,
        error: null,
      };
    case collectionActionTypes.FETCH_COLLECTION_ERROR:
      return {
        loading: false,
        collection: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
