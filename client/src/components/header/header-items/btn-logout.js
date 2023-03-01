import React from 'react';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { FormattedMessage } from 'react-intl';

import useAuthService from '../../../utils/hooks/use-auth-service';

export const BtnLogOut = ({ onMenuToggle }) => {
  let navigate = useNavigate();
  const { removeAuthStatus } = useAuthService();

  const logout = () => {
    localStorage.removeItem('token');
    removeAuthStatus();
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