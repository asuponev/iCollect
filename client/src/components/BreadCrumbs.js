import React, { useContext } from 'react';
import { Breadcrumbs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import GlobalContext from '../utils/context/GlobalContext';

const BreadCrumbs = ({ prevLinks, current }) => {
  const { lang } = useContext(GlobalContext);
  let links = []
  if (prevLinks) {
    links = prevLinks.map((link, i) => {
      return (
        <Typography variant="body2" color="text.secondary" key={i}>
          <Link to={Object.values(link)[0]}>
            {Object.keys(link)[0]}
          </Link>
        </Typography>
      );
    });
  };

  return (
    <Breadcrumbs sx={{ mt: 3 }}>
      <Typography variant="body2" color="text.secondary">
        <Link to='/'>
          {lang === 'en' ? 'Home' : 'Главная страница'}
        </Link>
      </Typography>
      {links}
      <Typography variant="body2" color="text.secondary">
        {current}
      </Typography>
    </Breadcrumbs>
  );
}

export default BreadCrumbs;