import { toast } from 'react-toastify';
import {
  getAllCollectionItems,
  createItem,
  updateItem,
  getItem,
  deleteItem,
  deleteItems
} from '../../utils/requests/requests';
import { itemsActionTypes } from '../action-types/action-types';

export const requestGetItems = (collectionId) => {
  return (dispatch) => {
    dispatch({ type: itemsActionTypes.FETCH_ITEMS_START });
    getAllCollectionItems(collectionId)
      .then(res => {
        dispatch({ type: itemsActionTypes.FETCH_ITEMS_SUCCESS, payload: res });
      })
      .catch(error => {
        dispatch({ type: itemsActionTypes.FETCH_ITEMS_ERROR, payload: error.message });
      })
  }
};

export const onCreateItem = () => {
  return (dispatch) => {
    dispatch({ type: itemsActionTypes.CREATE_ITEM_START });
  }
};

export const onCloseModalForm = () => {
  return (dispatch) => {
    dispatch({ type: itemsActionTypes.CLOSE_FORM });
  }
};

export const requestCreateItem = (collectionId, values) => {
  return (dispatch) => {
    createItem(collectionId, values)
      .then(res => {
        dispatch({ type: itemsActionTypes.CREATE_ITEM_SUCCESS, payload: res });
        toast.success(`Item "${res.title}" created`, { position: 'top-right' });
      }).catch(error => {
        console.log(error);
        toast.error(error.message, { position: 'top-right' });
      })
  }
};

export const requestUpdateItem = (collectionId, itemId, values) => {
  return (dispatch) => {
    updateItem(collectionId, itemId, values)
      .then(res => {
        dispatch({ type: itemsActionTypes.UPDATE_ITEM_SUCCESS, payload: res });
        toast.success(`Item "${res.title}" updated`, { position: 'top-right' });
      }).catch(error => {
        console.log(error);
        toast.error(error.message, { position: 'top-right' });
      })
  }
};

export const getItemForEdit = (collectionId, itemId) => {
  return (dispatch) => {
    dispatch({ type: itemsActionTypes.FETCH_VALUE_FOR_EDIT_START, payload: itemId });
    getItem(collectionId, itemId)
      .then(res => {
        dispatch({ type: itemsActionTypes.FETCH_VALUE_FOR_EDIT_SUCCESS, payload: res });
      }).catch(error => {
        console.log(error);
        dispatch({ type: itemsActionTypes.FETCH_VALUE_FOR_EDIT_ERROR });
        toast.error(error.message, { position: 'top-right' });
      })
  }
};

export const onDeleteItem = (collectionId, itemId) => {
  return (dispatch) => {
    dispatch({ type: itemsActionTypes.DELETE_START, payload: itemId });
    deleteItem(collectionId, itemId)
      .then(res => {
        dispatch({ type: itemsActionTypes.DELETE_SUCCESS, payload: res });
        toast.info(`Item "${res.title}" deleted`, { position: 'top-right' });
      })
      .catch(error => {
        console.log(error);
        dispatch({ type: itemsActionTypes.DELETE_ERROR });
        toast.error(error.message, { position: 'top-right' });
      })
  }
};

export const onDeleteItems = (collectionId, items) => {
  return (dispatch) => {
    dispatch({ type: itemsActionTypes.DELETE_ITEMS_START });
    deleteItems(collectionId, items)
      .then(res => {
        dispatch({ type: itemsActionTypes.DELETE_ITEMS_SUCCESS, payload: res });
        toast.info('Selected items deleted', { position: 'top-right' });
      })
      .catch(error => {
        console.log(error);
        dispatch({ type: itemsActionTypes.DELETE_ERROR });
        toast.error(error.message, { position: 'top-right' });
      })
  }
};
