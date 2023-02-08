import React, { useState, useEffect } from 'react';

import { getUsers, updateUsers } from '../utils/requests/requests';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import BreadCrumbs from '../components/admin/BreadCrumbs';
import Table from '../components/admin/Table';

function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    onRequest(getUsers);
  }, [])

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
  }

  const deleteSelectedUsers = (users) => {
    if (users) {
      onRequest(updateUsers, [users, 'delete']);
      onRequest(getUsers);
    }
  }

  const blockSelectedUsers = (users) => {
    if (users) {
      onRequest(updateUsers, [users, 'block']);
      onRequest(getUsers);
    }
  }

  const makeAdminSelectedUsers = (users) => {
    if (users) {
      onRequest(updateUsers, [users, 'admin']);
      onRequest(getUsers);
    }
  }

  const errorMessage = error ? <ErrorMessage error={error} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <>
      <BreadCrumbs />
      <Table
        users={users}
        deleteSelectedUsers={deleteSelectedUsers}
        blockSelectedUsers={blockSelectedUsers}
        makeAdminSelectedUsers={makeAdminSelectedUsers}
      />
    </>
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