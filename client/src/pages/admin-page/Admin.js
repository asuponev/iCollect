import React, { useState, useEffect } from 'react';
import { Stack, Typography } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';

import { getUsers, updateUsers } from '../../utils/requests/requests';

import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import BreadCrumbs from '../../components/BreadCrumbs';
import AdminTable from '../../components/tables/admin-table/admin-table';

export const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { messages } = useIntl();

  useEffect(() => {
    onRequest(getUsers);
  }, []);

  const onRequest = (request, users) => {
    setError(null);
    setLoading(true);
    request(users)
      .then(res => {
        setUsers(res);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setError(error.message);
      })
  };

  const deleteSelectedUsers = (users) => {
    if (users) {
      onRequest(updateUsers, [users, 'delete']);
      onRequest(getUsers);
    }
  };

  const blockSelectedUsers = (users) => {
    if (users) {
      onRequest(updateUsers, [users, 'block']);
      onRequest(getUsers);
    }
  };

  const makeAdminSelectedUsers = (users) => {
    if (users) {
      onRequest(updateUsers, [users, 'admin']);
      onRequest(getUsers);
    }
  };

  const errorMessage = error ? <ErrorMessage error={error} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <Stack spacing={4} mb={10}>
      <BreadCrumbs current={messages["app.admin-panel.breadcrumbs"]} />
      <Stack spacing={3}>
        <Typography variant="h5" fontWeight="500">
          <FormattedMessage id="app.admin-panel.header" />
        </Typography>
        <AdminTable
          users={users}
          deleteSelectedUsers={deleteSelectedUsers}
          blockSelectedUsers={blockSelectedUsers}
          makeAdminSelectedUsers={makeAdminSelectedUsers}
        />
      </Stack>
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

export default Admin;