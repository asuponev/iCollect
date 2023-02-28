import React, { useState, useEffect } from 'react';
import { TextField, InputLabel, FormControl, LinearProgress, Stack } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';

import { uploadImg } from '../../../utils/firebase/methods';
import CustomizeMui from '../../../utils/theme/customizeMui';

const FormUploadingImage = ({ selectedImg, setSelectedImg, setImageUrl, toast }) => {
  const [progress, setProgress] = useState(0);
  const { imageUploadStyles } = CustomizeMui();
  const { messages } = useIntl();
  const text = messages["app.collection.form.errors"];

  useEffect(() => {
    uploadImg(selectedImg, setProgress, setImageUrl);
    // eslint-disable-next-line
  }, [selectedImg]);

  return (
    <>
      <Stack width="100%" height={16} mb={1} justifyContent="center">
        {
          progress
            ? <LinearProgress variant="determinate" value={progress} />
            : null
        }
      </Stack>
      <FormControl fullWidth>
        <InputLabel htmlFor="custom-img">
          <FormattedMessage id="app.collection.form.upload" />
        </InputLabel>
        <TextField
          id="custom-img"
          type="file"
          onChange={(e) => {
            if (e.target.files[0].type.slice(0, 5) !== 'image') {
              setSelectedImg('');
              toast.error(text.image, { position: 'top-right' });
            } else {
              setSelectedImg(e.target.files[0]);
            }
          }}
          sx={imageUploadStyles}
        />
      </FormControl>
    </>
  );
}

export default FormUploadingImage;