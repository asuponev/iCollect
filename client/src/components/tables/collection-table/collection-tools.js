import React from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { Stack, Tooltip, IconButton, Button, Typography, Divider } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const CollectionTools = ({ onCreateItem, selectedItems, onDeleteItems }) => {
  const { messages } = useIntl();
  const text = messages["app.collection"];

  return (
    <Stack direction="row" justifyContent="space-between" mb={3}>
      {
        selectedItems.length === 0 ? (
          <Stack sx={{ height: 40 }}></Stack>
        ) : (
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Typography>
              {text.tableTools.select} {selectedItems.length}
            </Typography>
            <Tooltip title={text.tableTools.delete} placement="top">
              <IconButton
                color="#585E67"
                onClick={() => {
                  if (window.confirm(text.tableTools.confirmDelete)) {
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
          <FormattedMessage id="app.collection.additem" />
        </Button>
      </Stack>
    </Stack>
  );
}

export default CollectionTools;