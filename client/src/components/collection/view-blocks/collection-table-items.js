import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

// import TableTools from './TableTools';
import { tableStyles } from '../../admin/table-styles';

const TableItems = ({
  items,
  selectedItems,
  setSelectedItems
}) => {
  if (!items) items = [];

  const constantColumns = [
    { field: 'id', headerName: 'ID', flex: 1, minWidth: 70 },
    { field: 'title', headerName: 'Item', flex: 1, minWidth: 130 },
    { field: 'tags', headerName: 'Tags', flex: 1, minWidth: 130 },
  ]

  const columns = constantColumns;

  const rows = items?.map(item => {
    return {
      id: item?._id,
      title: item?.title,
      tags: item?.tags,
    }
  })

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