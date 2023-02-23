import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Stack, Button } from '@mui/material';
import { useWindowWidth } from '@react-hook/window-size';
import { FormattedMessage, useIntl } from 'react-intl';

import { FormTextField } from './form-elements/form-textfields';
import FormAutocomplete from './form-elements/form-autocomplete';
import FormItemExtraFields from './form-elements/form-item-extra-fields';

const FormCreateItem = ({
  collectionId,
  handleClose,
  onRequestCreate,
  extraFields,
  isEditing,
  valuesForEdit,
  onRequestUpdate,
  itemId,
  tagsList
}) => {
  const windowWidth = useWindowWidth();
  const { register, handleSubmit, control, formState: { errors }, getValues } = useForm({
    defaultValues: {
      title: valuesForEdit.title || '',
      tags: valuesForEdit.tags || [],
    }
  });

  const { messages } = useIntl();
  const text = messages["app.item.form"];

  const onFormSubmit = (values) => {
    if (isEditing) {
      onRequestUpdate(collectionId, itemId, values);
    } else {
      values.collectionId = collectionId;
      onRequestCreate(collectionId, values);
    }
    handleClose();
  };

  const widthForm = windowWidth > 900 ? 500
    : windowWidth > 600 ? 400
      : windowWidth < 410 ? 200 : 300;

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      style={{ width: widthForm }}
    >
      <Stack>
        <Box my={2}>
          <FormTextField
            name="title"
            label={text.title}
            register={register}
            errors={errors}
          />
        </Box>
        <Box my={2}>
          <FormAutocomplete
            name="tags"
            label={text.tags}
            control={control}
            options={tagsList}
            errors={errors}
            getValues={getValues}
          />
        </Box>
        <FormItemExtraFields
          extraFields={extraFields}
          register={register}
          errors={errors}
          valuesForEdit={valuesForEdit}
        />
      </Stack>
      <Box my={2} sx={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <Button type="submit" variant="contained">
          {
            !isEditing
              ? <FormattedMessage id="app.item.form.btncreate" />
              : <FormattedMessage id="app.item.form.btnedit" />
          }
        </Button>
        <Button variant="text" onClick={() => handleClose()}>
          <FormattedMessage id="app.item.form.btncancel" />
        </Button>
      </Box>
    </form>
  );
}

export default FormCreateItem;