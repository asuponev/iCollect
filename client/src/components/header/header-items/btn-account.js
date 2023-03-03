import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Typography } from '@mui/material';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import { useNavigate } from 'react-router';
import { FormattedMessage } from 'react-intl';

export const BtnAccount = ({ onMenuToggle }) => {
  const { userInfo } = useSelector(state => state.auth);
  let navigate = useNavigate();

  const onHandleClick = () => {
    navigate(`/users/${userInfo.userId}`);
    onMenuToggle();
  };

  return (
    <Button
      variant="text"
      onClick={onHandleClick}
      startIcon={
        <PermIdentityOutlinedIcon sx={{ color: "#FFFFFF" }} />
      }
      sx={{ height: 32 }}
    >
      <Typography variant="button" color="#FFFFFF">
        <FormattedMessage id="app.header.btn-account" />
      </Typography>
    </Button>
  );
}