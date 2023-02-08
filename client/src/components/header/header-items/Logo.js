import React from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link to="/">
      <Typography color="#FFFFFF" fontSize={18} fontWeight={500}>iCollect</Typography>
    </Link>
  );
}