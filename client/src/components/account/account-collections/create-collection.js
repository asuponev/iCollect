import * as React from 'react';
import { Button, Dialog, DialogTitle, DialogContent } from '@mui/material';

import { createCollection } from '../../../utils/requests/requests';

import FormCreateCollection from '../../form/form-create-collection';

const CreateCollection = ({ id, onRequestGetCollection }) => {
  const [open, setOpen] = React.useState(false);

  const onRequestCreateCollection = (id, values) => {
    createCollection(id, { ...values })
    .then(res => {
      onRequestGetCollection(id);
      // console.log(res);
    }).catch(error => {
      console.log(error);
      // toast.error(error.message, { position: 'top-right' });
    })
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        + Add Collection
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new collection</DialogTitle>
        <DialogContent>
          <FormCreateCollection 
            handleClose={handleClose}
            id={id}
            onRequest={onRequestCreateCollection}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateCollection;