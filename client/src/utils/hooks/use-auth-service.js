import { useContext } from 'react';
import { useNavigate } from 'react-router';

import GlobalContext from '../context/GlobalContext';

const useAuthService = () => {
  const { status, setStatus, userInfo, setUserInfo } = useContext(GlobalContext);
  let navigate = useNavigate();

  const changeAuthStatus = (data) => {
    localStorage.setItem('token', data.token);
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
    navigate('/');
  };

  return { changeAuthStatus }
}

export default useAuthService;

