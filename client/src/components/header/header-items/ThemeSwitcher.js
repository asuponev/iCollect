import React, { useState } from 'react';
import { IconButton, Stack, Tooltip } from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'ligth');

  const handleChange = () => {
    if (theme === 'ligth') {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    }
    if (theme === 'dark') {
      setTheme('ligth');
      localStorage.setItem('theme', 'ligth');
    }
  };

  return (
    <Stack sx={{ background: "#192B45", borderRadius: "4px", height: 32 }}>
      <Tooltip
        title={
          theme === 'dark'
            ? "Turn on the light"
            : "Turn off the light"
        }
      >
        <IconButton size="small" onClick={handleChange} sx={{ color: "#FFFFFF" }}>
          {
            theme === 'dark'
              ? <LightModeOutlinedIcon sx={{ height: 22 }} />
              : <DarkModeOutlinedIcon sx={{ height: 22 }} />
          }
        </IconButton>
      </Tooltip>
    </Stack >
  );
}