import { createContext } from 'react';

const GlobalContext = createContext({
  status: {
    id: '',
    isAuth: false,
    isAdmin: false,
    isActive: true
  }
});

export default GlobalContext;