import { Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';

import routes from './utils/routes';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Container maxWidth="lg">
        <Routes>
          <Route path={routes.HOME} element={<Home />} />
          <Route path={routes.LOGIN} element={<Login />} />
          <Route path={routes.REGISTER} element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
