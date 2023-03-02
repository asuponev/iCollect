import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, Tooltip, IconButton, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FormattedMessage, useIntl } from 'react-intl';

import { getAllTags } from '../../utils/requests/requests';
import { onCloseModalForm } from '../../store/action-creators/items';

import FormCreateItem from '../form/form-create-item';

const CreateItem = ({ collectionId }) => {
  const dispatch = useDispatch();
  const { openModalForm, isEditing } = useSelector(state => state.items);
  const [tagsList, setTagsList] = useState([]);

  const { messages } = useIntl();
  const text = messages["app.item.form"];
  const theme = useTheme();

  useEffect(() => {
    getAllTags()
      .then(res => setTagsList(res))
      .catch(error => console.log(error));
  }, []);

  return (
    <Dialog open={openModalForm} onClose={() => dispatch(onCloseModalForm())}>
      <Tooltip
        title={text.btnclose}
        placement="top"
        sx={{ position: "relative" }}
      >
        <IconButton
          onClick={() => dispatch(onCloseModalForm())}
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
          tagsList={tagsList}
        />
      </DialogContent>
    </Dialog>
  );
}

export default CreateItem;