import React, { useContext } from 'react';
import { Stack, Typography } from '@mui/material';

import ItemBreadcrumbs from './view-blocks/item-breadcrumbs';
import ItemLikes from './view-blocks/item-likes';
import ItemTags from './view-blocks/item-tags';
import ItemExtraFields from './view-blocks/item-extra-fields';
import ItemComments from './view-blocks/item-comments';
import GlobalContext from '../../utils/context/GlobalContext';

const ItemView = ({ itemData }) => {
  const { status } = useContext(GlobalContext);
  const collectionTitle = itemData.collection.title,
    authorFirstName = itemData.collection.authorId.firstName,
    authorLastName = itemData.collection.authorId.lastName;

  return (
    <>
      <ItemBreadcrumbs itemData={itemData} />
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
          {
            status.isAuth ? <ItemLikes itemId={itemData._id} /> : null
          }
        </Stack>
        <Typography fontSize={24} fontWeight={700}>{itemData.title}</Typography>
        <Stack direction="row" spacing={1} sx={{ color: "#797E85" }}>
          <Typography variant="overline">{collectionTitle}</Typography>
          <Typography variant="overline">—</Typography>
          <Typography variant="overline">by {authorFirstName} {authorLastName}</Typography>
        </Stack>
        <Stack mt={3} spacing={1.5}>
          <Typography>Tags</Typography>
          <ItemTags tags={itemData.tags} />
        </Stack>
        <ItemExtraFields
          itemData={itemData}
          extraFields={itemData.collection.extraFields}
        />
      </Stack>
      {
        status.isAuth ? <ItemComments itemId={itemData._id} /> : null
      }
    </>
  );
}

export default ItemView;