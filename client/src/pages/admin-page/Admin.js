import React, { useState, useEffect } from 'react';
import { Stack, Typography } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import { ToastContainer, toast } from 'react-toastify';

import { getUsers, blockUser, makeAdmin, deleteUser, deleteUsers } from '../../utils/requests/requests';

import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import BreadCrumbs from '../../components/BreadCrumbs';
import AdminTable from '../../components/tables/admin-table/admin-table';
import AdminTools from '../../components/tables/admin-table/admin-tools';

export const Admin = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [currentAction, setCurrentAction] = useState({
    id: '',
    action: ''
  });

  const { messages } = useIntl();
  const text = messages["app.admin-panel"];

  useEffect(() => {
    onRequest(users);
    // eslint-disable-next-line
  }, []);

  const onRequest = (users) => {
    setError(null);
    setLoading(true);
    getUsers(users)
      .then(res => {
        setUsers(res);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setError(error.message);
      })
  };

  const blockSelectedUser = (userId) => {
    setCurrentAction({ id: userId, action: 'block' });
    setLoadingBtn(true);
    blockUser(userId)
      .then(res => {
        setUsers(users.map(user => user._id === res._id ? res : user));
        setLoadingBtn(false);
      }).catch(error => {
        console.log(error);
        setLoadingBtn(false);
        setCurrentAction({ id: '', action: '' });
        toast.error(error.message, { position: 'top-right' });
      })
  };

  const makeAdminSelectedUser = (userId) => {
    setCurrentAction({ id: userId, action: 'admin' });
    setLoadingBtn(true);
    makeAdmin(userId)
      .then(res => {
        setUsers(users.map(user => user._id === res._id ? res : user));
        setLoadingBtn(false);
      }).catch(error => {
        console.log(error);
        setLoadingBtn(false);
        setCurrentAction({ id: '', action: '' });
        toast.error(error.message, { position: 'top-right' });
      })
  };

  const deleteSelectedUser = (userId) => {
    setCurrentAction({ id: userId, action: 'delete' });
    setLoadingBtn(true);
    deleteUser(userId)
      .then(res => {
        setUsers(users.filter(user => user._id !== res._id));
        setLoadingBtn(false);
        toast.info(text.successdelete1, { position: 'top-right' });
      }).catch(error => {
        console.log(error);
        setLoadingBtn(false);
        setCurrentAction({ id: '', action: '' });
        toast.error(error.message, { position: 'top-right' });
      })
  };

  const deleteSelectedUsers = (usersId) => {
    setLoadingBtn(true);
    deleteUsers(usersId)
      .then(res => {
        setUsers(users.filter(user => !res.includes(user._id)));
        setLoadingBtn(false);
        toast.info(text.successdelete2, { position: 'top-right' });
      }).catch(error => {
        console.log(error);
        setLoadingBtn(false);
        toast.error(error.message, { position: 'top-right' });
      })
  };

  const errorMessage = error ? <ErrorMessage error={error} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <Stack spacing={4} mb={10}>
      <ToastContainer />
      <BreadCrumbs current={text.breadcrumbs} />
      <Stack spacing={3}>
        <Typography variant="h5" fontWeight="500">
          <FormattedMessage id="app.admin-panel.header" />
        </Typography>
        <AdminTools
          selectedUsers={selectedUsers}
          deleteSelectedUsers={deleteSelectedUsers}
          loadingBtn={loadingBtn}
        />
        <AdminTable
          users={users}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          deleteSelectedUser={deleteSelectedUser}
          blockSelectedUser={blockSelectedUser}
          makeAdminSelectedUser={makeAdminSelectedUser}
          loadingBtn={loadingBtn}
          currentAction={currentAction}
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