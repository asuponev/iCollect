import React from 'react';
import { IconButton, Stack, Divider, Tooltip, CircularProgress } from '@mui/material';
import { useIntl } from 'react-intl';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const AdminTools = ({
  selectedUsers,
  deleteSelectedUsers,
  loadingBtn
}) => {
  const { messages } = useIntl();
  const text = messages["app.admin-panel"];

  return (
    <>
      {
        selectedUsers.length === 0 ? (
          <Stack sx={{ height: 36 }}></Stack>
        ) : (
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Stack>{text.tools.select} {selectedUsers.length}</Stack>
            <Tooltip title={text.tools.deleteusers} placement="top">
              <IconButton
                color="#585E67"
                onClick={() => {
                  if (window.confirm(text.tools.confirm)) {
                    deleteSelectedUsers(selectedUsers);
                  }
                }}
              >
                {
                  loadingBtn
                    ? <CircularProgress color="primary" size={24} />
                    : <DeleteOutlinedIcon />
                }
              </IconButton>
            </Tooltip>
          </Stack>
        )
      }
    </>
  );
}

export default AdminTools;