import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { FormControl, InputAdornment, TextField } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

export const Search = () => {
  let navigate = useNavigate();
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

  const onSubmit = () => {
    if (value) {
      navigate(`/search/${value.trim()}`);
      handleClear();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <FormControl>
      <TextField
        size="small"
        variant="outlined"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        sx={{
          backgroundColor: "#192B45",
          maxWidth: 300,
          borderRadius: "4px",
          "& input": {
            color: "#FFFFFF",
            fontSize: 14,
            height: "32px",
            padding: 0
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" onClick={onSubmit} sx={{ cursor: "pointer" }}>
              <SearchOutlinedIcon sx={{ color: "#7E97BB" }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment
              position="end"
              style={{ display: showClearIcon, cursor: "pointer" }}
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
