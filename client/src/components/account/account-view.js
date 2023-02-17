import AccountCollections from './view-blocks/account-collections';
import UserInfo from './view-blocks/account-user-info';

const AccountView = ({ userData, userId }) => {
  return (
    <>
      <UserInfo userData={userData} />
      <AccountCollections userId={userId} />
    </>

  )
}

export default AccountView;