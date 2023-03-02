import { toast } from 'react-toastify';
import {
  getAllCollectionsUser,
  createCollection,
  updateCollection,
  getOneCollection,
  deleteCollection,
  getBiggestCollections
} from '../../utils/requests/requests';
import { collectionActionTypes } from '../action-types/action-types';
import { removeImg } from '../../utils/firebase/methods';

export const requestGetCollections = (userId) => {
  return (dispatch) => {
    dispatch({ type: collectionActionTypes.FETCH_COLLECTIONS_START });
    getAllCollectionsUser(userId)
      .then(res => {
        dispatch({ type: collectionActionTypes.FETCH_COLLECTIONS_SUCCESS, payload: res });
      })
      .catch(error => {
        dispatch({ type: collectionActionTypes.FETCH_COLLECTIONS_ERROR, payload: error.message });
      })
  }
};

export const onCreateCollection = () => {
  return (dispatch) => {
    dispatch({ type: collectionActionTypes.CREATE_COLLECTION_START });
  }
};

export const onCloseModalForm = () => {
  return (dispatch) => {
    dispatch({ type: collectionActionTypes.CLOSE_FORM });
  }
};

export const requestCreateCollection = (values) => {
  return (dispatch) => {
    createCollection(values)
      .then(res => {
        dispatch({ type: collectionActionTypes.CREATE_COLLECTION_SUCCESS, payload: res });
        toast.success(`Collection "${res.title}" created`, { position: 'top-right' });
      }).catch(error => {
        console.log(error);
        toast.error(error.message, { position: 'top-right' });
      })
  }
};

export const requestUpdateCollection = (collectionId, values) => {
  return (dispatch) => {
    updateCollection(collectionId, values)
      .then(res => {
        dispatch({ type: collectionActionTypes.UPDATE_COLLECTION_SUCCESS, payload: res });
        toast.success(`Collection "${res.title}" updated`, { position: 'top-right' });
      }).catch(error => {
        console.log(error);
        toast.error(error.message, { position: 'top-right' });
      })
  }
};

export const getValuesForEdit = (collectionId) => {
  return (dispatch) => {
    dispatch({ type: collectionActionTypes.FETCH_VALUE_FOR_EDIT_START, payload: collectionId });
    getOneCollection(collectionId)
      .then(res => {
        dispatch({ type: collectionActionTypes.FETCH_VALUE_FOR_EDIT_SUCCESS, payload: res });
      }).catch(error => {
        console.log(error);
        dispatch({ type: collectionActionTypes.FETCH_VALUE_FOR_EDIT_ERROR });
      })
  }
}

export const onDeleteCollection = (collectionId) => {
  return (dispatch) => {
    dispatch({ type: collectionActionTypes.DELETE_START, payload: collectionId });
    deleteCollection(collectionId)
      .then(res => {
        if (res.coverUrl) removeImg(res.coverUrl);
        dispatch({ type: collectionActionTypes.DELETE_SUCCESS, payload: res });
        toast.info(`Collection "${res.title}" deleted`, { position: 'top-right' });
      }).catch(error => {
        console.log(error);
        dispatch({ type: collectionActionTypes.DELETE_ERROR });
        toast.error(error.message, { position: 'top-right' });
      })
  }
};

export const requestGetBiggestCollections = () => {
  return (dispatch) => {
    dispatch({ type: collectionActionTypes.FETCH_BIGCOLLECTIONS_START });
    getBiggestCollections()
      .then(res => {
        dispatch({ type: collectionActionTypes.FETCH_BIGCOLLECTIONS_SUCCESS, payload: res });
      })
      .catch(error => {
        dispatch({ type: collectionActionTypes.FETCH_BIGCOLLECTIONS_ERROR, payload: error.message });
      })
  }
};