import React, { useState, useEffect } from 'react';

import { getUsers } from '../utils/requests/requests';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import BreadCrumbs from '../components/admin/BreadCrumbs';
import Table from '../components/admin/Table';

function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    setLoading(true);
    getUsers()
      .then(res => {
        setUsers(res);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setError(error.message);
      })
    // eslint-disable-next-line
  }, [])

  const errorMessage = error ? <ErrorMessage error={error} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <>
      <BreadCrumbs />
      <Table users={users} />
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