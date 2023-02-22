import React from 'react';
import { useIntl } from 'react-intl';
import { TextField, MenuItem } from '@mui/material';

const FormSelect = ({ name, register, errors, options, label, defaultValue }) => {
  const { messages } = useIntl();
  const text = messages["app.collection.form.errors"];

  return (
    <TextField
      select
      fullWidth
      name={name}
      label={label}
      defaultValue={defaultValue}
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
  );
}

export default FormSelect;