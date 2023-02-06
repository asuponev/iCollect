import React from 'react';
import { Stack } from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

export const ThemeSwitcher = () => {
  return (
    <Stack direction="row" spacing={0.5} alignItems="center">
      <DarkModeOutlinedIcon sx={{ color: "#FFFFFF" }} />
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