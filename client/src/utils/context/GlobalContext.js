import { createContext } from 'react';

const GlobalContext = createContext({
  isAuth: false,
});

export default GlobalContext;