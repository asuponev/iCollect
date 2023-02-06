import React from 'react';
import { Button } from '@mui/material';

export const BtnLogOut = () => {

  const logout = () => {
    localStorage.removeItem('token');
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