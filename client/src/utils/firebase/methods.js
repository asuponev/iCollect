import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable, deleteObject } from 'firebase/storage';
import { storage } from './firebase';

export const uploadImg = (img, setProgress, setImageUrl) => {
  if (!img) return;
  const imageRef = ref(storage, `images/collections/${v4()}${img.name}`);
  const uploadTask = uploadBytesResumable(imageRef, img);
  uploadTask.on('state_changed', (snapshot) => {
    const process = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    setProgress(process);
  }, (err) => console.log(err), () => {
    getDownloadURL(uploadTask.snapshot.ref)
      .then(url => setImageUrl(url));
  });
};

export const removeImg = (imageUrl) => {
  const imageRef = ref(storage, imageUrl);
  deleteObject(imageRef).then(() => {
    console.log('file deleted');
  }).catch((error) => {
    console.log(error);
  });
};
