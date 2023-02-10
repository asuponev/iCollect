import { Stack, Typography, Card, CardActions, CardContent, CardMedia, Tooltip, IconButton } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import imageNotFound from '../../../utils/constants/image-not-found';

const CollectionCard = ({
  _id,
  subject,
  title,
  description,
  coverUrl,
  count,
  onEditCollection,
  onDeleteCollection
}) => {
  return (
    <Card
      sx={{
        width: 336,
        border: "1px solid #F9F9F9",
        boxShadow: "2px 2px 16px rgba(0, 0, 0, 0.08)",
        borderRadius: "8px",
      }}
    >
      <CardMedia
        sx={{ height: 160 }}
        image={coverUrl || imageNotFound}
        title={title}
      />
      <CardContent sx={{ padding: "16px 16px 0" }}>
        <Stack 
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          color="text.secondary"
        >
          <Typography variant="overline" lineHeight="18px">{subject}</Typography>
          <Typography variant="caption">{count ? count : 0} items</Typography>
        </Stack>
        <Typography gutterBottom variant="h6">{title}</Typography>
        <Typography variant="body2" color="text.secondary">{description}</Typography>
      </CardContent>
      <CardActions sx={{ padding: 2, alignItems: "center" }}>
        <Tooltip title="Edit collection" placement="bottom">
          <IconButton
            color="#585E67"
            onClick={() => onEditCollection(_id)}
          >
            <EditOutlinedIcon fontSize="small" sx={{ color: "#1E70EB" }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete collection" placement="bottom">
          <IconButton
            color="#585E67"
            onClick={() => onDeleteCollection(_id)}
          >
            <DeleteOutlinedIcon fontSize="small" sx={{ color: "#F43B47" }} />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  )
}

export default CollectionCard;