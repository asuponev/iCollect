import { Breadcrumbs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const BreadCrumbs = () => {
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ marginTop: 3 }}>
      <Link to="/">
        <Typography variant="body2" color="text.secondary">Home</Typography>
      </Link>
      <Typography variant="body2" color="text.secondary">Admin Panel</Typography>
    </Breadcrumbs>
  )
}

export default BreadCrumbs;