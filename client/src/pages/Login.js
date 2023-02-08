import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { Box, Button, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalContext from '../utils/context/GlobalContext';
import { FieldEmail, FieldPassword } from '../components/form/TextFields';
import { authApi } from '../utils/requests/requests';

function Login() {
  const { status, setStatus } = useContext(GlobalContext);
  let navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onFormSubmit = async (values) => {
    authApi('login', { ...values })
      .then(res => {
        localStorage.setItem('token', JSON.stringify(res.token));
        if (res.role === 'ADMIN') {
          setStatus({ ...status, isAuth: true, id: res._id, isAdmin: true });
        } else {
          setStatus({ ...status, isAuth: true, id: res._id });
        }
        navigate('/');
      }).catch(error => {
        toast.error(error.message, { position: 'top-right' });
      })
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
      <Typography variant="h6" my={2}>Welcome Back!</Typography>
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
      <Typography my={2} fontSize={13}>Don't have an account ? <Link to="/register">Sign Up</Link></Typography>
    </Box>
  );
}

export default Login;