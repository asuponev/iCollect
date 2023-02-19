import React, { useContext, useState } from 'react';
import { Box, Container, IconButton, Stack } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import * as HeaderItems from './header-items/header-items';
import GlobalContext from '../../utils/context/GlobalContext';
import './header.scss';

function Header() {
  const { status } = useContext(GlobalContext);
  const [openMenu, setOpenMenu] = useState(false);

  const onMenuToggle = () => {
    const btnsBox = document.querySelector('.header__actions-btns');
    setOpenMenu(!openMenu);
    btnsBox.classList.toggle('open');
  }

  return (
    <Box component="header" className="header">
      <Container maxWidth={false} className="header__container">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <HeaderItems.Logo />
            <HeaderItems.Search />
          </Stack>
          <Stack direction="row" position="relative">
            <Stack direction="row" spacing={1}>
              <HeaderItems.ThemeSwitcher />
              <HeaderItems.LangSwitcher />
            </Stack>
            <Box className="header__actions-btns">
              {
                status.isAuth ? (
                  <>
                    {
                      status.isAdmin
                        ? <HeaderItems.BtnAdminPanel onMenuToggle={onMenuToggle} />
                        : null
                    }
                    <HeaderItems.BtnAccount onMenuToggle={onMenuToggle} />
                    <HeaderItems.BtnLogOut onMenuToggle={onMenuToggle} />
                  </>
                ) : (
                  <>
                    <HeaderItems.BtnLogIn onMenuToggle={onMenuToggle} />
                    <HeaderItems.BtnSignUp onMenuToggle={onMenuToggle} />
                  </>
                )
              }
            </Box>
            <Box className="header__burger-menu">
              <IconButton
                onClick={onMenuToggle}
                sx={{ color: "#FFFFFF" }}
              >
                {
                  openMenu
                    ? <CloseOutlinedIcon />
                    : <MenuOutlinedIcon />
                }
              </IconButton>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default Header;