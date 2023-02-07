import { Breadcrumbs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const BreadCrumbs = ({ userData }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ marginTop: 3 }}>
      <Link to="/">
        <Typography variant="body2" color="text.secondary">Home</Typography>
      </Link>
      <Typography variant="body2" color="text.secondary">{userData.firstName} {userData.lastName}</Typography>
    </Breadcrumbs>
  )
}

export default BreadCrumbs;