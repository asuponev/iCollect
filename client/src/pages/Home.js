import React from 'react';

import HomeLastItems from '../components/home/home-last-items';
import HomeBiggestCollections from '../components/home/home-biggest-collections';
import HomeTagsCloud from '../components/home/home-tags-cloud';

export const Home = () => {

  return (
    <>
      <HomeLastItems />
      <HomeBiggestCollections />
      <HomeTagsCloud />
    </>
  );
}