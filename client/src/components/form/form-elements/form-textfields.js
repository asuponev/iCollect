import React from 'react';
import { TextField } from '@mui/material';
import { useIntl } from 'react-intl';

export const FormTextField = ({ name, label, register, errors }) => {
  const { messages } = useIntl();
  const text = messages["app.collection.form.errors"];

  return (
    <TextField
      {...register(name, {
        required: `${label} ${text.required}`,
        minLength: {
          value: 2,
          message: text.titlemin
        },
        maxLength: {
          value: 50,
          message: text.titlemax
        }
      })}
      label={label}
      variant="outlined"
      error={!!errors[name]}
      helperText={errors[name]?.message}
      fullWidth
    />
  );
};

export const FormEmailField = ({ register, errors }) => {
  const { messages } = useIntl();
  const text = messages["app.auth.form"];

  return (
    <TextField
      {...register("email", {
        required: `${text.email} ${text.required}`,
        pattern: {
          value: /\S+@\S+\.\S+/,
          message: text.emailformat
        },
        maxLength: {
          value: 50,
          message: text.emailmax
        }
      })}
      type="email"
      label={text.email}
      variant="outlined"
      error={!!errors.email}
      helperText={errors.email && `${errors.email.message}`}
    />
  );
};

export const FormPswField = ({ register, errors }) => {
  const { messages } = useIntl();
  const text = messages["app.auth.form"];

  return (
    <TextField
      {...register("password", {
        required: `${text.password} ${text.required}`,
        minLength: {
          value: 5,
          message: text.passwordmin
        }
      })}
      type="password"
      label={text.password}
      variant="outlined"
      error={!!errors.password}
      helperText={errors.password && `${errors.password.message}`}
    />
  );
};

export const FieldDescription = ({ name, label, register, errors }) => {
  const { messages } = useIntl();
  const text = messages["app.collection.form.errors"];

  return (
    <TextField
      {...register(name, {
        required: `${label} ${text.required}`,
        minLength: {
          value: 5,
          message: text.descrmin
        }
      })}
      label={label}
      variant="outlined"
      error={!!errors[name]}
      helperText={errors[name]?.message}
      fullWidth
    />
  );
};