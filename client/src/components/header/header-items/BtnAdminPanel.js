import React from 'react';
import { Button, Typography } from '@mui/material';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import { useNavigate } from 'react-router';

export const BtnAdminPanel = () => {
  let navigate = useNavigate();

  return (
    <Button
      variant="text"
      onClick={() => navigate('/admin')}
      startIcon={
        <AppsOutlinedIcon sx={{ color: "#FFFFFF" }} />
      }
      sx={{ height: 32 }}
    >
      <Typography variant="button" color="#FFFFFF">Admin Panel</Typography>
    </Button>
  );
}