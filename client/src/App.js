import React, { useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { IntlProvider } from 'react-intl';

import GlobalContext from './utils/context/GlobalContext';
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
      <BrowserRouter>
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
                <Route path="*" element={<Pages.NotFound />} />
              </Routes>
            </Container>
            <Footer />
          </IntlProvider>
        </ThemeProvider>
      </BrowserRouter>
    </GlobalContext.Provider>
  );
}

export default App;
