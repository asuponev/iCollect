import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Stack, Divider, Tooltip, CircularProgress } from '@mui/material';
import { useIntl } from 'react-intl';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { deleteSelectedUsers } from '../../../store/action-creators/admin';

const AdminTools = ({ selectedUsers }) => {
  const dispatch = useDispatch();
  const { loadingBtn } = useSelector(state => state.admin);
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
                    dispatch(deleteSelectedUsers(selectedUsers));
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