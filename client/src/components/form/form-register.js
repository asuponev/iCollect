import React from 'react';
import { Box, Button } from '@mui/material';
import { FormTextField, FormEmailField, FormPswField } from './form-elements/form-textfields';
import { cloneDeepWith } from 'lodash-es';

const FormRegister = ({ register, handleSubmit, errors, onFormSubmit }) => {

  const preSubmit = (values) => {
    const trimmedFormValues = cloneDeepWith(values, p =>
      typeof p === 'string' ? p.trim() : undefined
    );
    onFormSubmit(trimmedFormValues);
  };
  
  return (
    <form onSubmit={handleSubmit(preSubmit)}>
      <Box my={2}>
        <FormTextField
          name="firstName"
          label="First name"
          register={register}
          errors={errors}
        />
      </Box>
      <Box my={2}>
        <FormTextField
          name="lastName"
          label="Last name"
          register={register}
          errors={errors}
        />
      </Box>
      <Box my={2}>
        <FormEmailField
          register={register}
          errors={errors}
        />
      </Box>
      <Box my={2}>
        <FormPswField
          register={register}
          errors={errors}
        />
      </Box>
      <Button
        type="submit"
        variant="contained"
        fullWidth>Create an Account</Button>
    </form>
  );
}

export default FormRegister;