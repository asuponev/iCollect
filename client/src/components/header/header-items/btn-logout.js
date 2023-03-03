import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { FormattedMessage } from 'react-intl';

import { removeAuthData } from '../../../store/action-creators/auth';

export const BtnLogOut = ({ onMenuToggle }) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    dispatch(removeAuthData());
    navigate('/');
    onMenuToggle();
  }

  return (
    <Button
      variant="contained"
      sx={{ backgroundColor: "#2F4059", height: 32 }}
      onClick={logout}
    >
      <Typography variant="button" color="#FFFFFF">
        <FormattedMessage id="app.header.btn-logout" />
      </Typography>
    </Button>
  );
}