import { app } from './firebase';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider
} from 'firebase/auth';

const auth = getAuth(app);

const providers = {
  google: new GoogleAuthProvider(),
  facebook: new FacebookAuthProvider(),
};

export const fetchUserData = async (provider) => {
  try {
    const data = await signInWithPopup(auth, providers[provider]);
    const email = data.user.email
        ? data.user.email
        : data.user.providerData[0].email;
    const firstName = data.user.displayName.split(' ')[0];
    const lastName = data.user.displayName.split(' ').splice(1).join('');
    return { email, firstName, lastName };
  } catch (error) {
    throw new Error(error);
  }
}