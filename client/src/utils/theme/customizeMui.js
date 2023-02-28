import { useTheme } from '@mui/material';

const CustomizeMui = () => {
  const theme = useTheme();

  const cardStyles = {
    boxShadow: "2px 2px 16px rgba(0, 0, 0, 0.1)",
    borderRadius: 2,
    backgroundColor: theme.palette.background.card
  };

  const avatarStyles = {
    background: "linear-gradient(180deg, #F43B47 0%, #453A94 100%)",
    width: 40,
    height: 40,
    fontSize: 16,
    color: "#FFFFFF"
  };

  const tableStyles = {
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
  };

  const tagStylesCloud = {
    color: theme.palette.text.tags,
    backgroundColor: theme.palette.background.tags,
    borderRadius: "100px",
    padding: "10px 18px",
    "&:hover": {
      color: theme.palette.text.main,
      backgroundColor: theme.palette.hover.tags,
    }
  };

  const tagStyles = {
    color: theme.palette.text.tags,
    backgroundColor: theme.palette.background.tags,
    borderRadius: "100px",
    padding: "4px 8px",
    maxWidth: "100%"
  };

  const textareaCommentStyles = {
    width: "100%",
    resize: "none",
    padding: "8px 12px",
    border: `1px solid ${theme.palette.borders.comment}`,
    borderRadius: 8,
    color: theme.palette.text.main,
    backgroundColor: theme.palette.background.card
  };

  const imageUploadStyles = {
    width: "100%",
    "& .MuiInputBase-root": {
      height: 160,
    },
    "& .MuiInputBase-input": {
      height: "100%",
      padding: 0,
      border: "1px dashed #585E67",
      background: theme.palette.background.card,
      cursor: "pointer",
      borderRadius: "8px",
      color: "#000000",
      "&::placeholder": {
        visibility: "hidden"
      },
      "&::file-selector-button": {
        visibility: "hidden",
        width: "100%",
      },
    },
    "& .MuiInputBase-input:hover": {
      border: "1px solid #000000"
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
      padding: 0,
    }
  };

  return {
    cardStyles,
    avatarStyles,
    tableStyles,
    tagStylesCloud,
    tagStyles,
    textareaCommentStyles,
    imageUploadStyles
  };
}

export default CustomizeMui;