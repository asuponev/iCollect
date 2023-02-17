import React, { useContext } from 'react';
import { Button, Typography } from '@mui/material';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import { useNavigate } from 'react-router';

export const BtnAccount = () => {
  const { userInfo } = useContext(GlobalContext);
  let navigate = useNavigate();

  return (
    <Button
      variant="text"
      onClick={() => navigate(`/users/${userInfo.userId}`)}
      startIcon={
        <PermIdentityOutlinedIcon sx={{ color: "#FFFFFF" }} />
      }
      sx={{ height: 32 }}
    >
      <Typography variant="button" color="#FFFFFF">Account</Typography>
    </Button>
  );
}