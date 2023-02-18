import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Stack, Button } from '@mui/material';
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
  const { register, handleSubmit, control, formState: { errors }, getValues } = useForm({
    defaultValues: {
      title: valuesForEdit.title || '',
      tags: valuesForEdit.tags || [],
    }
  });

  const onFormSubmit = (values) => {
    if (isEditing) {
      onRequestUpdate(collectionId, itemId, values);
    } else {
      values.collectionId = collectionId;
      onRequestCreate(collectionId, values);
    }
    handleClose();
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} style={{ width: 336 }}>
      <Stack>
        <Box my={2}>
          <FormTextField
            name="title"
            label="Title"
            register={register}
            errors={errors}
          />
        </Box>
        <Box my={2}>
          <FormAutocomplete
            name="tags"
            label="Tags"
            control={control}
            options={tagsList}
            errors={errors}
            defaultValue={getValues().tags ? getValues().tags : []}
          />
        </Box>
        <FormItemExtraFields
          extraFields={extraFields}
          register={register}
          valuesForEdit={valuesForEdit}
        />
      </Stack>
      <Box my={2} sx={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <Button type="submit" variant="contained">
          {
            !isEditing ? <>Create Item</> : <>Save Changes</>
          }
        </Button>
        <Button variant="text" onClick={() => handleClose()}>Cancel</Button>
      </Box>
    </form>
  )
}

export default FormCreateItem;