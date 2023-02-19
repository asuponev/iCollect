import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { GridActionsCellItem } from '@mui/x-data-grid/components/cell';
import LaunchIcon from '@mui/icons-material/Launch';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { tableStyles } from '../../admin/table-styles';

const TableItems = ({
  items,
  selectedItems,
  setSelectedItems,
  extraFields,
  collectionId,
  onEditItem,
  onDeleteItem
}) => {
  if (!items) items = [];

  const constantColumns = [
    { field: 'id', headerName: 'ID', flex: 1, minWidth: 70 },
    { field: 'title', headerName: 'Item', flex: 1, minWidth: 130 },
    { field: 'tags', headerName: 'Tags', flex: 1, minWidth: 130 },
  ];

  const extraColumns = extraFields.map(field => {
    return { field: field.type, headerName: field.name, flex: 1, minWidth: 130 }
  });

  const actionColumns = [
    {
      field: 'view', type: 'actions', width: 50, getActions: (params) => [
        <GridActionsCellItem
          icon={<LaunchIcon color="primary" />}
          label="View item"
          onClick={() => window.open(`/collections/${collectionId}/items/${params.id}`, '_self')}
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
          icon={<DeleteOutlinedIcon color="#585E67" />}
          label="Delete item"
          onClick={() => {
            if (window.confirm('Are you sure?')) {
              onDeleteItem(params.id);
            }
          }}
        />]
    },
  ];

  const columns = [
    ...constantColumns,
    ...extraColumns,
    ...actionColumns
  ];

  const rows = items.map(item => {
    let newItem = {}
    for (let key in item) {
      if (key === '_id') {
        newItem.id = item[key]
      } else {
        newItem[key] = item[key]
      }
    }
    return {
      ...newItem
    }
  });

  const tableSize = items.length > 10 ? 10 : items.length;
  const tableHeight = tableSize * 40 + 100;

  return (
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
          setSelectedItems(newSelect);
        }}
        selectionModel={selectedItems}
        sx={tableStyles}
      />
    </div>
  );
}

export default TableItems;