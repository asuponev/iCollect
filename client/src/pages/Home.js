import React, { useEffect, useContext } from 'react';

import { checkAuth } from '../../src/utils/apis/checkAuth';
import urls from '../utils/urls';
import GlobalContext from '../utils/context/GlobalContext';

function Home() {
  const { setIsAuth } = useContext(GlobalContext);

  useEffect(() => {
    fetchAuthMe();
  }, [])

  const fetchAuthMe = async () => {
    try {
      const { data } = await checkAuth(urls.ACCOUNT);
      setIsAuth(true);
    } catch (error) {
      setIsAuth(false);
      console.log(error.response.data.message);
    }
  }

  return (
    <div>
      Hello world
    </div>
  );
}

export default Home;