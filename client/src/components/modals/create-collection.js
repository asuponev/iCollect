import React from 'react';
import { Dialog, DialogTitle, DialogContent, Tooltip, IconButton, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FormattedMessage, useIntl } from 'react-intl';

import { createCollection, updateCollection } from '../../utils/requests/requests';

import FormCreateCollection from '../form/form-create-collection';

const CreateCollection = ({
  openModalForm,
  handleCloseModalForm,
  userId,
  onRequestGetCollections,
  collectionId,
  toast,
  valuesForEdit
}) => {
  const { messages } = useIntl();
  const text = messages["app.collection.form"];
  const theme = useTheme();

  const isEditing = Boolean(collectionId);

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
      <DialogTitle sx={{ backgroundColor: theme.palette.background.default }}>
        {
          !isEditing
            ? <FormattedMessage id="app.collection.form.create" />
            : <FormattedMessage id="app.collection.form.edit" />
        }
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: theme.palette.background.default }}>
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