import React from 'react';
import { CardActions, Tooltip, IconButton } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const CollectionCardTools = ({
  onEditCollection,
  onDeleteCollection,
  collectionId
}) => {
  return (
    <CardActions sx={{ padding: 2, alignItems: "center" }}>
      <Tooltip title="Edit collection" placement="bottom">
        <IconButton onClick={() => onEditCollection(collectionId)}>
          <EditOutlinedIcon fontSize="small" color="primary" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete collection" placement="bottom">
        <IconButton onClick={() => {
          if (window.confirm('Are you sure?')) onDeleteCollection(collectionId);
        }}
        >
          <DeleteOutlinedIcon fontSize="small" color="grey" />
        </IconButton>
      </Tooltip>
    </CardActions>
  );
}

export default CollectionCardTools;