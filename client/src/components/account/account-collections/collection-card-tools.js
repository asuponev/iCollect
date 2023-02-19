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
        <IconButton
          color="#585E67"
          onClick={() => onEditCollection(collectionId)}
        >
          <EditOutlinedIcon fontSize="small" sx={{ color: "#1E70EB" }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete collection" placement="bottom">
        <IconButton
          color="#585E67"
          onClick={() => {
            if (window.confirm('Are you sure?')) {
              onDeleteCollection(collectionId);
            }
          }}
        >
          <DeleteOutlinedIcon fontSize="small" sx={{ color: "#F43B47" }} />
        </IconButton>
      </Tooltip>
    </CardActions>
  );
}

export default CollectionCardTools;