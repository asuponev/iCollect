import React from 'react';
import { CardActions, Tooltip, IconButton } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useIntl } from 'react-intl';

const CollectionCardTools = ({
  onEditCollection,
  onDeleteCollection,
  collectionId
}) => {
  const { messages } = useIntl();
  const text = messages["app.collection"];

  return (
    <CardActions sx={{ padding: 2, alignItems: "center" }}>
      <Tooltip title={text.tools.edit} placement="bottom">
        <IconButton onClick={() => onEditCollection(collectionId)}>
          <EditOutlinedIcon fontSize="small" color="primary" />
        </IconButton>
      </Tooltip>
      <Tooltip title={text.tools.delete} placement="bottom">
        <IconButton onClick={() => {
          if (window.confirm(text.tools.confirmDelete)) onDeleteCollection(collectionId);
        }}
        >
          <DeleteOutlinedIcon fontSize="small" color="grey" />
        </IconButton>
      </Tooltip>
    </CardActions>
  );
}

export default CollectionCardTools;