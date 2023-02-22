import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { Stack, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import GlobalContext from '../utils/context/GlobalContext';
import FormRegister from '../components/form/form-register';
import { fetchRegister } from '../utils/requests/requests';
import { FormattedMessage } from 'react-intl';

export const Registration = () => {
  const { status, setStatus, userInfo, setUserInfo } = useContext(GlobalContext);
  let navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onFormSubmit = async (values) => {
    fetchRegister(values)
      .then(res => {
        localStorage.setItem('token', res.token);
        setStatus({ ...status, isAuth: true });
        setUserInfo({
          ...userInfo,
          firstName: res.firstName,
          lastName: res.lastName,
          userId: res._id
        });
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