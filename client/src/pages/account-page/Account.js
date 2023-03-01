import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Stack } from '@mui/material';

import { getOneUser } from '../../utils/requests/requests';

import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import BreadCrumbs from '../../components/BreadCrumbs';
import Collections from './sections/collections';
import UserInfo from './sections/user-info';

export const Account = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    setLoading(true);
    getOneUser(userId)
      .then(res => {
        setUserData(res);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setError(error.message);
      })
  }, [userId]);

  const nameCurrentPage = `${userData.firstName} ${userData.lastName}`;

  const errorMessage = error ? <ErrorMessage error={error} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <Stack mb={10}>
      <BreadCrumbs current={nameCurrentPage} />
      <UserInfo data={userData} />
      <Collections userId={userId} />
    </Stack>
  ) : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
}