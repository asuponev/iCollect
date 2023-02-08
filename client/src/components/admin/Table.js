import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';

import TableTools from './TableTools';

const Table = ({ users }) => {
  if (!users) users = [];

  const [selectedUsers, setSelectedUsers] = useState([]);

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1, minWidth: 70 },
    { field: 'firstName', headerName: 'First name', flex: 1, minWidth: 130 },
    { field: 'lastName', headerName: 'Last name', flex: 1, minWidth: 130 },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 130 },
    { field: 'status', headerName: 'Status', flex: 1, minWidth: 130 },
    { field: 'role', headerName: 'Role', flex: 1, minWidth: 130 },
    { field: 'date', headerName: 'Date of registr', flex: 1, minWidth: 130 },
  ]

  const formatDate = (date) => {
    return date.slice(0, 10);
  }

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
  })

  return (
    <>
      <TableTools selectedUsers={selectedUsers} />
      <div style={{ height: "calc(100vh - 64px)", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={15}
          rowsPerPageOptions={[15]}
          checkboxSelection
          headerHeight={44}
          rowHeight={40}
          onSelectionModelChange={(newSelect) => {
            setSelectedUsers(newSelect);
          }}
          selectionModel={selectedUsers}
          sx={{
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#FAFAFA",
            },
            "& .MuiDataGrid-row": {
              cursor: "pointer",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#EEEFF0",
            },
            "& .MuiDataGrid-iconSeparator": {
              display: "none"
            },
            "& .MuiDataGrid-footerContainer": {
              justifyContent: "flex-end"
            },
            "& .MuiDataGrid-selectedRowCount": {
              display: "none"
            },
            "& .MuiTablePagination-displayedRows": {
              margin: 0
            }
          }}
        />
      </div>
    </>
  )
}

export default Table;