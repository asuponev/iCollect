import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardActions, Tooltip, IconButton, CircularProgress, Stack } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useIntl } from 'react-intl';

import { getValuesForEdit, onDeleteCollection } from '../../../store/action-creators/collections';

const CollectionCardTools = ({ collectionId }) => {
  const dispatch = useDispatch();
  const { loadingBtn, currentId, currentAction } = useSelector(state => state.collections);
  const { messages } = useIntl();
  const text = messages["app.collection"];

  return (
    <CardActions sx={{ p: 2, alignItems: "center" }}>
      {loadingBtn && (collectionId === currentId) && currentAction === "edit" ? (
        <Stack width={36} height={36} alignItems="center" justifyContent="center" mr={1}>
          <CircularProgress color="primary" size={20} />
        </Stack>
      ) : (
        <Tooltip title={text.tools.edit} placement="bottom">
          <IconButton onClick={() => dispatch(getValuesForEdit(collectionId))}>
            <EditOutlinedIcon fontSize="small" color="primary" />
          </IconButton>
        </Tooltip>
      )}
      {loadingBtn && (collectionId === currentId) && currentAction === "delete" ? (
        <Stack width={36} height={36} alignItems="center" justifyContent="center" mr={1}>
          <CircularProgress color="primary" size={20} />
        </Stack>
      ) : (
        <Tooltip title={text.tools.delete} placement="bottom">
          <IconButton onClick={() => {
            if (window.confirm(text.tools.confirmDelete)) {
              dispatch(onDeleteCollection(collectionId, text));
            }
          }}
          >
            <DeleteOutlinedIcon fontSize="small" color="grey" />
          </IconButton>
        </Tooltip>
      )}
    </CardActions>
  );
}

export default CollectionCardTools;