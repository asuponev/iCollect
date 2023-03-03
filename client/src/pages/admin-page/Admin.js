import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stack, Typography } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import { ToastContainer } from 'react-toastify';

import { requestGetUsers } from '../../store/action-creators/admin';

import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import BreadCrumbs from '../../components/BreadCrumbs';
import AdminTable from '../../components/tables/admin-table/admin-table';
import AdminTools from '../../components/tables/admin-table/admin-tools';

export const Admin = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.admin);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const { messages } = useIntl();
  const text = messages["app.admin-panel"];

  useEffect(() => {
    dispatch(requestGetUsers());
    // eslint-disable-next-line
  }, []);

  const errorMessage = error ? <ErrorMessage error={error} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <Stack spacing={4} mb={10}>
      <ToastContainer />
      <Stack spacing={3}>
        <Typography variant="h5" fontWeight="500">
          <FormattedMessage id="app.admin-panel.header" />
        </Typography>
        <AdminTools selectedUsers={selectedUsers} />
        <AdminTable
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />
      </Stack>
    </Stack>
  ) : null;

  return (
    <>
      <BreadCrumbs current={text.breadcrumbs} />
      {errorMessage}
      {spinner}
      {content}
    </>
  );
}

export default Admin;