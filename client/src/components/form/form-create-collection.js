import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Stack, Button } from '@mui/material';

import { FormTextField, FieldDescription } from './form-elements/form-textfields';
// import FormMarkdownText from './form-elements/form-mdtext';
import FormSelect from './form-elements/form-select';
import subjects from '../../utils/constants/collection-subjects';
import FormUploadingImage from './form-elements/form-uploading-image';
import FormUploadedImage from './form-elements/form-uploaded-image';

const FormCreateCollection = ({ handleClose, id, onRequest }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [selectedImg, setSelectedImg] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const onFormSubmit = async (values) => {
    values.coverUrl = imageUrl;
    values.authorId = id;
    onRequest(id, values);
    handleClose();
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} style={{ width: 336 }}>
      <Stack>
        <Box my={2}>
          {
            (selectedImg instanceof File) && imageUrl ? (
              <FormUploadedImage
                imageUrl={imageUrl}
                setSelectedImg={setSelectedImg}
                setImageUrl={setImageUrl}
              />
            ) : (
              <FormUploadingImage
                selectedImg={selectedImg}
                setSelectedImg={setSelectedImg}
                setImageUrl={setImageUrl}
              />
            )
          }
        </Box>
        <Box my={2}>
          <FormTextField
            name="title"
            label="Title"
            register={register}
            errors={errors}
          />
        </Box>
        <Box my={2}>
          <FormSelect
            name="subject"
            options={subjects}
            register={register}
            errors={errors}
          />
        </Box>
        <Box my={2}>
          <FieldDescription
            name="description"
            label="Description"
            register={register}
            errors={errors}
          />
          {/* <FormMarkdownText
            control={control}
            name="description"
          /> */}
        </Box>
      </Stack>
      <Box my={2} sx={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <Button type="submit" variant="contained">Create Collection</Button>
        <Button variant="text" onClick={() => handleClose()}>Cancel</Button>
      </Box>
    </form>

  )
}

export default FormCreateCollection;