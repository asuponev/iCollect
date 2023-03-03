import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, Tooltip, IconButton, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FormattedMessage, useIntl } from 'react-intl';

import { onCloseModalForm } from '../../store/action-creators/items';

import FormCreateItem from '../form/form-create-item';

const CreateItem = ({ collectionId }) => {
  const dispatch = useDispatch();
  const { openModalForm, isEditing } = useSelector(state => state.items);

  const { messages } = useIntl();
  const text = messages["app.item.form"];
  const theme = useTheme();

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
        <FormCreateItem collectionId={collectionId} />
      </DialogContent>
    </Dialog>
  );
}

export default CreateItem;