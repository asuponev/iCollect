import React from 'react';
import { IconButton, Stack, Typography, Divider, Tooltip } from '@mui/material';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import FontDownloadOutlinedIcon from '@mui/icons-material/FontDownloadOutlined';

const AdminTableTools = ({
  selectedUsers,
  deleteSelectedUsers,
  blockSelectedUsers,
  makeAdminSelectedUsers
}) => {

  return (
    <Stack spacing={2} mt={2} mb={3}>
      <Typography variant="h5" fontWeight="500">Users</Typography>
      {
        selectedUsers.length === 0 ? (
          <Stack sx={{ height: 36 }} mt={3}></Stack>
        ) : (
          <Stack direction="row" alignItems="center" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
            <Stack>Users selected: {selectedUsers.length}</Stack>
            <Tooltip title="Block / Unlock selected users" placement="top">
              <IconButton
                color="#585E67"
                onClick={() => {
                  if (window.confirm('Are you sure?')) {
                    blockSelectedUsers(selectedUsers)
                  }
                }}
              >
                <BlockOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete selected users" placement="top">
              <IconButton
                color="#585E67"
                onClick={() => {
                  if (window.confirm('Are you sure?')) {
                    deleteSelectedUsers(selectedUsers)
                  }
                }}
              >
                <DeleteOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Make admin / Withdraw authority" placement="top">
              <IconButton
                color="#585E67"
                onClick={() => {
                  if (window.confirm('Are you sure?')) {
                    makeAdminSelectedUsers(selectedUsers)
                  }
                }}
              >
                <FontDownloadOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        )
      }
    </Stack>
  );
}

export default AdminTableTools;