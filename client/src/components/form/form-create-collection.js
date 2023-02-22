import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Stack, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { FormattedMessage, useIntl } from 'react-intl';
import { useWindowWidth } from '@react-hook/window-size';

import subjects from '../../utils/constants/collection-subjects';

import FormUploadingImage from './form-elements/form-uploading-image';
import FormUploadedImage from './form-elements/form-uploaded-image';
import { FormTextField, FieldDescription } from './form-elements/form-textfields';
import FormSelect from './form-elements/form-select';
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
  const windowWidth = useWindowWidth();
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

  const { messages } = useIntl();
  const text = messages["app.collection.form"];

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

  const widthForm = windowWidth > 900 ? 500
    : windowWidth > 600 ? 400
      : windowWidth < 410 ? 200 : 300;

  return (
    <>
      <ToastContainer />
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        style={{ width: widthForm }}
      >
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
              label={text.title}
              register={register}
              errors={errors}
            />
          </Box>
          <Box my={2}>
            <FormSelect
              name="subject"
              label={text.subject}
              options={subjects}
              register={register}
              errors={errors}
              defaultValue={getValues().subject ? getValues().subject : ''}
            />
          </Box>
          <Box my={2}>
            <FieldDescription
              name="description"
              label={text.description}
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
              !isEditing
                ? <FormattedMessage id="app.collection.form.btncreate" />
                : <FormattedMessage id="app.collection.form.btnedit" />
            }
          </Button>
          <Button variant="text" onClick={() => handleClose()}>
            <FormattedMessage id="app.collection.form.btncancel" />
          </Button>
        </Box>
      </form>
    </>
  );
}

export default FormCreateCollection;