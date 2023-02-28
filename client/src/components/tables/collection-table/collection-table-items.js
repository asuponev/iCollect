import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { useIntl } from 'react-intl';
import { Stack, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { GridActionsCellItem } from '@mui/x-data-grid/components/cell';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { convert } from 'html-to-text';

import GlobalContext from '../../../utils/context/GlobalContext';
import CustomizeMui from '../../../utils/theme/customizeMui';

const TableItems = ({
  items,
  selectedItems,
  setSelectedItems,
  extraFields,
  collectionId,
  onEditItem,
  onDeleteItem,
  authorId,
  loadingEdit,
  currentItemId,
  loadingDelete
}) => {
  const { status, userInfo } = useContext(GlobalContext);
  if (!items) items = [];
  const { tableStyles } = CustomizeMui();
  const { messages } = useIntl();
  const text = messages["app.collection"];

  let navigate = useNavigate();
  const routeChange = (id) => {
    let path = `/collections/${collectionId}/items/${id}`;
    navigate(path);
  };

  const constantColumns = [
    { field: 'id', headerName: 'ID', flex: 1, minWidth: 70 },
    { field: 'title', headerName: text.table.item, flex: 1, minWidth: 130 },
    { field: 'tags', headerName: text.table.tags, flex: 1, minWidth: 130 },
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
          icon={
            loadingEdit && currentItemId === params.id
              ? <CircularProgress color="primary" size={20} />
              : <EditOutlinedIcon color="primary" />
          }
          label="Edit item"
          onClick={() => onEditItem(params.id)}
        />]
    },
    {
      field: 'delete', type: 'actions', width: 50, getActions: (params) => [
        <GridActionsCellItem
          icon={
            loadingDelete && currentItemId === params.id
              ? <CircularProgress color="grey" size={20} />
              : <DeleteOutlinedIcon color="grey" />
          }
          label="Delete item"
          onClick={() => {
            if (window.confirm(text.tableTools.confirmDelete)) {
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
      } else if (key === 'text1' || key === 'text2' || key === 'text2') {
        newItem[key] = convert(item[key]);
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
    <Stack height={tableHeight} width="100%" mb={4}>
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