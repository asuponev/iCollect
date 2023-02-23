import { useTheme } from '@mui/material';

export const TableStyles = () => {
  const theme = useTheme();
  return(
    {
      border: "none",
      "& .MuiDataGrid-columnHeaders": {
        backgroundColor: theme.palette.background.tableheader,
      },
      "& .MuiDataGrid-row": {
        cursor: "pointer",
      },
      "& .MuiDataGrid-row:hover": {
        backgroundColor: theme.palette.hover.tablerow,
      },
      "& .MuiDataGrid-iconSeparator": {
        display: "none"
      },
      "& .MuiDataGrid-footerContainer": {
        justifyContent: "flex-end",
        border: "none"
      },
      "& .MuiDataGrid-selectedRowCount": {
        display: "none"
      },
      "& .MuiTablePagination-displayedRows": {
        margin: 0
      }
    }
  )
};