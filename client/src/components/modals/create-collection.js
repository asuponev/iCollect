import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Tooltip, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FormattedMessage, useIntl } from 'react-intl';

import { createCollection, updateCollection, getOneCollection } from '../../utils/requests/requests';

import FormCreateCollection from '../form/form-create-collection';

const CreateCollection = ({
  openModalForm,
  handleCloseModalForm,
  userId,
  onRequestGetCollections,
  collectionId,
  toast
}) => {
  const [valuesForEdit, setValuesForEdit] = useState({
    title: '',
    subject: '',
    description: '',
    coverUrl: '',
    extraFields: []
  });

  const { messages } = useIntl();
  const text = messages["app.collection.form"];

  const isEditing = Boolean(collectionId);

  useEffect(() => {
    if (isEditing) {
      getOneCollection(collectionId)
        .then(res => {
          setValuesForEdit({
            title: res.title,
            subject: res.subject,
            description: res.description,
            coverUrl: res.coverUrl,
            extraFields: res.extraFields
          })
        }).catch(error => {
          console.log(error);
        })
    } else {
      setValuesForEdit({
        title: '',
        subject: '',
        description: '',
        coverUrl: '',
        extraFields: []
      })
    }
    // eslint-disable-next-line
  }, [isEditing]);


  const onRequestCreateCollection = (values) => {
    createCollection({ ...values })
      .then(res => {
        onRequestGetCollections(userId);
        toast.success(text.successcreate, { position: 'top-right' });
      }).catch(error => {
        console.log(error);
        toast.error(error.message, { position: 'top-right' });
      })
  };

  const onRequestUpdateCollection = (collectionId, values) => {
    updateCollection(collectionId, { ...values })
      .then(res => {
        onRequestGetCollections(userId);
        toast.success(text.successupdate, { position: 'top-right' });
      }).catch(error => {
        console.log(error);
        toast.error(error.message, { position: 'top-right' });
      })
  };

  return (
    <Dialog open={openModalForm} onClose={handleCloseModalForm}>
      <Tooltip
        title={text.btnclose}
        placement="top"
        sx={{ position: "relative" }}
      >
        <IconButton
          onClick={() => handleCloseModalForm()}
          sx={{ position: "absolute", top: 0, right: 0 }}
        >
          <CloseIcon />
        </IconButton>
      </Tooltip>
      <DialogTitle>
        {
          !isEditing
            ? <FormattedMessage id="app.collection.form.create" />
            : <FormattedMessage id="app.collection.form.edit" />
        }
      </DialogTitle>
      <DialogContent>
        <FormCreateCollection
          handleClose={handleCloseModalForm}
          userId={userId}
          onRequestCreate={onRequestCreateCollection}
          onRequestUpdate={onRequestUpdateCollection}
          collectionId={collectionId}
          isEditing={isEditing}
          valuesForEdit={valuesForEdit}
        />
      </DialogContent>
    </Dialog>
  );
}

export default CreateCollection;