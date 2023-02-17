import React, { useContext } from 'react';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

export const BtnLogOut = ({ status, setStatus }) => {
  const { userInfo, setUserInfo } = useContext(GlobalContext);
  const { status, setStatus } = useContext(GlobalContext);
  let navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setStatus({ ...status, isAdmin: false, isAuth: false });
    setUserInfo({ ...userInfo, userId: '', firstName: '', lastName: '' });
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