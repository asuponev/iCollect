import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Box, Stack, Button } from '@mui/material';
import { useWindowWidth } from '@react-hook/window-size';
import { FormattedMessage, useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import { useCreateItemMutation, useUpdateItemMutation } from '../../store/api/items.api';
import { onCloseModalForm } from '../../store/action-creators/items';

import { FormTextField } from './form-elements/form-textfields';
import FormAutocomplete from './form-elements/form-autocomplete';
import FormItemExtraFields from './form-elements/form-item-extra-fields';

const FormCreateItem = ({ collectionId }) => {
  const [createItem] = useCreateItemMutation();
  const [updateItem] = useUpdateItemMutation();

  const dispatch = useDispatch();
  const { currentId, isEditing, valuesForEdit } = useSelector(state => state.items);
  const { tags } = useSelector(state => state.tags);
  const { collection } = useSelector(state => state.collection);
  const windowWidth = useWindowWidth();
  const { register, handleSubmit, control, formState: { errors }, getValues } = useForm({
    defaultValues: {
      title: valuesForEdit.title || '',
      tags: valuesForEdit.tags || [],
    }
  });

  const { messages } = useIntl();
  const text = messages["app.item.form"];

  const onFormSubmit = async (item) => {
    if (isEditing) {
      const itemId = currentId;
      updateItem({ collectionId, itemId, item })
        .unwrap()
        .then((res) => {
          console.log(res);
          toast.success(text.successupdate, { position: 'top-right' });
        })
        .catch((error) => {
          console.log(error);
          toast.error(text.error, { position: 'top-right' });
        })
    } else {
      item.collectionId = collectionId;
      createItem({ collectionId, item })
        .unwrap()
        .then((res) => {
          console.log(res);
          toast.success(text.successcreate, { position: 'top-right' });
        })
        .catch((error) => {
          console.log(error);
          toast.error(text.error, { position: 'top-right' });
        })
    }
    dispatch(onCloseModalForm());
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
            options={tags}
            errors={errors}
            getValues={getValues}
          />
        </Box>
        <FormItemExtraFields
          extraFields={collection.extraFields}
          register={register}
          errors={errors}
          valuesForEdit={valuesForEdit}
          control={control}
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
        <Button variant="text" onClick={() => dispatch(onCloseModalForm())}>
          <FormattedMessage id="app.item.form.btncancel" />
        </Button>
      </Box>
    </form>
  );
}

export default FormCreateItem;