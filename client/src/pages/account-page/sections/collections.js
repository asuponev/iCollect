import React, { useState, useEffect, useContext } from 'react';
import { Stack, Typography, Button, Grid } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { FormattedMessage, useIntl } from 'react-intl';

import GlobalContext from '../../../utils/context/GlobalContext';
import { getAllCollectionsUser, deleteCollection } from '../../../utils/requests/requests';

import CreateCollection from '../../../components/modals/create-collection';
import CollectionCard from '../../../components/cards/collection-card/collection-card';
import Spinner from '../../../components/Spinner';
import ErrorMessage from '../../../components/ErrorMessage';

const Collections = ({ userId }) => {
  const { status, userInfo } = useContext(GlobalContext);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModalForm, setOpenModalForm] = useState(false);
  const [currentCollectionId, setCurrentCollectionId] = useState('');

  const { messages } = useIntl();
  const text = messages["app.collection"];

  useEffect(() => {
    onRequestGetCollections(userId);
  }, [userId]);

  const onRequestGetCollections = (userId) => {
    setError(null);
    setLoading(true);
    getAllCollectionsUser(userId)
      .then(res => {
        setCollections(res);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setError(error.message);
      })
  };

  const handleCloseModalForm = () => {
    setOpenModalForm(false);
    setTimeout(() => setCurrentCollectionId(''), 300);
  };

  const onCreateCollection = () => {
    setOpenModalForm(true);
  };

  const onEditCollection = (collectionId) => {
    setCurrentCollectionId(collectionId);
    setTimeout(() => setOpenModalForm(true), 1000);
  };

  const onDeleteCollection = (collectionId) => {
    deleteCollection(collectionId)
      .then(res => {
        toast.info(text.tools.successdelete, { position: 'top-right' });
        onRequestGetCollections(userId);
      }).catch(error => {
        console.log(error);
        toast.error(error.message, { position: 'top-right' });
      })
  };

  const cards = collections.map(collection => {
    return (
      <Grid item lg={3} md={4} sm={6} xs={12} key={collection._id}>
        <CollectionCard
          {...collection}
          onEditCollection={onEditCollection}
          onDeleteCollection={onDeleteCollection}
          inAccount={true}
        />
      </Grid>
    );
  });

  const errorMessage = error ? <ErrorMessage error={error} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <Grid container spacing={2} mb={10}>
      {cards}
    </Grid>
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
              <Button variant="contained" onClick={onCreateCollection}>
                <FormattedMessage id="app.account.addcollection" />
              </Button>
              <CreateCollection
                openModalForm={openModalForm}
                handleCloseModalForm={handleCloseModalForm}
                userId={userId}
                onRequestGetCollections={onRequestGetCollections}
                collectionId={currentCollectionId}
                toast={toast}
              />
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