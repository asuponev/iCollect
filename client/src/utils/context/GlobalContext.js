import { createContext } from 'react';

const GlobalContext = createContext({
  lang: 'en',
  mode: 'light'
});

export default GlobalContext;