import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Stack } from '@mui/material';

import { requestGetUser } from '../../store/action-creators/user';

import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import BreadCrumbs from '../../components/BreadCrumbs';
import Collections from './sections/Collections';
import UserInfo from './sections/user-info';

export const Account = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { loading, user, error } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(requestGetUser(userId));
    // eslint-disable-next-line
  }, [userId]);

  const nameCurrentPage = `${user?.firstName} ${user?.lastName}`;

  const errorMessage = error ? <ErrorMessage error={error} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <Stack mb={10}>
      <BreadCrumbs current={nameCurrentPage} />
      <UserInfo data={user} />
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