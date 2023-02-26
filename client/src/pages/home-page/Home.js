import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import LastItems from './sections/last-items';
import BiggestCollections from './sections/biggest-collections';
import TagsCloud from './sections/tags-cloud';

export const Home = () => {

  return (
    <Stack mt={5} mb={10} spacing={5}>
      <Box>
        <Typography variant="h6" mb={3}>
          <FormattedMessage id="app.home-page.header1" />
        </Typography>
        <LastItems />
      </Box>
      <Box>
        <Typography variant="h6" mb={3}>
          <FormattedMessage id="app.home-page.header2" />
        </Typography>
        <BiggestCollections />
      </Box>
      <Box>
        <Typography variant="h6" mb={3}>
          <FormattedMessage id="app.home-page.header3" />
        </Typography>
        <TagsCloud />
      </Box>
    </Stack>
  );
}