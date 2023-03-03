import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Stack, Tooltip } from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { useIntl } from 'react-intl';

import { handleChangeMode } from '../../../store/action-creators/options';

export const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector(state => state.options);
  const { messages } = useIntl();

  return (
    <Stack sx={{ background: "#192B45", borderRadius: 1, height: 32 }}>
      <Tooltip
        title={
          mode === 'dark'
            ? `${messages["app.header.theme-light"]}`
            : `${messages["app.header.theme-dark"]}`
        }
      >
        <IconButton
          size="small"
          onClick={() => dispatch(handleChangeMode(mode))}
          sx={{ color: "#FFFFFF", height: 32 }}
        >
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