import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link to="/">
      <span className="text-logo">iCollect</span>
    </Link>
  );
}