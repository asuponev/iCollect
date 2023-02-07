import React from 'react';
import { Button } from '@mui/material';
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
      <span className="text-white">Admin Panel</span>
    </Button>
  );
}