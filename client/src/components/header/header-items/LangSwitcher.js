import React, { useContext } from 'react';
import { Select, FormControl, MenuItem } from '@mui/material';
import GlobalContext from '../../../utils/context/GlobalContext';

export const LangSwitcher = () => {
  const { lang, setLang } = useContext(GlobalContext);

  const handleChange = (event) => {
    setLang(event.target.value);
    localStorage.setItem('lang', event.target.value);
  };

  return (
    <FormControl>
      <Select
        name="lang"
        value={lang}
        onChange={handleChange}
        sx={{
          width: 64,
          "& .MuiSelect-select": {
            width: "100%",
            color: "#FFFFFF",
            background: "#192B45",
            padding: "6px 30px 5.88px 12px",
            borderRadius: "4px",
            fontSize: 14,
            lineHeight: "20px"
          },
          "& .MuiSvgIcon-root": {
            fill: "#FFFFFF"
          }
        }}
      >
        <MenuItem value={"en"}>En</MenuItem>
        <MenuItem value={"ru"}>Ru</MenuItem>
      </Select>
    </FormControl>
  );
}