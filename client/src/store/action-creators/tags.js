import { getAllTags } from '../../utils/requests/requests';
import { tagsActionTypes } from '../action-types/action-types';

export const getTags = () => {
  return (dispatch) => {
    dispatch({ type: tagsActionTypes.FETCH_TAGS_START });
    getAllTags()
      .then(res => {
        dispatch({ type: tagsActionTypes.FETCH_TAGS_SUCCESS, payload: res });
      })
      .catch(error => {
        dispatch({ type: tagsActionTypes.FETCH_TAGS_ERROR, payload: error.message });
      })
  }
};