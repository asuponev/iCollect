import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { IntlProvider } from 'react-intl';

import GlobalContext from './utils/context/GlobalContext';
import { checkAuth } from './utils/requests/requests';
import { themeSettings } from './utils/theme/theme';

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
  const [mode, setMode] = useState(localStorage.getItem('theme') || 'light');
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  useEffect(() => {
    checkAuth()
      .then(res => {
        if (res.role === 'ADMIN') {
          setStatus({ ...status, isAuth: true, isAdmin: true });
        } else {
          setStatus({ ...status, isAuth: true });
        }
        setUserInfo({ ...userInfo, userId: res._id, firstName: res.firstName, lastName: res.lastName });
      })
      .catch(error => {
        setStatus({ ...status, isAuth: false });
        setUserInfo({ ...userInfo, userId: '', firstName: '', lastName: '' });
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
      setLang,
      mode,
      setMode
    }}>
        <ThemeProvider theme={theme}>
          <IntlProvider locale={lang} messages={messages[lang]}>
            <CssBaseline />
            <Header />
            <Container maxWidth={false} sx={{ maxWidth: 1440 }} >
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
        </ThemeProvider>
    </GlobalContext.Provider>
  );
}

export default App;
