import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';

export const BtnLogIn = () => {
  let navigate = useNavigate();

  const onClickLogin = () => {
    navigate('/login');
  }

  return (
    <Button
      variant="text"
      onClick={onClickLogin}
      sx={{ height: 32 }}
    >
      <span className="text-white">Log In</span>
    </Button>
  );
}