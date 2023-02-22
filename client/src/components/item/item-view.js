import React, { useContext } from 'react';
import { Stack, Grid, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
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
      <Stack
        p={2} pt={1}
        sx={{
          boxShadow: "2px 2px 14px rgba(0, 0, 0, 0.1)",
          borderRadius: 2,
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography fontSize={10} color="#9B9EA4">
            ID {itemData._id}
          </Typography>
          {
            status.isAuth ? <ItemLikes itemId={itemData._id} /> : null
          }
        </Stack>
        <Typography fontSize={24} fontWeight={700} noWrap>
          {itemData.title}
        </Typography>
        <Grid container wrap="nowrap" gap={1} sx={{ color: "#797E85" }}>
          <Typography variant="overline" noWrap>
            {collectionTitle}
          </Typography>
          <Typography variant="overline">—</Typography>
          <Typography variant="overline">
            <FormattedMessage id="app.collection.by" />
          </Typography>
          <Typography variant="overline" noWrap>
            {authorFirstName} {authorLastName}
          </Typography>
        </Grid>
        <Stack mt={2} spacing={1.5}>
          <Typography>
            <FormattedMessage id="app.item.tags" />
          </Typography>
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