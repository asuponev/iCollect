import React from 'react';
import { Button, Typography } from '@mui/material';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import { useNavigate } from 'react-router';
import { FormattedMessage } from 'react-intl';

export const BtnAdminPanel = ({ onMenuToggle }) => {
  let navigate = useNavigate();

  const onHandleClick = () => {
    navigate('/admin');
    onMenuToggle();
  };

  return (
    <Button
      variant="text"
      onClick={onHandleClick}
      startIcon={
        <AppsOutlinedIcon sx={{ color: "#FFFFFF" }} />
      }
      sx={{ height: 32 }}
    >
      <Typography variant="button" color="#FFFFFF">
        <FormattedMessage id="app.header.btn-admin" />
      </Typography>
    </Button>
  );
}