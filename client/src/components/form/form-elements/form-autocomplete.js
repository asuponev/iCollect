import React from 'react';
import { Controller } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';
import { useIntl } from 'react-intl';

const FormAutocomplete = ({ control, name, label, options, errors, defaultValue }) => {
  const { messages } = useIntl();
  const text = messages["app.item.form"];

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          multiple
          options={options}
          getOptionLabel={(option) => option || ''}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                label={label}
                error={!!errors[name]}
                helperText={errors[name] ? text.required : null}
              />
            )
          }}
          onChange={(_, data) => {
            onChange(data);
            return data;
          }}
          defaultValue={defaultValue}
          freeSolo
          autoSelect
        />
      )}
    />
  );
}

export default FormAutocomplete;