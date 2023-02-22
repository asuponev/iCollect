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
  },
  lang: 'en',
});

export default GlobalContext;