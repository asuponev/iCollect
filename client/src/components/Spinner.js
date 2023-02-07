import { Stack, CircularProgress, Typography } from '@mui/material';

const Spinner = () => {
  return (
    <Stack alignItems="center" justifyContent="center" spacing={3} my={10}>
      <CircularProgress />
      <Typography>Loading</Typography>
    </Stack>
  )
}

export default Spinner;