import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Stack, Tooltip, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { GridActionsCellItem } from '@mui/x-data-grid/components/cell';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import FontDownloadOutlinedIcon from '@mui/icons-material/FontDownloadOutlined';
import DoNotTouchOutlinedIcon from '@mui/icons-material/DoNotTouchOutlined';
import { useIntl } from 'react-intl';

import {
  blockSelectedUser,
  makeAdminSelectedUser,
  deleteSelectedUser
} from '../../../store/action-creators/admin';

import CustomizeMui from '../../../utils/theme/customizeMui';

const AdminTable = ({ selectedUsers, setSelectedUsers }) => {
  const dispatch = useDispatch();
  const { users, loadingBtn, currentAction } = useSelector(state => state.admin);
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
      field: 'view', type: 'actions', width: 50, getActions: (params) => [
        <GridActionsCellItem
          icon={<VisibilityOutlinedIcon color='primary' />}
          label='View profile'
          onClick={() => routeChange(params.id)}
        />]
    },
    {
      field: 'block', type: 'actions', width: 50, getActions: (params) => [
        <GridActionsCellItem
          icon={
            loadingBtn && params.id === currentAction.id && currentAction.action === 'block'
              ? <CircularProgress color='primary' size={20} />
              : params.row.status === 'active' || params.row.status === 'Активный'
                ? <Tooltip title={text.tools.block} placement='top'><BlockOutlinedIcon /></Tooltip>
                : <Tooltip title={text.tools.unblock} placement='top'><DoneOutlinedIcon /></Tooltip>
          }
          label="Block user"
          onClick={() => dispatch(blockSelectedUser(params.id))}
        />]
    },
    {
      field: 'admin', type: 'actions', width: 50, getActions: (params) => [
        <GridActionsCellItem
          icon={
            loadingBtn && params.id === currentAction.id && currentAction.action === 'admin'
              ? <CircularProgress color="primary" size={20} />
              : params.row.role === 'USER'
                ? <Tooltip title={text.tools.makeadmin} placement='top'><FontDownloadOutlinedIcon /></Tooltip>
                : <Tooltip title={text.tools.notadmin} placement='top'><DoNotTouchOutlinedIcon /></Tooltip>
          }
          label='Make admin'
          onClick={() => dispatch(makeAdminSelectedUser(params.id))}
        />]
    },
    {
      field: 'delete', type: 'actions', width: 50, getActions: (params) => [
        <GridActionsCellItem
          icon={
            loadingBtn && params.id === currentAction.id && currentAction.action === 'delete'
              ? <CircularProgress color='primary' size={20} />
              : <Tooltip title={text.tools.deleteuser} placement='top'><DeleteOutlinedIcon /></Tooltip>
          }
          label='Delete user'
          onClick={() => {
            if (window.confirm(text.tools.confirm)) {
              dispatch(deleteSelectedUser(params.id));
            }
          }}
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