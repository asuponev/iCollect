import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { GridActionsCellItem } from '@mui/x-data-grid/components/cell';
import LaunchIcon from '@mui/icons-material/Launch';
import AdminTableTools from './admin-table-tools';
import { tableStyles } from './table-styles';

const AdminTable = ({ users, deleteSelectedUsers, blockSelectedUsers, makeAdminSelectedUsers }) => {
  if (!users) users = [];

  const [selectedUsers, setSelectedUsers] = useState([]);

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1, minWidth: 70 },
    { field: 'firstName', headerName: 'First name', flex: 1, minWidth: 130 },
    { field: 'lastName', headerName: 'Last name', flex: 1, minWidth: 130 },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 180 },
    { field: 'status', headerName: 'Status', flex: 1, minWidth: 70 },
    { field: 'role', headerName: 'Role', flex: 1, minWidth: 70 },
    { field: 'date', headerName: 'Created on', flex: 1, minWidth: 130 },
    {
      field: 'actions', type: 'actions', width: 50, getActions: (params) => [
        <GridActionsCellItem
          icon={<LaunchIcon color="primary" />}
          label="View profile"
          onClick={() => window.open(`/users/${params.id}`, '_blank')}
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
      status: user.isActive === true ? 'active' : 'blocked',
      role: user?.role,
      date: user ? (formatDate(user.createdAt)) : '',
    }
  });

  const tableSize = users.length > 10 ? 10 : users.length;
  const tableHeight = tableSize * 40 + 100;

  return (
    <>
      <AdminTableTools
        selectedUsers={selectedUsers}
        deleteSelectedUsers={deleteSelectedUsers}
        blockSelectedUsers={blockSelectedUsers}
        makeAdminSelectedUsers={makeAdminSelectedUsers}
      />
      <div style={{ height: tableHeight, width: "100%" }}>
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
      </div>
    </>
  );
}

export default AdminTable;