import React, { useContext } from 'react';
import { Box, Container, Stack } from '@mui/material';

import * as HeaderItems from './header-items/header-items';
import GlobalContext from '../../utils/context/GlobalContext';

function Header() {
  const { status } = useContext(GlobalContext);

  return (
    <Box component="header" sx={{ width: "100%", backgroundColor: "#142339" }}>
      <Container maxWidth={false} sx={{ padding: "16px 24px", maxWidth: 1440 }}>
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
                status.isAuth ? (
                  <>
                    {status.isAdmin ? <HeaderItems.BtnAdminPanel /> : null}
                    <HeaderItems.BtnAccount />
                    <HeaderItems.BtnLogOut />
                  </>
                ) : (
                  <>
                    <HeaderItems.BtnLogIn />
                    <HeaderItems.BtnSignUp />
                  </>
                )
              }
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default Header;