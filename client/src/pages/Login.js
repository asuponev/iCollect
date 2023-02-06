import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { Box, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FieldEmail, FieldPassword } from '../components/form/TextFields';
import { authApi } from '../utils/apis/authApi';
import routes from '../utils/routes';

function Login() {
  let navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onFormSubmit = async (values) => {
    try {
      const { data } = await authApi('login', { ...values });
      if (data) {
        localStorage.setItem('token', JSON.stringify(data.token));
        navigate(routes.HOME);
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: 'top-right',
      })
    }
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      my={10}
    >
      <ToastContainer />
      <Box my={2}>
        <p className="h5">Welcome Back!</p>
      </Box>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Box my={2}>
          <FieldEmail
            register={register}
            errors={errors}
          />
        </Box>
        <Box my={2}>
          <FieldPassword
            register={register}
            errors={errors}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          fullWidth>Log In</Button>
      </form>
      <Box my={2}>
        Don't have an account ? <Link to="/register"> Sign Up </Link>
      </Box>
    </Box>
  );
}

export default Login;