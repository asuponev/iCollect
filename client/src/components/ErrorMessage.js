import { Stack, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ErrorMessage = ({ error }) => {
  return (
    <Stack alignItems="center" spacing={3} my={10}>
      <ErrorOutlineIcon fontSize="large"/>
      <Typography>{error}</Typography>
    </Stack>

  )
}

export default ErrorMessage;