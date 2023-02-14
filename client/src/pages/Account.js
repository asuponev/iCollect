import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOneUser } from '../../src/utils/requests/requests';

import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import BreadCrumbs from '../components/BreadCrumbs';
import AccountView from '../components/account/account-view';

export const Account = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    setLoading(true);
    getOneUser(id)
      .then(res => {
        setUserData(res);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setError(error.message);
      })
  }, [id])

  const errorMessage = error ? <ErrorMessage error={error} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <>
      <BreadCrumbs
        prevLinks={[{ 'Home': '/' }]}
        current={`${userData.firstName} ${userData.lastName}`}
      />
      <AccountView userData={userData} id={id} />
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