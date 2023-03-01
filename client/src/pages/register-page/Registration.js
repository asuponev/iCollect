import React from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';

import { fetchRegister } from '../../utils/requests/requests';
import useAuthService from '../../utils/hooks/use-auth-service';

import FormRegister from '../../components/form/form-register';
import SocialLogin from '../../components/social/social-login';

export const Registration = () => {
  let navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { changeAuthStatus } = useAuthService();

  const onFormSubmit = async (values) => {
    fetchRegister(values)
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
      <Stack alignItems="center" justifyContent="center" my={10}>
        <Typography variant="h6" my={2}>
          <FormattedMessage id="app.auth.register.header" />
        </Typography>
        <SocialLogin toast={toast} />
        <FormRegister
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          onFormSubmit={onFormSubmit}
        />
        <Typography my={2} fontSize={13}>
          <FormattedMessage id="app.auth.register.text" />
          <Link to="/login"><FormattedMessage id="app.auth.login" /></Link>
        </Typography>
      </Stack>
    </>
  );
}