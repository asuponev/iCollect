import React from 'react';
import { Stack, Typography } from '@mui/material';

import ItemBreadcrumbs from './view-blocks/item-breadcrumbs';
import ItemLikes from './view-blocks/item-likes';
import ItemTags from './view-blocks/item-tags';
import ItemExtraFields from './view-blocks/item-extra-fields';
import ItemComments from './view-blocks/item-comments';

const ItemView = ({ itemData, collectionData, authorData }) => {

  return (
    <>
      <ItemBreadcrumbs
        itemData={itemData}
        collectionData={collectionData}
        authorData={authorData}
      />
      <Stack
        sx={{
          boxShadow: "2px 2px 14px rgba(0, 0, 0, 0.1)",
          borderRadius: "16px",
          p: 4
        }}
        mt={4} mb={6}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="caption">ID {itemData._id}</Typography>
          <ItemLikes itemId={itemData._id} />
        </Stack>
        <Typography fontSize={24} fontWeight={700}>{itemData.title}</Typography>
        <Stack mt={3} spacing={1.5}>
          <Typography>Tags</Typography>
          <ItemTags tags={itemData.tags} />
        </Stack>
        <ItemExtraFields itemData={itemData} extraFields={collectionData.extraFields || []} />
        <Stack mt={3} spacing={1.5}>
          <Typography>Author</Typography>
          <Typography fontSize={16} fontWeight={700}>{authorData.firstName} {authorData.lastName}</Typography>
        </Stack>
        <Stack mt={3} spacing={1.5}>
          <Typography>Collection</Typography>
          <Typography fontSize={16} fontWeight={700}>{collectionData.title}</Typography>
        </Stack>
      </Stack>
      <ItemComments itemId={itemData._id} />
    </>
  )
}

export default ItemView;