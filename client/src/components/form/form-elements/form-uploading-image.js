import React, { useState } from 'react';
import { TextField, LinearProgress, Stack } from '@mui/material';
import { useEffect } from 'react';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useIntl } from 'react-intl';

import { storage } from '../../../utils/firebase';

const FormUploadingImage = ({ selectedImg, setSelectedImg, setImageUrl, toast }) => {
  const [progress, setProgress] = useState(0);

  const { messages } = useIntl();
  const text = messages["app.collection.form.errors"];

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
      <TextField
        type="file"
        onChange={(e) => {
          if (e.target.files[0].type.slice(0, 5) !== 'image') {
            setSelectedImg('');
            toast.error(text.image, { position: 'top-right' });
          } else {
            setSelectedImg(e.target.files[0]);
          }
        }}
        sx={{
          width: "100%",
          "& .MuiInputBase-root": {
            height: 160,
          },
          "& .MuiInputBase-input": {
            height: "100%",
            padding: 0,
            background: "#F9F9F9",
            border: "1px dashed #585E67",
            borderRadius: "8px",
            cursor: "pointer",
            "&::file-selector-button": {
              margin: 0,
              padding: 0,
              height: "100%",
              width: "100%",
              background: "#F9F9F9",
              border: "none"
            },
          },
          "& .MuiInputBase-input:hover": {
            border: "1px solid #000000",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
            padding: 0,
          }
        }}
      />
    </>
  );
}

export default FormUploadingImage;