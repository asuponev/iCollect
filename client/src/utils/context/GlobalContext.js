import { createContext } from 'react';

const GlobalContext = createContext({
  status: {
    id: '',
    isAuth: false,
    isAdmin: false,
    isActive: true
  },
  userInfo: {
    userId: '',
    firstName: '',
    lastName: ''
  }
});

export default GlobalContext;