import React from 'react';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { FormattedMessage } from 'react-intl';

export const BtnSignUp = ({ onMenuToggle }) => {
  let navigate = useNavigate();

  const onClickSignUp = () => {
    navigate('/register');
    onMenuToggle();
  };

  return (
    <Button variant="contained" onClick={onClickSignUp} sx={{ height: 32 }}>
      <Typography variant="button" color="#FFFFFF">
        <FormattedMessage id="app.header.btn-signup" />
      </Typography>
    </Button>
  );
}