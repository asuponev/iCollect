import { Breadcrumbs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const BreadCrumbs = ({ prevLinks, current }) => {

  const links = prevLinks.map((link, i) => {
    return (
      <Link to={Object.values(link)[0]} key={i}>
        <Typography variant="body2" color="text.secondary">{Object.keys(link)[0]}</Typography>
      </Link>
    )
  });

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ marginTop: 3 }}>
      {links}
      <Typography variant="body2" color="text.secondary">
        {current}
      </Typography>
    </Breadcrumbs>
  );
}

export default BreadCrumbs;