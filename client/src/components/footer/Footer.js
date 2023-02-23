import React from 'react';
import { Box, Container, Stack, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      backgroundColor={theme.palette.background.footer}
      sx={{ width: "100%", marginTop: "auto" }}
    >
      <Container maxWidth={false} sx={{ padding: "12px 24px", maxWidth: 1440 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
        >
          <Typography color={theme.palette.text.main} fontSize={14} fontWeight={500}>
            iCollect
          </Typography>
          <Typography color="text.secondary" fontSize={12} fontWeight={400} noWrap>
            <FormattedMessage id="app.footer.rights" />
          </Typography>
          <Typography
            color="text.secondary"
            fontSize={12}
            fontWeight={400}
            sx={{ "&:hover": { color: theme.palette.text.main } }}
          >
            <Link
              to="https://github.com/elsuppo"
              target="_blank"
              style={{ textDecoration: 'none' }}
            >
              <FormattedMessage id="app.footer.dev" />
            </Link>
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;