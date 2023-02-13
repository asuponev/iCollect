import React from 'react';
import { Stack, Tooltip, IconButton, Button } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const CollectionTools = ({ onCreateItem }) => {
  return (
    <Stack direction="row" justifyContent="space-between" mb={3}>
      <Tooltip title="Delete selected users" placement="top">
        <IconButton
          color="#585E67"
          onClick={() => {
            if (window.confirm('Are you sure?')) {
              console.log('delete item')
            }
          }}
        >
          <DeleteOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Stack direction="row" spacing={2}>
        {/* <Button variant="outlined" onClick={() => console.log('add column')}>
          + Add Column
        </Button> */}
        <Button variant="contained" onClick={onCreateItem}>
          + Add Item
        </Button>
      </Stack>
    </Stack>
  );
}

export default CollectionTools;