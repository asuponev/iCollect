import React from 'react';
import { Stack } from '@mui/material';

import HomeLastItems from '../components/home/home-last-items';
import HomeBiggestCollections from '../components/home/home-biggest-collections';

export const Home = () => {

  return (
    <Stack>
      <HomeLastItems />
      <HomeBiggestCollections />
    </Stack>
  );
}