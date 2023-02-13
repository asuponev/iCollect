import React from 'react';
import { Controller } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';

const FormAutocomplete = ({ control, name, label, options, errors }) => {
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
                helperText={errors[name] ? 'Tags is required' : null}
              />
            )
          }}
          onChange={(_, data) => {
            onChange(data);
            return data;
          }}
          defaultValue={[]}
          freeSolo
        />
      )}
    />
  );
}

export default FormAutocomplete;