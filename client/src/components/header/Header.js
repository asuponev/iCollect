import React from 'react';
import { Box, Stack } from '@mui/material';

import * as HeaderItems from './header-items/header-items';

function Header() {

  const isAuth = false;
  const isAdmin = false;
  const isRegister = false;

  return (
    <Box
      p={3}
      sx={{
        backgroundColor: "#142339",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <HeaderItems.Logo />
        <Stack direction="row" spacing={2}>
          <Stack direction="row" spacing={1}>
            <HeaderItems.ThemeSwitcher />
            <HeaderItems.LangSwitcher />
          </Stack>
          <Stack direction="row" spacing={1}>
            {
              isAuth ? (
                <>
                  {isAdmin ? <HeaderItems.BtnAdminPanel /> : null}
                  <HeaderItems.BtnAccount />
                  <HeaderItems.BtnLogOut />
                </>
              ) : (
                <>
                  {
                    !isRegister ?
                      (
                        <>
                          <HeaderItems.BtnLogIn />
                          <HeaderItems.BtnSignUp />
                        </>
                      ) : null
                  }
                </>
              )
            }
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Header;