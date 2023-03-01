import { useContext } from 'react';

import GlobalContext from '../context/GlobalContext';

const useAuthService = () => {
  const { status, setStatus, userInfo, setUserInfo } = useContext(GlobalContext);

  const changeAuthStatus = (data) => {
    setUserInfo({
      ...userInfo,
      firstName: data.firstName,
      lastName: data.lastName,
      userId: data._id
    });
    if (data.role === 'ADMIN') {
      setStatus({ ...status, isAdmin: true, isAuth: true });
    } else {
      setStatus({ ...status, isAuth: true });
    }
  };

  const removeAuthStatus = () => {
    setUserInfo({
      ...userInfo,
      userId: '',
      firstName: '',
      lastName: ''
    });
    setStatus({ ...status, isAuth: false, isAdmin: false });
  };

  return { changeAuthStatus, removeAuthStatus }
}

export default useAuthService;

