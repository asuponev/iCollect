import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';

import routes from '../../../utils/routes';

export const BtnSignUp = () => {
  let navigate = useNavigate();

  const onClickSignUp = () => {
    navigate(routes.REGISTER);
  }

  return (
    <Button 
      variant="contained" 
      onClick={onClickSignUp}
      sx={{ height: "32px" }}
    >
      <span className="text-white">Sign Up</span>
    </Button>
  );
}