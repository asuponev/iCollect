import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { GridActionsCellItem } from '@mui/x-data-grid/components/cell';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useIntl } from 'react-intl';

import CustomizeMui from '../../../utils/theme/customizeMui';

import AdminTools from './admin-tools';

const AdminTable = ({
  users,
  deleteSelectedUsers,
  blockSelectedUsers,
  makeAdminSelectedUsers,
}) => {
  if (!users) users = [];
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { tableStyles } = CustomizeMui();
  const { messages } = useIntl();
  const text = messages["app.admin-panel"];

  let navigate = useNavigate();
  const routeChange = (id) => {
    let path = `/users/${id}`;
    navigate(path);
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1, minWidth: 70 },
    { field: 'firstName', headerName: text.table.firstName, flex: 1, minWidth: 130 },
    { field: 'lastName', headerName: text.table.lastName, flex: 1, minWidth: 130 },
    { field: 'email', headerName: text.table.email, flex: 1, minWidth: 180 },
    { field: 'status', headerName: text.table.status, flex: 1, minWidth: 70 },
    { field: 'role', headerName: text.table.role, flex: 1, minWidth: 70 },
    { field: 'date', headerName: text.table.created, flex: 1, minWidth: 130 },
    {
      field: 'actions', type: 'actions', width: 50, getActions: (params) => [
        <GridActionsCellItem
          icon={<VisibilityOutlinedIcon color="primary" />}
          label="View profile"
          onClick={() => routeChange(params.id)}
        />]
    },
  ];

  const formatDate = (date) => {
    return date.slice(0, 10);
  };

  const rows = users?.map(user => {
    return {
      id: user?._id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      status: user.isActive === true ? text.table.active : text.table.blocked,
      role: user?.role,
      date: user ? (formatDate(user.createdAt)) : '',
    }
  });

  const tableSize = users.length > 10 ? 10 : users.length;
  const tableHeight = tableSize * 40 + 100;

  return (
    <>
      <AdminTools
        selectedUsers={selectedUsers}
        deleteSelectedUsers={deleteSelectedUsers}
        blockSelectedUsers={blockSelectedUsers}
        makeAdminSelectedUsers={makeAdminSelectedUsers}
      />
      <Stack height={tableHeight} width="100%">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={tableSize}
          rowsPerPageOptions={[tableSize]}
          checkboxSelection
          headerHeight={44}
          rowHeight={40}
          onSelectionModelChange={(newSelect) => {
            setSelectedUsers(newSelect);
          }}
          selectionModel={selectedUsers}
          sx={tableStyles}
        />
      </Stack>
    </>
  );
}

export default AdminTable;