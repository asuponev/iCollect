import React, { useState } from 'react';
import { FormControl, InputAdornment, TextField } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

import './header-items.scss'

export const Search = () => {
  const [value, setValue] = useState('');
  const [showClearIcon, setShowClearIcon] = useState('none');

  const handleChange = (event) => {
    setValue(event.target.value);
    setShowClearIcon(event.target.value === '' ? 'none' : 'flex');
  };

  const handleClear = () => {
    setValue('');
    setShowClearIcon('none');
  };

  return (
    <FormControl>
      <TextField
        size="small"
        variant="outlined"
        value={value}
        onChange={handleChange}
        placeholder="Search..."
        className="header__search-input"
        sx={{
          backgroundColor: "#192B45",
          width: 200,
          borderRadius: "4px"
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlinedIcon sx={{ color: "#7E97BB" }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment
              position="end"
              style={{ display: showClearIcon }}
              onClick={handleClear}
            >
              <ClearOutlinedIcon 
                sx={{ color: "#7E97BB" }}
                role="button"
              />
            </InputAdornment>
          )
        }}
      />
    </FormControl>
  );
};
