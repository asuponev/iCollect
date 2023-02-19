import React from 'react';

import BreadCrumbs from '../../BreadCrumbs';

const ItemBreadcrumbs = ({ itemData }) => {

  const authorName = `
    ${itemData.collection.authorId.firstName || ''} 
    ${itemData.collection.authorId.lastName || ''}
  `;
  const collectionTitle = `${itemData.collection.title}`;

  return (
    <BreadCrumbs
      prevLinks={[
        { Home: '/' },
        { [authorName]: `/users/${itemData.collection.authorId._id}` },
        { [collectionTitle]: `/collections/${itemData.collection._id}` }
      ]}
      current={itemData.title}
    />
  )
}

export default ItemBreadcrumbs;