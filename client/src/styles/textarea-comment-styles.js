import { useTheme } from '@mui/material';

export const TextareaCommentStyles = () => {
  const theme = useTheme();
  return (
    {
      width: "100%",
      resize: "none",
      padding: "8px 12px",
      border: `1px solid ${theme.palette.borders.comment}`,
      borderRadius: 8,
      color: theme.palette.text.main,
      backgroundColor: theme.palette.background.card
    }
  );
}