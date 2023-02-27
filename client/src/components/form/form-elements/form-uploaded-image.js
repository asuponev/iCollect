import React from 'react';
import { Stack, Tooltip, IconButton } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useIntl } from 'react-intl';

import { removeImg } from '../../../utils/firebase/methods';

const FormUploadedImage = ({ setSelectedImg, imageUrl, setImageUrl, isEditing }) => {
  const { messages } = useIntl();
  const text = messages["app.collection.form"];

  const onRemoveImg = () => {
    if (!isEditing) removeImg(imageUrl);
    setSelectedImg(null);
    setImageUrl('');
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