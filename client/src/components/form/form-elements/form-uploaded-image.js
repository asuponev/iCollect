import { Stack, Tooltip, IconButton } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { ref, deleteObject } from 'firebase/storage';
import { useIntl } from 'react-intl';

import { storage } from '../../../utils/firebase';

const FormUploadedImage = ({ setSelectedImg, imageUrl, setImageUrl, toast }) => {
  const { messages } = useIntl();
  const text = messages["app.collection.form"];

  const imageRef = ref(storage, imageUrl);

  const onRemoveImg = () => {
    setSelectedImg(null);
    setImageUrl('');
    deleteObject(imageRef).then(() => {
      toast.info(text.imgdeleted, { position: 'top-right' });
    }).catch((error) => {
      console.log(error);
      toast.error(error.message, { position: 'top-right' });
    });
  };

  return (
    <>
      <Stack height={24} alignItems="flex-end">
        <Tooltip title={text.imgremove} placement="top">
          <IconButton
            color="#585E67"
            onClick={() => onRemoveImg()}
            sx={{ padding: 0 }}
          >
            <HighlightOffIcon />
          </IconButton>
        </Tooltip>
      </Stack>
      <Stack>
        <img
          src={imageUrl}
          alt="uploaded"
          style={{
            width: "100%",
            height: 160,
            objectFit: "cover"
          }}></img>
      </Stack>
    </>
  );
}

export default FormUploadedImage;