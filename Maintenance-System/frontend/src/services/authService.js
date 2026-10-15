import { auth } from './firebase.js';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth';

export const authService = {

  async singIn(credentials) {
    const { email, password } = credentials;

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();

    return {token,
      user: {
        uid: userCredential.user.uid,
        email: userCredential.user.email
      }
    };
  },

async forgotPassword(credentials) {
  const { email } = credentials;

  await sendPasswordResetEmail(auth, email);
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
