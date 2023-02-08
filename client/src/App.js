import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';

import GlobalContext from './utils/context/GlobalContext';
import { checkAuth } from './utils/requests/requests';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import * as Pages from './pages/pages';

function App() {
  const [status, setStatus] = useState({
    id: '',
    isAuth: false,
    isAdmin: false,
    isActive: true,
  })

  useEffect(() => {
    checkAuth()
      .then(res => {
        if (res.role === 'ADMIN') {
          setStatus({ ...status, id: res._id, isAuth: true, isAdmin: true });
        } else {
          setStatus({ ...status, id: res._id, isAuth: true });
        }
      })
      .catch(error => {
        setStatus({ ...status, id: '', isAuth: false });
        console.log(error.message);
      })
    // eslint-disable-next-line
  }, [])

  return (
    <GlobalContext.Provider value={{ status, setStatus }}>
      <Header />
      <Container maxWidth="xl">
        <Routes>
          <Route path="/" element={<Pages.Home />} />
          <Route path="/login" element={<Pages.Login />} />
          <Route path="/register" element={<Pages.Registration />} />
          <Route path="/users/:id" element={<Pages.Account />} />
          <Route path="/admin" element={<Pages.Admin />} />
        </Routes>
      </Container>
      <Footer />
    </GlobalContext.Provider>
  );
}

export default App;
