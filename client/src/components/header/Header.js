import React from 'react';
import { Box, Stack } from '@mui/material';

import * as HeaderItems from './header-items/header-items';

function Header() {

  const isAuth = false;
  const isAdmin = false;
  const isRegister = false;

  return (
    <Box
      sx={{
        padding: "16px 24px",
        backgroundColor: "#142339",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems="center" spacing={3}>
          <HeaderItems.Logo />
          <HeaderItems.Search />
        </Stack>
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