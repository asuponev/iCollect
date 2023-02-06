import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';

import routes from '../../../utils/routes';

export const BtnLogIn = () => {
  let navigate = useNavigate();

  const onClickLogin = () => {
    navigate(routes.LOGIN);
  }

  return (
    <Button 
      variant="text"
      onClick={onClickLogin}
    >
      <span className="text-white">Log In</span>
    </Button>
  );
}