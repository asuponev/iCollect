import React from 'react';
import { CardActions, Tooltip, IconButton, CircularProgress, Stack } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useIntl } from 'react-intl';

const CollectionCardTools = ({
  onEditCollection,
  onDeleteCollection,
  collectionId,
  loadingEdit,
  loadingDelete,
  currentCollectionId
}) => {
  const { messages } = useIntl();
  const text = messages["app.collection"];

  return (
    <CardActions sx={{ p: 2, alignItems: "center" }}>
      {
        loadingEdit && (collectionId === currentCollectionId) ? (
          <Stack width={36} height={36} alignItems="center" justifyContent="center" mr={1}>
            <CircularProgress color="primary" size={20} />
          </Stack>
        ) : (
          <Tooltip title={text.tools.edit} placement="bottom">
            <IconButton onClick={() => onEditCollection(collectionId)}>
              <EditOutlinedIcon fontSize="small" color="primary" />
            </IconButton>
          </Tooltip>
        )
      }
      {
        loadingDelete && (collectionId === currentCollectionId) ? (
          <Stack width={36} height={36} alignItems="center" justifyContent="center" mr={1}>
            <CircularProgress color="primary" size={20} />
          </Stack>
        ) : (
          <Tooltip title={text.tools.delete} placement="bottom">
            <IconButton onClick={() => {
              if (window.confirm(text.tools.confirmDelete)) onDeleteCollection(collectionId);
            }}
            >
              <DeleteOutlinedIcon fontSize="small" color="grey" />
            </IconButton>
          </Tooltip>
        )
      }
    </CardActions>
  );
}

export default CollectionCardTools;