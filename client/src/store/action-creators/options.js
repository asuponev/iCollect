import { oprionsActionTypes } from '../action-types/action-types'

export const handleChangeMode = (mode) => {
  return (dispatch) => {
    if (mode === 'dark') {
      localStorage.setItem('theme', 'light');
      dispatch({ type: oprionsActionTypes.CHANGE_MODE });
    } else {
      localStorage.setItem('theme', 'dark');
      dispatch({ type: oprionsActionTypes.CHANGE_MODE });
    }
  }
};

export const handleChangeLang = (lang) => {
  return (dispatch) => {
    localStorage.setItem('lang', lang);
    dispatch({ type: oprionsActionTypes.CHANGE_LANG, payload: lang });
  }
};