import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select, FormControl, MenuItem } from '@mui/material';

import { handleChangeLang } from '../../../store/action-creators/options';

export const LangSwitcher = () => {
  const dispatch = useDispatch();
  const { lang } = useSelector(state => state.options);

  return (
    <FormControl>
      <Select
        name="lang"
        value={lang}
        onChange={(event) => dispatch(handleChangeLang(event.target.value))}
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