import React from 'react';

import BreadCrumbs from '../../BreadCrumbs';

const CollectionBreadcrumbs = ({ collectionData }) => {

  const authorName = `
    ${collectionData.authorId.firstName || ''} 
    ${collectionData.authorId.lastName || ''}
  `;

  return (
    <BreadCrumbs
      prevLinks={[
        { Home: '/' },
        { [authorName]: `/users/${collectionData.authorId._id}` },
      ]}
      current={collectionData.title}
    />
  )
}

export default CollectionBreadcrumbs;