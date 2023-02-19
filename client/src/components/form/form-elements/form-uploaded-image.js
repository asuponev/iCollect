import { Stack, Tooltip, IconButton } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { ref, deleteObject } from 'firebase/storage';
import { storage } from '../../../utils/firebase';

const FormUploadedImage = ({ setSelectedImg, imageUrl, setImageUrl, toast }) => {

  const imageRef = ref(storage, imageUrl);

  const onRemoveImg = () => {
    setSelectedImg(null);
    setImageUrl('');
    deleteObject(imageRef).then(() => {
      toast.info('Image remove', { position: 'top-right' });
    }).catch((error) => {
      console.log(error);
      toast.error(error.message, { position: 'top-right' });
    });
  }

  return (
    <>
      <Stack height={24} alignItems="flex-end">
        <Tooltip title="Remove image" placement="top">
          <IconButton
            color="#585E67"
            onClick={() => onRemoveImg()}
            sx={{padding: 0}}
          >
            <HighlightOffIcon />
          </IconButton>
        </Tooltip>
      </Stack>
      <Stack>
        <img src={imageUrl} alt="uploaded" style={{ maxWidth: 336, maxHeight: 160, objectFit: "cover" }}></img>
      </Stack>
    </>
  )
}

export default FormUploadedImage;