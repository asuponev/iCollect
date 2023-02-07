import { Stack, Avatar, Typography } from '@mui/material';

const UserInfo = ({ userData }) => {

  return (
    <Stack direction="row" spacing={2} alignItems="center" mt={4} mb={6}>
      <Avatar
        sx={{
          background: "linear-gradient(180deg, #F43B47 0%, #453A94 100%)",
          width: 72,
          height: 72,
          fontSize: 24,
        }}>
        {userData.firstName[0]}{userData.lastName[0]}
      </Avatar>
      <Stack>
      <Typography variant="h6">{userData.firstName} {userData.lastName}</Typography>
      <Typography variant="caption" fontSize="14px" color="text.secondary">{userData.email}</Typography>
      </Stack>
    </Stack>
  )
}

export default UserInfo;