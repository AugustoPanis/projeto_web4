import { auth } from './firebase.js';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth';

export const authService = {

  async singUp(credentials) {
    const { email, password } = credentials;

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return userCredential.user;
  },

  async singIn(credentials) {
    const { email, password } = credentials;

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const token = await userCredential.user.getIdToken();

    return {
      token,
      user: {
        uid: userCredential.user.uid,
        email: userCredential.user.email
      }
    };
  },

  async logout() {
    await signOut(auth);
  },

  isAuthenticated() {
    return Boolean(auth.currentUser);
  },

  async getToken() {
    const user = auth.currentUser;

    if (!user) {
      return null;
    }
    return await user.getIdToken();
  },

  waitForAuth() {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(
        auth, (user) => {
          unsubscribe(); resolve(user);
        });
    });

  }

}
