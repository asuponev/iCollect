import { Box, Button } from '@mui/material';
import { FormTextField, FormEmailField, FormPswField } from './form-elements/form-textfields';

const FormRegister = ({ register, handleSubmit, errors, onFormSubmit }) => {
  
  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
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
  )
}

export default FormRegister;