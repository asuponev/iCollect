import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { Stack, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';

import GlobalContext from '../../utils/context/GlobalContext';
import { fetchLogin } from '../../utils/requests/requests';

import FormLogin from '../../components/form/form-login';

export const Login = () => {
  const { status, setStatus, userInfo, setUserInfo } = useContext(GlobalContext);
  let navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onFormSubmit = async (values) => {
    fetchLogin(values)
      .then(res => {
        localStorage.setItem('token', res.token);
        setUserInfo({
          ...userInfo,
          firstName: res.firstName,
          lastName: res.lastName,
          userId: res._id
        });
        if (res.role === 'ADMIN') {
          setStatus({ ...status, isAdmin: true, isAuth: true });
        } else {
          setStatus({ ...status, isAuth: true });
        }
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
          <FormattedMessage id="app.auth.login.header" />
        </Typography>
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