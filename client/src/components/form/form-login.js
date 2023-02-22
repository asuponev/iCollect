import React from 'react';
import { Box, Button } from '@mui/material';
import { FormEmailField, FormPswField } from './form-elements/form-textfields';
import { FormattedMessage } from 'react-intl';

const FormLogin = ({ register, handleSubmit, errors, onFormSubmit }) => {
  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
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
      <Button type="submit" variant="contained" fullWidth>
        <FormattedMessage id="app.auth.login.btn" />
      </Button>
    </form>
  );
}

export default FormLogin;