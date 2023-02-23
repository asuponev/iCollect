import React from 'react';
import { useIntl } from 'react-intl';
import { TextField, MenuItem } from '@mui/material';
import { Controller } from 'react-hook-form';

const FormSelect = ({ name, register, errors, options, label, control, getValues }) => {
  const { messages } = useIntl();
  const text = messages["app.collection.form.errors"];

  return (
    <Controller
      control={control}
      name={name}
      render={() => (
        <TextField
          select
          fullWidth
          label={label}
          value={getValues()[name] ? getValues()[name] : ''}
          inputProps={register(name, {
            required: text.subjectselect,
          })}
          error={!!errors[name]}
          helperText={errors[name]?.message}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
}

export default FormSelect;