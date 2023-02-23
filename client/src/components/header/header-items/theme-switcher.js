import React, { useContext } from 'react';
import { IconButton, Stack, Tooltip } from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { useIntl } from 'react-intl';

import GlobalContext from '../../../utils/context/GlobalContext';

export const ThemeSwitcher = () => {
  const { mode, setMode } = useContext(GlobalContext);
  const { messages } = useIntl();

  const handleChange = () => {
    if (mode === 'dark') {
      localStorage.setItem('theme', 'light');
      setMode('light');
    } else {
      localStorage.setItem('theme', 'dark');
      setMode('dark');
    }
  };

  return (
    <Stack sx={{ background: "#192B45", borderRadius: 1, height: 32 }}>
      <Tooltip
        title={
          mode === 'dark'
            ? `${messages["app.header.theme-light"]}`
            : `${messages["app.header.theme-dark"]}`
        }
      >
        <IconButton size="small" onClick={handleChange} sx={{ color: "#FFFFFF", height: 32 }}>
          {
            mode === 'dark'
              ? <LightModeOutlinedIcon />
              : <DarkModeOutlinedIcon />
          }
        </IconButton>
      </Tooltip>
    </Stack >
  );
}