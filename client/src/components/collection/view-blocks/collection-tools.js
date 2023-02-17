import React from 'react';
import { Stack, Tooltip, IconButton, Button, Typography, Divider } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const CollectionTools = ({ onCreateItem, selectedItems, onDeleteItems }) => {
  return (
    <Stack direction="row" justifyContent="space-between" mb={3}>
      {
        selectedItems.length <= 1 ? (
          <Stack sx={{ height: 40 }}></Stack>
        ) : (
          <Stack direction="row" alignItems="center" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
            <Typography>Items selected: {selectedItems.length}</Typography>
            <Tooltip title="Delete selected items" placement="top">
              <IconButton
                color="#585E67"
                onClick={() => {
                  if (window.confirm('Are you sure?')) {
                    onDeleteItems(selectedItems);
                  }
                }}
              >
                <DeleteOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        )
      }
      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={onCreateItem}>
          + Add Item
        </Button>
      </Stack>
    </Stack>
  );
}

export default CollectionTools;