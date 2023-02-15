import React from 'react';

import BreadCrumbs from '../../BreadCrumbs';

const ItemBreadcrumbs = ({ itemData, collectionData, authorData }) => {

  const authorName = `${authorData.firstName || ''} ${authorData.lastName || ''}`;
  const collectionTitle = `${collectionData.title}`;

  return (
    <BreadCrumbs
      prevLinks={[
        { Home: '/' },
        { [authorName]: `/users/${authorData._id}` },
        { [collectionTitle]: `/collections/${collectionData._id}` }
      ]}
      current={itemData.title}
    />
  )
}

export default ItemBreadcrumbs;