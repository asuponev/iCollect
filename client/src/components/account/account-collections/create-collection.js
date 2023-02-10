import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Tooltip, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { createCollection, updateCollection } from '../../../utils/requests/requests';
import { getOneCollection } from '../../../utils/requests/requests';

import FormCreateCollection from '../../form/form-create-collection';

const CreateCollection = ({
  openModalForm,
  handleCloseModalForm,
  id,
  onRequestGetCollections,
  collectionId
}) => {
  const [valuesForEdit, setValuesForEdit] = useState({
    title: '',
    subject: '',
    description: '',
    coverUrl: ''
  })

  const isEditing = Boolean(collectionId);

  useEffect(() => {
    if (isEditing) {
      getOneCollection(collectionId)
        .then(res => {
          setValuesForEdit({
            title: res.title,
            subject: res.subject,
            description: res.description,
            coverUrl: res.coverUrl
          })
        }).catch(error => {
          console.log(error);
          // toast.error(error.message, { position: 'top-right' });
        })
    } else {
      setValuesForEdit({
        title: '',
        subject: '',
        description: '',
        coverUrl: ''
      })
    }
    // eslint-disable-next-line
  }, [isEditing])


  const onRequestCreateCollection = (values) => {
    createCollection({ ...values })
      .then(res => {
        onRequestGetCollections(id);
        console.log(res);
      }).catch(error => {
        console.log(error);
        // toast.error(error.message, { position: 'top-right' });
      })
  }

  const onRequestUpdateCollection = (collectionId, values) => {
    updateCollection(collectionId, { ...values })
      .then(res => {
        onRequestGetCollections(id);
        console.log(res);
      }).catch(error => {
        console.log(error);
        // toast.error(error.message, { position: 'top-right' });
      })
  }

  return (
    <Dialog open={openModalForm} onClose={handleCloseModalForm}>
      <Tooltip
        title="Close form"
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
          !isEditing ? <>Add new collection</> : <>Edit collection</>
        }
      </DialogTitle>
      <DialogContent>
        <FormCreateCollection
          handleClose={handleCloseModalForm}
          id={id}
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