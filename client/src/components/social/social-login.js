import React, { useState, useEffect } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import { FormattedMessage } from 'react-intl';

import { fetchUserData } from '../../utils/firebase/firebase-auth';
import { fetchFirebaseLogin } from '../../utils/requests/requests';
import useAuthService from '../../utils/hooks/use-auth-service';

const SocialLogin = ({ toast }) => {
  const [user, setUser] = useState({});
  const { changeAuthStatus } = useAuthService();

  useEffect(() => {
    if (user.email) {
      fetchFirebaseLogin(user)
        .then(res => {
          changeAuthStatus(res);
        }).catch(error => {
          toast.error(error.message, { position: 'top-right' });
        })
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
    <Box display="flex" alignItems="center" my={2}>
      <Typography>
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