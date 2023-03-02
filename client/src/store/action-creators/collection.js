import { getOneCollection } from '../../utils/requests/requests';
import { collectionActionTypes } from '../action-types/action-types';

export const requestGetCollection = (collectionId) => {
  return (dispatch) => {
    dispatch({ type: collectionActionTypes.FETCH_COLLECTION_START });
    getOneCollection(collectionId)
      .then(res => {
        dispatch({ type: collectionActionTypes.FETCH_COLLECTION_SUCCESS, payload: res });
      })
      .catch(error => {
        dispatch({ type: collectionActionTypes.FETCH_COLLECTION_ERROR, payload: error.message });
      })
  }
};