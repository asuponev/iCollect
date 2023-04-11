import { toast } from 'react-toastify';
import {
  getItem,
  deleteItem,
  deleteItems,
} from '../../utils/requests/requests';
import { itemsActionTypes } from '../action-types/action-types';

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

export const onDeleteItem = (collectionId, itemId, text) => {
  return (dispatch) => {
    dispatch({ type: itemsActionTypes.DELETE_START, payload: itemId });
    deleteItem(collectionId, itemId)
      .then(res => {
        dispatch({ type: itemsActionTypes.DELETE_SUCCESS, payload: res });
        toast.info(text.tableTools.successdelete1, { position: 'top-right' });
      })
      .catch(error => {
        console.log(error);
        dispatch({ type: itemsActionTypes.DELETE_ERROR });
        toast.error(error.message, { position: 'top-right' });
      })
  }
};

export const onDeleteItems = (collectionId, items, text) => {
  return (dispatch) => {
    dispatch({ type: itemsActionTypes.DELETE_ITEMS_START });
    deleteItems(collectionId, items)
      .then(res => {
        dispatch({ type: itemsActionTypes.DELETE_ITEMS_SUCCESS, payload: res });
        toast.info(text.tableTools.successdelete2, { position: 'top-right' });
      })
      .catch(error => {
        console.log(error);
        dispatch({ type: itemsActionTypes.DELETE_ERROR });
        toast.error(error.message, { position: 'top-right' });
      })
  }
};