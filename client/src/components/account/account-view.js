import AccountCollections from './view-blocks/account-collections';
import UserInfo from './view-blocks/account-user-info';

const AccountView = ({ userData, id }) => {
  return (
    <>
      <UserInfo userData={userData} />
      <AccountCollections id={id} />
    </>

  )
}

export default AccountView;