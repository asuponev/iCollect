import { oprionsActionTypes } from '../action-types/action-types';

const initialState = {
  mode: localStorage.getItem('theme') || 'light',
  lang: localStorage.getItem('lang') || 'en'
}

export const optionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case oprionsActionTypes.CHANGE_MODE:
      return {
        ...state,
        mode: state.mode === 'light' ? 'dark' : 'light'
      };
    case oprionsActionTypes.CHANGE_LANG:
      return {
        ...state,
        lang: action.payload
      };
    default:
      return state;
  }
}
