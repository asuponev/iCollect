import React, { useState } from 'react';
import { TextField, InputLabel, FormControl, LinearProgress, Stack, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { FormattedMessage, useIntl } from 'react-intl';

import { storage } from '../../../utils/firebase';

import { ImageUploadStyles } from '../../../styles/image-upload-styles';

const FormUploadingImage = ({ selectedImg, setSelectedImg, setImageUrl, toast }) => {
  const [progress, setProgress] = useState(0);

  const { messages } = useIntl();
  const text = messages["app.collection.form.errors"];
  const theme = useTheme();

  useEffect(() => {
    uploadImg(selectedImg);
    // eslint-disable-next-line
  }, [selectedImg]);

  const uploadImg = (img) => {
    if (!img) return;
    const imageRef = ref(storage, `images/collections/${v4()}${img.name}`);
    const uploadTask = uploadBytesResumable(imageRef, img);
    uploadTask.on('state_changed', (snapshot) => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setProgress(progress);
    },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then(url => setImageUrl(url));
      })
  };

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
          sx={ImageUploadStyles}
        />
      </FormControl>
    </>
  );
}

export default FormUploadingImage;