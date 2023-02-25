import { useTheme } from '@mui/material';

export const ImageUploadStyles = () => {
  const theme = useTheme();
  return (
    {
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
    }
  );
}