import { useTheme } from '@mui/material';

export const CardStyles = () => {
  const theme = useTheme();
  return (
    {
      boxShadow: "2px 2px 16px rgba(0, 0, 0, 0.1)",
      borderRadius: 2,
      backgroundColor: theme.palette.background.card
    }
  );
}