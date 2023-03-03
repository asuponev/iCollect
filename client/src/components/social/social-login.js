import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Box, IconButton, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import { FormattedMessage } from 'react-intl';

import { requestLogin } from '../../store/action-creators/auth';
import { fetchUserData } from '../../utils/firebase/firebase-auth';
import { fetchFirebaseLogin } from '../../utils/requests/requests';

const SocialLogin = ({ toast }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  let navigate = useNavigate();

  useEffect(() => {
    if (user.email) {
      dispatch(requestLogin(user, fetchFirebaseLogin, navigate));
    }
    // eslint-disable-next-line
  }, [user]);

  const onFirebaseLogin = (provider) => {
    fetchUserData(provider)
      .then(res => {
        setUser(res);
      })
      .catch(error => {
        setUser({});
        toast.error(error.message, { position: 'top-right' });
      })
  };

  return (
    <Box display="flex" alignItems="center">
      <Typography marginRight={3}>
        <FormattedMessage id="app.auth.social.text" />
      </Typography>
      <IconButton onClick={() => onFirebaseLogin('google')}>
        <GoogleIcon />
      </IconButton>
      <IconButton onClick={() => onFirebaseLogin('facebook')}>
        <FacebookOutlinedIcon />
      </IconButton>
    </Box>
  )
}

export default SocialLogin;