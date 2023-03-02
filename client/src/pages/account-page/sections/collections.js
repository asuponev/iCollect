import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stack, Typography, Button, Grid } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { FormattedMessage } from 'react-intl';

import GlobalContext from '../../../utils/context/GlobalContext';

import {
  requestGetCollections,
  onCreateCollection
} from '../../../store/action-creators/collections';

import CreateCollection from '../../../components/modals/create-collection';
import CollectionCard from '../../../components/cards/collection-card/collection-card';
import Spinner from '../../../components/Spinner';
import ErrorMessage from '../../../components/ErrorMessage';
import EmptyElement from '../../../components/EmptyElement';

const Collections = ({ userId }) => {
  const { status, userInfo } = useContext(GlobalContext);
  const dispatch = useDispatch();
  const { loading, collections, error } = useSelector(state => state.collections);

  useEffect(() => {
    dispatch(requestGetCollections(userId));
    // eslint-disable-next-line
  }, [userId]);

  const cards = collections.map(collection => {
    return (
      <Grid item lg={3} md={4} sm={6} xs={12} key={collection._id}>
        <CollectionCard data={collection} inAccount={true} />
      </Grid>
    );
  });

  const errorMessage = error ? <ErrorMessage error={error} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <>
      {
        cards.length > 0 ? (
          <Grid container spacing={2}>
            {cards}
          </Grid>
        ) : (
          <EmptyElement target={'account'} />
        )
      }
    </>
  ) : null;

  return (
    <>
      <ToastContainer />
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h5" fontWeight="500">
          <FormattedMessage id="app.account.header1" />
        </Typography>
        {
          (status.isAuth && userId === userInfo.userId) || status.isAdmin ? (
            <>
              <Button variant="contained" onClick={() => dispatch(onCreateCollection())}>
                <FormattedMessage id="app.account.addcollection" />
              </Button>
              <CreateCollection userId={userId} />
            </>
          ) : null
        }
      </Stack>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
}

export default Collections;