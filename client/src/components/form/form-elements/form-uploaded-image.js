import { Stack, Box, Tooltip, IconButton } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import { storage } from '../../../utils/firebase';

const FormUploadedImage = ({ setSelectedImg, imageUrl, setImageUrl, toast }) => {

  const imageRef = ref(storage, imageUrl);

  const onRemoveImg = () => {
    setSelectedImg(null);
    setImageUrl('');
    deleteObject(imageRef).then(() => {
      toast.info('Image remove', { position: 'top-right' });
    }).catch((error) => {
      console.log(error)
    });
  }

  return (
    <Stack>
      <Box alignSelf="flex-end">
        <Tooltip
          title="Remove image"
          placement="top"
          sx={{ position: "relative" }}
        >
          <IconButton
            color="#585E67"
            onClick={() => onRemoveImg()}
            sx={{ position: "absolute", top: 50, right: 15 }}
          >
            <HighlightOffIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <img src={imageUrl} alt="uploaded" style={{ maxWidth: 336, maxHeight: 160, objectFit: "cover" }}></img>
    </Stack>
  )
}

export default FormUploadedImage;