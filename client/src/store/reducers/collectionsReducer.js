import { collectionActionTypes } from '../action-types/action-types'

const initialState = {
  loading: false,
  collections: [],
  error: null,
  loadingBtn: false,
  currentId: '',
  currentAction: '',
  isEditing: false,
  valuesForEdit: {
    title: '',
    subject: '',
    description: '',
    coverUrl: '',
    extraFields: []
  },
  openModalForm: false,
  biggestCollections: []
};

export const collectionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case collectionActionTypes.FETCH_COLLECTIONS_START:
      return {
        ...state,
        loading: true,
        collections: [],
        error: null,
      };
    case collectionActionTypes.FETCH_COLLECTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        collections: action.payload,
        error: null,
      };
    case collectionActionTypes.FETCH_COLLECTIONS_ERROR:
      return {
        ...state,
        loading: false,
        collections: [],
        error: action.payload,
      };
    case collectionActionTypes.FETCH_BIGCOLLECTIONS_START:
      return {
        ...state,
        loading: true,
        biggestCollections: [],
        error: null,
      };
    case collectionActionTypes.FETCH_BIGCOLLECTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        biggestCollections: action.payload,
        error: null,
      };
    case collectionActionTypes.FETCH_BIGCOLLECTIONS_ERROR:
      return {
        ...state,
        loading: false,
        biggestCollections: [],
        error: action.payload,
      };
    case collectionActionTypes.DELETE_START:
      return {
        ...state,
        loadingBtn: true,
        currentId: action.payload,
        currentAction: 'delete'
      };
    case collectionActionTypes.DELETE_SUCCESS:
      return {
        ...state,
        loadingBtn: false,
        collections: state.collections.filter(collection => collection._id !== action.payload._id),
        currentId: ''
      };
    case collectionActionTypes.DELETE_ERROR:
      return {
        ...state,
        loadingBtn: false,
      };
    case collectionActionTypes.FETCH_VALUE_FOR_EDIT_START:
      return {
        ...state,
        loadingBtn: true,
        currentId: action.payload,
        currentAction: 'edit'
      };
    case collectionActionTypes.FETCH_VALUE_FOR_EDIT_SUCCESS:
      return {
        ...state,
        valuesForEdit: {
          title: action.payload.title,
          subject: action.payload.subject,
          description: action.payload.description,
          coverUrl: action.payload.coverUrl,
          extraFields: action.payload.extraFields
        },
        loadingBtn: false,
        openModalForm: true,
        isEditing: true
      };
    case collectionActionTypes.FETCH_VALUE_FOR_EDIT_ERROR:
      return {
        ...state,
        valuesForEdit: {
          title: '',
          subject: '',
          description: '',
          coverUrl: '',
          extraFields: []
        },
        loadingBtn: false,
        currentId: '',
        currentAction: ''
      };
    case collectionActionTypes.CREATE_COLLECTION_START:
      return {
        ...state,
        openModalForm: true
      };
    case collectionActionTypes.CREATE_COLLECTION_SUCCESS:
      return {
        ...state,
        collections: [action.payload, ...state.collections],
        openModalForm: false
      };
    case collectionActionTypes.UPDATE_COLLECTION_SUCCESS:
      return {
        ...state,
        collections: [action.payload, ...state.collections.filter(collection => collection._id !== action.payload._id)],
        openModalForm: false
      };
    case collectionActionTypes.CLOSE_FORM:
      return {
        ...state,
        openModalForm: false,
        currentId: '',
        currentAction: '',
        isEditing: false,
        valuesForEdit: {
          title: '',
          subject: '',
          description: '',
          coverUrl: '',
          extraFields: []
        },
      };
    default:
      return state;
  }
}
