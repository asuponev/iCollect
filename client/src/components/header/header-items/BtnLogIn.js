import React from 'react';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { FormattedMessage } from 'react-intl';

export const BtnLogIn = ({ onMenuToggle }) => {
  let navigate = useNavigate();

  const onClickLogin = () => {
    navigate('/login');
    onMenuToggle();
  };

  return (
    <Button
      variant="text"
      onClick={onClickLogin}
      sx={{ height: 32 }}
    >
      <Typography variant="button" color="#FFFFFF">
        <FormattedMessage id="app.header.btn-login" />
      </Typography>
    </Button>
  );
}