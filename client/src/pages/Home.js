import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import HomeLastItems from '../components/home/home-last-items';
import HomeBiggestCollections from '../components/home/home-biggest-collections';
import HomeTagsCloud from '../components/home/home-tags-cloud';

export const Home = () => {

  return (
    <Stack mt={5} mb={10} spacing={7}>
      <Box>
        <Typography variant="h6" mb={4}>
          <FormattedMessage id="app.home-page.header1" />
        </Typography>
        <HomeLastItems />
      </Box>
      <Box>
        <Typography variant="h6" mb={4}>
          <FormattedMessage id="app.home-page.header2" />
        </Typography>
        <HomeBiggestCollections />
      </Box>
      <Box>
        <Typography variant="h6" mb={4}>
          <FormattedMessage id="app.home-page.header3" />
        </Typography>
        <HomeTagsCloud />
      </Box>
    </Stack>
  );
}