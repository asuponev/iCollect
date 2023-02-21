import { Breadcrumbs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const BreadCrumbs = ({ prevLinks, current }) => {

  const links = prevLinks.map((link, i) => {
    return (
      <Typography variant="body2" color="text.secondary" key={i}>
        <Link to={Object.values(link)[0]}>
          {Object.keys(link)[0]}
        </Link>
      </Typography>
    );
  });

  return (
    <Breadcrumbs sx={{ marginTop: 3 }}>
      {links}
      <Typography variant="body2" color="text.secondary">
        {current}
      </Typography>
    </Breadcrumbs>
  );
}

export default BreadCrumbs;