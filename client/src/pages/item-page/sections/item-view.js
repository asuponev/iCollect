import React, { useContext } from 'react';
import { Stack, Grid, Typography, Card, CardContent } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import GlobalContext from '../../../utils/context/GlobalContext';
import CustomizeMui from '../../../utils/theme/customizeMui';

import ItemLikes from '../../../components/cards/item-card/elements/item-likes';
import ItemTags from '../../../components/cards/item-card/elements/item-tags';
import ItemExtraFields from '../../../components/cards/item-card/elements/item-extra-fields';

const ItemView = ({ itemData }) => {
  const { status } = useContext(GlobalContext);
  const { cardStyles } = CustomizeMui();
  const collectionTitle = itemData.collection.title,
    authorFirstName = itemData.collection.authorId.firstName,
    authorLastName = itemData.collection.authorId.lastName;

  return (
    <Card sx={cardStyles}>
      <CardContent>
        <Stack direction="row" alignItems="center" justifyContent="space-between" height={40}>
          <Typography fontSize={10} color="text.disabled">
            ID {itemData._id}
          </Typography>
          {
            status.isAuth ? <ItemLikes itemId={itemData._id} /> : null
          }
        </Stack>
        <Typography fontSize={24} fontWeight={700} noWrap>
          {itemData.title}
        </Typography>
        <Grid container wrap="nowrap" gap={1}>
          <Typography variant="overline" noWrap>
            {collectionTitle}
          </Typography>
          <Typography variant="overline" color="text.secondary">—</Typography>
          <Typography variant="overline">
            <FormattedMessage id="app.collection.by" />
          </Typography>
          <Typography variant="overline" noWrap>
            {authorFirstName} {authorLastName}
          </Typography>
        </Grid>
        <Stack mt={2} spacing={1.5}>
          <Typography color="text.secondary">
            <FormattedMessage id="app.item.tags" />
          </Typography>
          <ItemTags tags={itemData.tags} />
        </Stack>
        <ItemExtraFields
          itemData={itemData}
          extraFields={itemData.collection.extraFields}
        />
      </CardContent>
    </Card>
  );
}

export default ItemView;