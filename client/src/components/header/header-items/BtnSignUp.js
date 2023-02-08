import React from 'react';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

export const BtnSignUp = () => {
  let navigate = useNavigate();

  const onClickSignUp = () => {
    navigate('/register');
  }

  return (
    <Button
      variant="contained"
      onClick={onClickSignUp}
      sx={{ height: 32 }}
    >
      <Typography variant="button" color="#FFFFFF">Sign Up</Typography>
    </Button>
  );
}