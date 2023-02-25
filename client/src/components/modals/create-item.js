import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Tooltip, IconButton, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FormattedMessage, useIntl } from 'react-intl';

import { createItem, getAllTags, updateItem } from '../../utils/requests/requests';

import FormCreateItem from '../form/form-create-item';

const CreateItem = ({
  collectionId,
  openModalForm,
  handleCloseModalForm,
  onItemsRequest,
  extraFields,
  itemId,
  toast,
  valuesForEdit
}) => {
  
  const [tagsList, setTagsList] = useState([]);

  const { messages } = useIntl();
  const text = messages["app.item.form"];
  const theme = useTheme();

  const isEditing = Boolean(itemId);

  useEffect(() => {
    getAllTags()
      .then(res => setTagsList(res))
      .catch(error => console.log(error));
  }, []);

  const onRequestCreateItem = (collectionId, values) => {
    createItem(collectionId, { ...values })
      .then(res => {
        onItemsRequest(collectionId);
        toast.success(text.successcreate, { position: 'top-right' });
      }).catch(error => {
        console.log(error);
        toast.error(error.message, { position: 'top-right' });
      })
  };

  const onRequestUpdateItem = (collectionId, itemId, values) => {
    updateItem(collectionId, itemId, { ...values })
      .then(res => {
        onItemsRequest(collectionId);
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
            ? <FormattedMessage id="app.item.form.create" />
            : <FormattedMessage id="app.item.form.update" />
        }
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: theme.palette.background.default }}>
        <FormCreateItem
          collectionId={collectionId}
          handleClose={handleCloseModalForm}
          onRequestCreate={onRequestCreateItem}
          extraFields={extraFields}
          isEditing={isEditing}
          valuesForEdit={valuesForEdit}
          onRequestUpdate={onRequestUpdateItem}
          itemId={itemId}
          tagsList={tagsList}
        />
      </DialogContent>
    </Dialog>
  );
}

export default CreateItem;