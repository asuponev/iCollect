import React from 'react';
import { TextField } from '@mui/material';
import { useEffect } from 'react';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../utils/firebase';

const FormUploadingImage = ({ selectedImg, setSelectedImg, setImageUrl }) => {

  useEffect(() => {
    uploadImg(selectedImg);
    // eslint-disable-next-line
  }, [selectedImg])

  const uploadImg = (img) => {
    if (!img) return;
    const imageRef = ref(storage, `images/collections/${v4()}${img.name}`);
    const uploadTask = uploadBytesResumable(imageRef, img);
    uploadTask.on('state_changed', (snapshot) => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      console.log(`File uploaded on ${progress} %`);
    },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then(url => setImageUrl(url));
      })
  }

  return (
    <TextField
      type="file"
      onChange={(e) => setSelectedImg(e.target.files[0])}
      sx={{
        "& .MuiInputBase-root": {
          height: 160,
        },
        "& .MuiInputBase-input": {
          height: "100%"
        }
      }}
    />
  )
}

export default FormUploadingImage;