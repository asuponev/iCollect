import { Box, Container, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        backgroundColor: "#F0F3F6",
        marginTop: "auto"
      }}
    >
      <Container maxWidth={false} sx={{ padding: "12px 24px", maxWidth: 1440 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            color="#142339"
            fontSize={14}
            fontWeight={500}>iCollect</Typography>
          <Typography
            color="#9B9EA4"
            fontSize={12}
            fontWeight={400}>© 2023 iCollect. All rights reserved.</Typography>
          <Link to="https://github.com/elsuppo" target="_blank">
            <Typography
              color="#142339"
              fontSize={12}
              fontWeight={400}
              sx={{ "&:hover": { color: "#2F4059" } }}
            >Development</Typography>
          </Link>
        </Stack>
      </Container>
    </Box>
  )
}

export default Footer;