import { Box, Button } from '@mui/material';
import { FormEmailField, FormPswField } from './form-elements/form-textfields';

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
      <Button
        type="submit"
        variant="contained"
        fullWidth>Log In</Button>
    </form>
  )
}

export default FormLogin;