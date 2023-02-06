import React from 'react';
import { Stack } from '@mui/material';

export const ThemeSwitcher = () => {
  return (
    <Stack direction="row" spacing={0.8} alignItems="center">
      <span className="text-white">Dark Mode</span>
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