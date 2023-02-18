import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Tooltip, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import defaultItemValues from '../../../utils/constants/default-item-values';
import { createItem, getAllTags, getItem, updateItem } from '../../../utils/requests/requests';
import FormCreateItem from '../../form/form-create-item';

const CreateItem = ({
  collectionId,
  openModalForm,
  handleCloseModalForm,
  onItemsRequest,
  extraFields,
  itemId
}) => {
  const [valuesForEdit, setValuesForEdit] = useState({ ...defaultItemValues });
  const [tagsList, setTagsList] = useState([]);

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
      }).catch(error => {
        console.log(error);
        // toast.error(error.message, { position: 'top-right' });
      })
  }

  const onRequestUpdateItem = (collectionId, itemId, values) => {
    updateItem(collectionId, itemId, { ...values })
      .then(res => {
        onItemsRequest(collectionId);
      }).catch(error => {
        console.log(error);
        // toast.error(error.message, { position: 'top-right' });
      })
  }

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
        onItemsRequest(collectionId);
      }).catch(error => {
        console.log(error);
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
          !isEditing ? <>Add new item</> : <>Edit item</>
        }
      </DialogTitle>
      <DialogContent>
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
  )
}

export default CreateItem;