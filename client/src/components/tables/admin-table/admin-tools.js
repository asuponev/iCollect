import React from 'react';
import { IconButton, Stack, Divider, Tooltip } from '@mui/material';
import { useIntl } from 'react-intl';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import FontDownloadOutlinedIcon from '@mui/icons-material/FontDownloadOutlined';

const AdminTools = ({
  selectedUsers,
  deleteSelectedUsers,
  blockSelectedUsers,
  makeAdminSelectedUsers
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
            <Tooltip title={text.tools.block} placement="top">
              <IconButton
                color="#585E67"
                onClick={() => {
                  if (window.confirm(text.tools.confirm)) {
                    blockSelectedUsers(selectedUsers)
                  }
                }}
              >
                <BlockOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title={text.tools.delete} placement="top">
              <IconButton
                color="#585E67"
                onClick={() => {
                  if (window.confirm(text.tools.confirm)) {
                    deleteSelectedUsers(selectedUsers)
                  }
                }}
              >
                <DeleteOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title={text.tools.makeAdmin} placement="top">
              <IconButton
                color="#585E67"
                onClick={() => {
                  if (window.confirm(text.tools.confirm)) {
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
    </>
  );
}

export default AdminTools;