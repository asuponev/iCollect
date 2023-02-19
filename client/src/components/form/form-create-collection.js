import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Stack, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { FormTextField, FieldDescription } from './form-elements/form-textfields';
// import FormMarkdownText from './form-elements/form-mdtext';
import FormSelect from './form-elements/form-select';
import subjects from '../../utils/constants/collection-subjects';
import FormUploadingImage from './form-elements/form-uploading-image';
import FormUploadedImage from './form-elements/form-uploaded-image';
import FormCreateExtraField from './form-elements/form-create-extra-field';

const FormCreateCollection = ({
  handleClose,
  userId,
  onRequestCreate,
  onRequestUpdate,
  collectionId,
  isEditing,
  valuesForEdit
}) => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm({
    defaultValues: {
      title: valuesForEdit.title || '',
      subject: valuesForEdit.subject || '',
      description: valuesForEdit.description || '',
    }
  });
  const [selectedImg, setSelectedImg] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [extraFields, setExtraFields] = useState([]);

  useEffect(() => {
    if (isEditing) {
      setImageUrl(valuesForEdit.coverUrl);
      setExtraFields(valuesForEdit.extraFields);
    } else {
      setImageUrl('');
      setExtraFields([]);
    }
    // eslint-disable-next-line
  }, [isEditing]);

  const onFormSubmit = async (values) => {
    values.extraFields = extraFields;
    values.coverUrl = imageUrl;
    if (isEditing) {
      onRequestUpdate(collectionId, values);
    } else {
      values.authorId = userId;
      onRequestCreate(values);
    }
    handleClose();
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit(onFormSubmit)} style={{ width: 336 }}>
        <Stack>
          <Box mb={2}>
            {
              (selectedImg instanceof File && imageUrl) ||
                (isEditing && imageUrl) ? (
                <FormUploadedImage
                  setSelectedImg={setSelectedImg}
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  toast={toast}
                />
              ) : (
                <FormUploadingImage
                  selectedImg={selectedImg}
                  setSelectedImg={setSelectedImg}
                  setImageUrl={setImageUrl}
                  toast={toast}
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
              defaultValue={getValues().subject ? getValues().subject : ''}
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
          <Box my={2}>
            <FormCreateExtraField
              extraFields={extraFields}
              setExtraFields={setExtraFields}
            />
          </Box>
        </Stack>
        <Box my={2} sx={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <Button type="submit" variant="contained">
            {
              !isEditing ? <>Create Collection</> : <>Save Changes</>
            }
          </Button>
          <Button variant="text" onClick={() => handleClose()}>Cancel</Button>
        </Box>
      </form>
    </>
  );
}

export default FormCreateCollection;