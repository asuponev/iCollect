import React from 'react';
import { TextField, MenuItem } from '@mui/material';

const FormSelect = ({ name, register, errors, options, defaultValue }) => {
  return (
    <TextField
      select
      fullWidth
      name={name}
      label={`Select ${name}`}
      defaultValue={defaultValue}
      inputProps={register(name, {
        required: `Please select ${name}`,
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