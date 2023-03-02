import React from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';

import { fetchLogin } from '../../utils/requests/requests';
import useAuthService from '../../utils/hooks/use-auth-service';

import FormLogin from '../../components/form/form-login';
import SocialLogin from '../../components/social/social-login';

export const Login = () => {
  let navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { changeAuthStatus } = useAuthService();

  const onFormSubmit = async (values) => {
    fetchLogin(values)
      .then(res => {
        localStorage.setItem('token', res.token);
        changeAuthStatus(res);
        navigate('/');
      }).catch(error => {
        toast.error(error.message, { position: 'top-right' });
      })
  };

  return (
    <>
      <ToastContainer />
      <Stack alignItems="center" justifyContent="center" mt={18} mb={10}>
        <Typography variant="h5" fontWeight={700} mb={4}>
          <FormattedMessage id="app.auth.login.header" />
        </Typography>
        <SocialLogin toast={toast} />
        <FormLogin
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          onFormSubmit={onFormSubmit}
        />
        <Typography my={2} fontSize={13}>
          <FormattedMessage id="app.auth.login.text" />
          <Link to="/register"><FormattedMessage id="app.auth.register" /></Link>
        </Typography>
      </Stack>
    </>
  );
}