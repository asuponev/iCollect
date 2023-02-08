import React from 'react';
import { Stack, Typography } from '@mui/material';

export const ThemeSwitcher = () => {
  return (
    <Stack direction="row" spacing={0.8} alignItems="center">
      <Typography variant="caption" fontSize={14} color="#FFFFFF">Dark Mode</Typography>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="button"
        />
      </div>
    </Stack>
  );
}