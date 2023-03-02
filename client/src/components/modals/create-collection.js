import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, Tooltip, IconButton, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FormattedMessage, useIntl } from 'react-intl';

import { onCloseModalForm } from '../../store/action-creators/collections';

import FormCreateCollection from '../form/form-create-collection';

const CreateCollection = ({ userId }) => {
  const dispatch = useDispatch();
  const { openModalForm, isEditing } = useSelector(state => state.collections);
  const { messages } = useIntl();
  const text = messages["app.collection.form"];
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
            ? <FormattedMessage id="app.collection.form.create" />
            : <FormattedMessage id="app.collection.form.edit" />
        }
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: theme.palette.background.default }}>
        <FormCreateCollection userId={userId} />
      </DialogContent>
    </Dialog>
  );
}

export default CreateCollection;