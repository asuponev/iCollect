import React, { useState } from 'react';
import { IconButton, Stack, Tooltip } from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { useIntl } from 'react-intl';

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'ligth');
  const { messages } = useIntl();
  
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
            ? `${messages["app.header.theme-light"]}`
            : `${messages["app.header.theme-dark"]}`
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