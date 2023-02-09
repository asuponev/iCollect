import { Stack, Box, Tooltip, IconButton } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const FormUploadedImage = ({ imageUrl, setSelectedImg, setImageUrl }) => {

  const onRemoveImg = () => {
    setSelectedImg(null);
    setImageUrl('');
  }

  return (
    <Stack>
      <Box alignSelf="flex-end">
        <Tooltip title="Remove image" placement="top">
          <IconButton
            color="#585E67"
            onClick={() => onRemoveImg()}
          >
            <HighlightOffIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <img src={imageUrl} alt="uploaded" style={{ maxWidth: 336, maxHeight: 120, objectFit: "cover" }}></img>
    </Stack>
  )
}

export default FormUploadedImage;