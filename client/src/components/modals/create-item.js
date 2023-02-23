import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Tooltip, IconButton, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FormattedMessage, useIntl } from 'react-intl';

import defaultItemValues from '../../utils/constants/default-item-values';
import { createItem, getAllTags, getItem, updateItem } from '../../utils/requests/requests';

import FormCreateItem from '../form/form-create-item';

const CreateItem = ({
  collectionId,
  openModalForm,
  handleCloseModalForm,
  onItemsRequest,
  extraFields,
  itemId,
  toast
}) => {
  const [valuesForEdit, setValuesForEdit] = useState({ ...defaultItemValues });
  const [tagsList, setTagsList] = useState([]);

  const { messages } = useIntl();
  const text = messages["app.item.form"];
  const theme = useTheme();

  const isEditing = Boolean(itemId);

  useEffect(() => {
    if (isEditing) {
      onGetItemForEdit(collectionId, itemId);
    } else {
      setValuesForEdit({ ...defaultItemValues })
    }
    // eslint-disable-next-line
  }, [isEditing]);

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

  const onGetItemForEdit = (collectionId, itemId) => {
    getItem(collectionId, itemId)
      .then(res => {
        setValuesForEdit({
          title: res.title,
          tags: res.tags,
          number1: res.number1 || 0,
          number2: res.number2 || 0,
          number3: res.number3 || 0,
          string1: res.string1 || '',
          string2: res.string2 || '',
          string3: res.string3 || '',
          text1: res.text1 || '',
          text2: res.text2 || '',
          text3: res.text3 || '',
          date1: res.date1 || '',
          date2: res.date2 || '',
          date3: res.date3 || '',
          checkbox1: res.checkbox1 || false,
          checkbox2: res.checkbox2 || false,
          checkbox3: res.checkbox2 || false,
        })
      }).catch(error => {
        console.log(error);
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