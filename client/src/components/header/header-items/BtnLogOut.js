import React from 'react';
import { Button } from '@mui/material';

export const BtnLogOut = ({ setIsAuth }) => {

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuth(false);
  }

  return (
    <Button
      variant="contained"
      sx={{ backgroundColor: "#2F4059", height: "32px" }}
      onClick={logout}
    >
      <span className="text-white">Log Out</span>
    </Button>
  );
}