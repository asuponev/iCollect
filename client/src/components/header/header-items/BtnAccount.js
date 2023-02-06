import React from 'react';
import { Button } from '@mui/material';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import { useNavigate } from 'react-router';

import routes from '../../../utils/routes';

export const BtnAccount = () => {
  let navigate = useNavigate();

  return (
    <Button
      variant="text"
      onClick={() => navigate(routes.ACCOUNT)}
      startIcon={
        <PermIdentityOutlinedIcon sx={{ color: "#FFFFFF" }} />
      }
    >
      <span className="text-white">Account</span>
    </Button>
  );
}