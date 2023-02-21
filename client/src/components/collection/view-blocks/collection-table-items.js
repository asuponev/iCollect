import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { GridActionsCellItem } from '@mui/x-data-grid/components/cell';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import GlobalContext from '../../../utils/context/GlobalContext';
import { tableStyles } from '../../admin/table-styles';

const TableItems = ({
  items,
  selectedItems,
  setSelectedItems,
  extraFields,
  collectionId,
  onEditItem,
  onDeleteItem,
  authorId
}) => {
  const { status, userInfo } = useContext(GlobalContext);
  if (!items) items = [];
  let navigate = useNavigate();
  const routeChange = (id) => {
    let path = `/collections/${collectionId}/items/${id}`;
    navigate(path);
  };

  const constantColumns = [
    { field: 'id', headerName: 'ID', flex: 1, minWidth: 70 },
    { field: 'title', headerName: 'Item', flex: 1, minWidth: 130 },
    { field: 'tags', headerName: 'Tags', flex: 1, minWidth: 130 },
  ];

  const extraColumns = extraFields.map(field => {
    return { field: field.type, headerName: field.name, flex: 1, minWidth: 130 }
  });

  const actionColumns = (status.isAuth && authorId === userInfo.userId) || status.isAdmin ? [
    {
      field: 'view', type: 'actions', width: 50, getActions: (params) => [
        <GridActionsCellItem
          icon={<VisibilityOutlinedIcon color="primary" />}
          label="View item"
          onClick={() => routeChange(params.id)}
        />]
    },
    {
      field: 'edit', type: 'actions', width: 50, getActions: (params) => [
        <GridActionsCellItem
          icon={<EditOutlinedIcon color="primary" />}
          label="Edit item"
          onClick={() => onEditItem(params.id)}
        />]
    },
    {
      field: 'delete', type: 'actions', width: 50, getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteOutlinedIcon color="grey" />}
          label="Delete item"
          onClick={() => {
            if (window.confirm('Are you sure?')) {
              onDeleteItem(params.id);
            }
          }}
        />]
    },
  ] : [
    {
      field: 'view', type: 'actions', width: 50, getActions: (params) => [
        <GridActionsCellItem
          icon={<VisibilityOutlinedIcon color="primary" />}
          label="View item"
          onClick={() => window.open(`/collections/${collectionId}/items/${params.id}`, '_self')}
        />]
    },
  ];

  const columns = [
    ...constantColumns,
    ...extraColumns,
    ...actionColumns
  ];

  const rows = items.map(item => {
    let newItem = {};
    for (let key in item) {
      if (key === '_id') {
        newItem.id = item[key];
      } else {
        newItem[key] = item[key];
      }
    }
    return {
      ...newItem
    };
  });

  const tableSize = items.length > 10 ? 10 : items.length;
  const tableHeight = tableSize * 40 + 100;

  return (
    <Stack height={tableHeight} width="100%" mb={10}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={tableSize}
        rowsPerPageOptions={[tableSize]}
        checkboxSelection={(status.isAuth && authorId === userInfo.userId) || status.isAdmin ? true : false}
        headerHeight={44}
        rowHeight={40}
        onSelectionModelChange={(newSelect) => {
          if ((status.isAuth && authorId === userInfo.userId) || status.isAdmin) {
            setSelectedItems(newSelect);
          }
        }}
        selectionModel={selectedItems}
        sx={tableStyles}
      />
    </Stack>
  );
}

export default TableItems;