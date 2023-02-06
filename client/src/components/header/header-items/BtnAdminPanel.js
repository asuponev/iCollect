import React from 'react';
import { Button } from '@mui/material';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import { useNavigate } from 'react-router';

import routes from '../../../utils/routes';

export const BtnAdminPanel = () => {
  let navigate = useNavigate();

  return (
    <Button
      variant="text"
      onClick={() => navigate(routes.ADMIN)}
      startIcon={
        <AppsOutlinedIcon sx={{ color: "#FFFFFF" }} />
      }
    >
      <span className="text-white">Admin Panel</span>
    </Button>
  );
}