import { itemsActionTypes } from '../action-types/action-types'
import defaultItemValues from '../../utils/constants/default-item-values';

const initialState = {
  loading: false,
  items: [],
  error: null,
  loadingBtn: false,
  currentId: '',
  currentAction: '',
  isEditing: false,
  valuesForEdit: defaultItemValues,
  openModalForm: false,
  lastItems: []
};

export const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case itemsActionTypes.FETCH_ITEMS_START:
      return {
        ...state,
        loading: true,
        items: [],
        error: null,
      };
    case itemsActionTypes.FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload,
        error: null,
      };
    case itemsActionTypes.FETCH_ITEMS_ERROR:
      return {
        ...state,
        loading: false,
        items: [],
        error: action.payload,
      };
    case itemsActionTypes.CREATE_ITEM_START:
      return {
        ...state,
        openModalForm: true
      };
    case itemsActionTypes.CREATE_ITEM_SUCCESS:
      return {
        ...state,
        items: [action.payload, ...state.items],
        openModalForm: false
      };
    case itemsActionTypes.FETCH_VALUE_FOR_EDIT_START:
      return {
        ...state,
        loadingBtn: true,
        currentId: action.payload,
        currentAction: 'edit'
      };
    case itemsActionTypes.FETCH_VALUE_FOR_EDIT_SUCCESS:
      return {
        ...state,
        valuesForEdit: {
          title: action.payload.title,
          tags: action.payload.tags,
          number1: action.payload.number1 || 0,
          number2: action.payload.number2 || 0,
          number3: action.payload.number3 || 0,
          string1: action.payload.string1 || '',
          string2: action.payload.string2 || '',
          string3: action.payload.string3 || '',
          text1: action.payload.text1 || '',
          text2: action.payload.text2 || '',
          text3: action.payload.text3 || '',
          date1: action.payload.date1 || '',
          date2: action.payload.date2 || '',
          date3: action.payload.date3 || '',
          checkbox1: action.payload.checkbox1 || false,
          checkbox2: action.payload.checkbox2 || false,
          checkbox3: action.payload.checkbox2 || false,
        },
        loadingBtn: false,
        openModalForm: true,
        isEditing: true
      };
    case itemsActionTypes.FETCH_VALUE_FOR_EDIT_ERROR:
      return {
        ...state,
        valuesForEdit: defaultItemValues,
        loadingBtn: false,
        currentId: '',
        currentAction: ''
      };
    case itemsActionTypes.UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        items: [action.payload, ...state.items.filter(item => item._id !== action.payload._id)],
        openModalForm: false
      };
    case itemsActionTypes.DELETE_START:
      return {
        ...state,
        loadingBtn: true,
        currentId: action.payload,
        currentAction: 'delete'
      };
    case itemsActionTypes.DELETE_SUCCESS:
      return {
        ...state,
        loadingBtn: false,
        items: state.items.filter(item => item._id !== action.payload._id),
        currentId: ''
      };
    case itemsActionTypes.DELETE_ITEMS_START:
      return {
        ...state,
        loadingBtn: true,
      };
    case itemsActionTypes.DELETE_ITEMS_SUCCESS:
      return {
        ...state,
        loadingBtn: false,
        items: state.items.filter(item => !action.payload.includes(item._id)),
      };
    case itemsActionTypes.DELETE_ERROR:
      return {
        ...state,
        loadingBtn: false,
      };
    case itemsActionTypes.CLOSE_FORM:
      return {
        ...state,
        openModalForm: false,
        currentId: '',
        currentAction: '',
        isEditing: false,
        valuesForEdit: { ...defaultItemValues },
      };
    default:
      return state;
  }
}
