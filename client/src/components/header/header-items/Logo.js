import React from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useWindowWidth } from '@react-hook/window-size';

export const Logo = () => {
  const windowWidth = useWindowWidth();

  return (
    <Link to="/" style={{ textDecoration: 'none' }}>
      <Typography 
        color="#FFFFFF"
        fontSize={windowWidth > 600 ? 18 : 14}
        fontWeight={500}>iCollect</Typography>
    </Link>
  );
}