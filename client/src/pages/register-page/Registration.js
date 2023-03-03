import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';

import { requestLogin } from '../../store/action-creators/auth';
import { fetchRegister } from '../../utils/requests/requests';

import FormRegister from '../../components/form/form-register';
import SocialLogin from '../../components/social/social-login';

export const Registration = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onFormSubmit = (values) => {
    dispatch(requestLogin(values, fetchRegister, navigate));
  };

  return (
    <>
      <ToastContainer />
      <Stack alignItems="center" justifyContent="center" mt={18} mb={10}>
        <Typography variant="h5" fontWeight={700} mb={4}>
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