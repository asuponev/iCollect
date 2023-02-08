import React from 'react';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

export const BtnLogOut = ({ status, setStatus }) => {
  let navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setStatus({ ...status, id: '', isAdmin: false, isAuth: false });
    navigate('/');
  }

  return (
    <Button
      variant="contained"
      sx={{ backgroundColor: "#2F4059", height: 32 }}
      onClick={logout}
    >
      <Typography variant="button" color="#FFFFFF">Log Out</Typography>
    </Button>
  );
}