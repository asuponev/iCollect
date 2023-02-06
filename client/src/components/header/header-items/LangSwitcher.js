import React, { useState } from 'react';
import { Select, FormControl, MenuItem } from '@mui/material';

import './header-items.scss';

export const LangSwitcher = () => {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');

  const handleChange = (event) => {
    setLang(event.target.value);
    localStorage.setItem('lang', event.target.value);
  }

  return (
    <FormControl>
      <Select
        name="lang"
        value={lang}
        onChange={handleChange}
        className="header__lang-switcher"
      >
        <MenuItem value={"en"}>
          <span className="header__lang-switcher-item">En</span>
        </MenuItem>
        <MenuItem value={"ru"}>
          <span className="header__lang-switcher-item">Ru</span>
        </MenuItem>
      </Select>
    </FormControl>
  )
}