import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../../utils/routes';

export const Logo = () => {
  return (
    <Link to={routes.HOME}>
      <span className="text-logo">iCollect</span>
    </Link>
  );
}