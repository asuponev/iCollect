import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';

import GlobalContext from './utils/context/GlobalContext';
import { checkAuth } from './utils/requests/requests';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Account from './pages/Account';
import Header from './components/header/Header';
import Admin from './pages/Admin';
import Footer from './components/footer/Footer';

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
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/users/:id" element={<Account />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Container>
      <Footer />
    </GlobalContext.Provider>
  );
}

export default App;
