import React, { useState, useEffect, useContext } from 'react';
import { Stack, Typography, Button, Grid } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { FormattedMessage, useIntl } from 'react-intl';

import GlobalContext from '../../../utils/context/GlobalContext';
import { getAllCollectionsUser, deleteCollection, getOneCollection } from '../../../utils/requests/requests';
import { removeImg } from '../../../utils/firebase/methods';

import CreateCollection from '../../../components/modals/create-collection';
import CollectionCard from '../../../components/cards/collection-card/collection-card';
import Spinner from '../../../components/Spinner';
import ErrorMessage from '../../../components/ErrorMessage';
import EmptyElement from '../../../components/EmptyElement';

const Collections = ({ userId }) => {
  const { status, userInfo } = useContext(GlobalContext);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModalForm, setOpenModalForm] = useState(false);
  const [currentCollectionId, setCurrentCollectionId] = useState('');
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [valuesForEdit, setValuesForEdit] = useState({
    title: '',
    subject: '',
    description: '',
    coverUrl: '',
    extraFields: []
  });

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

  const onRequestValuesForEdit = (collectionId) => {
    setCurrentCollectionId(collectionId);
    setLoadingEdit(true);
    getOneCollection(collectionId)
      .then(res => {
        setValuesForEdit({
          title: res.title,
          subject: res.subject,
          description: res.description,
          coverUrl: res.coverUrl,
          extraFields: res.extraFields
        });
        setLoadingEdit(false);
        setOpenModalForm(true);
      }).catch(error => {
        console.log(error);
        toast.error(text.tools.editerror, { position: 'top-right' });
        setLoadingEdit(false);
        setValuesForEdit({
          title: '',
          subject: '',
          description: '',
          coverUrl: '',
          extraFields: []
        })
      })
  }

  const handleCloseModalForm = () => {
    setOpenModalForm(false);
    setTimeout(() => setCurrentCollectionId(''), 300);
    setValuesForEdit({
      title: '',
      subject: '',
      description: '',
      coverUrl: '',
      extraFields: []
    });
  };

  const onCreateCollection = () => {
    setOpenModalForm(true);
  };

  const onEditCollection = (collectionId) => {
    onRequestValuesForEdit(collectionId);
  };

  const onDeleteCollection = (collectionId) => {
    setCurrentCollectionId(collectionId);
    setLoadingDelete(true);
    deleteCollection(collectionId)
      .then(res => {
        if (res.coverUrl) removeImg(res.coverUrl);
        setLoadingDelete(false);
        toast.info(text.tools.successdelete, { position: 'top-right' });
        onRequestGetCollections(userId);
      }).catch(error => {
        console.log(error);
        setLoadingDelete(false);
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
          loadingEdit={loadingEdit}
          loadingDelete={loadingDelete}
          currentCollectionId={currentCollectionId}
        />
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
                valuesForEdit={valuesForEdit}
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