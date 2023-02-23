import { useTheme } from '@mui/material';

export const TagStylesBig = () => {
  const theme = useTheme();
  return (
    {
      color: theme.palette.text.tags,
      backgroundColor: theme.palette.background.tags,
      borderRadius: "100px",
      padding: "10px 18px",
      "&:hover": {
        color: theme.palette.text.main,
        backgroundColor: theme.palette.hover.tags,
      }
    }
  );
}

export const TagStylesSmall = () => {
  const theme = useTheme();
  return (
    {
      color: theme.palette.text.tags,
      backgroundColor: theme.palette.background.tags,
      borderRadius: "100px",
      padding: "4px 8px",
      maxWidth: "100%"
    }
  );
}