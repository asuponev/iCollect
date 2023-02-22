import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';

import GlobalContext from './utils/context/GlobalContext';
import { IntlProvider } from 'react-intl';
import { checkAuth } from './utils/requests/requests';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import * as Pages from './pages/pages';

import enMessages from './utils/localizations/en.json'
import ruMessages from './utils/localizations/ru.json'
const messages = {
  'en': enMessages,
  'ru': ruMessages,
};

function App() {
  const [status, setStatus] = useState({
    isAuth: false,
    isAdmin: false,
    isActive: true,
  });
  const [userInfo, setUserInfo] = useState({
    userId: '',
    firstName: '',
    lastName: ''
  });
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');

  useEffect(() => {
    checkAuth()
      .then(res => {
        if (res.role === 'ADMIN') {
          setStatus({ ...status, isAuth: true, isAdmin: true });
        } else {
          setStatus({ ...status, isAuth: true });
        }
        setUserInfo({ ...userInfo, userId: res._id, firstName: res.firstName, lastName: res.lastName })
      })
      .catch(error => {
        setStatus({ ...status, isAuth: false });
        setUserInfo({ ...userInfo, userId: '', firstName: '', lastName: '' })
        console.log(error.message);
      })
    // eslint-disable-next-line
  }, []);

  return (
    <GlobalContext.Provider value={{
      status,
      setStatus,
      userInfo,
      setUserInfo,
      lang,
      setLang
    }}>
      <IntlProvider locale={lang} messages={messages[lang]}>
        <Header />
        <Container maxWidth={false} sx={{ maxWidth: 1440 }}>
          <Routes>
            <Route path="/" element={<Pages.Home />} />
            <Route path="/login" element={<Pages.Login />} />
            <Route path="/register" element={<Pages.Registration />} />
            <Route path="/users/:userId" element={<Pages.Account />} />
            <Route path="/collections/:collectionId" element={<Pages.Collection />} />
            <Route path="/collections/:collectionId/items/:itemId" element={<Pages.Item />} />
            <Route path="/admin" element={<Pages.Admin />} />
            <Route path="/search/:value" element={<Pages.SearchResult />} />
          </Routes>
        </Container>
        <Footer />
      </IntlProvider>
    </GlobalContext.Provider>
  );
}

export default App;
