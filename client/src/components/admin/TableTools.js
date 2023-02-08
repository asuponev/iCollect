import { IconButton, Stack, Typography, Divider } from '@mui/material';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const TableTools = ({ selectedUsers }) => {

  return (
    <Stack spacing={3} mt={2} mb={3}>
      <Typography variant="h5" fontWeight="500">Users</Typography>
      {
        selectedUsers.length === 0 ? (
          <Stack sx={{ height: 36 }} mt={3}></Stack>
        ) : (
          <Stack direction="row" alignItems="center" spacing={3} divider={<Divider orientation="vertical" flexItem />}>
            <Stack>Selected {selectedUsers.length} users</Stack>
            <IconButton color="#585E67">
              <BlockOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton color="#585E67">
              <DeleteOutlinedIcon fontSize="small" />
            </IconButton>
          </Stack>
        )
      }

    </Stack>
  )
}

export default TableTools;