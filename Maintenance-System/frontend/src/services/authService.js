import { auth } from './firebase.js';
import { signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth';
import { ApiError } from '../errors/ApiError.js';


export const authService = {

  async singIn(credentials) {
    const { email, password } = credentials;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      return {
        user: {uid: userCredential.user.uid,email: userCredential.user.email}
      };  

    } catch (error) { throw new ApiError('Erro ao fazer login.', { code: error.code }); }
  },

  async forgotPassword(credentials) {
    const { email } = credentials;
    try {
      await sendPasswordResetEmail(auth, email);
    }
    catch (error) { throw new ApiError('Erro ao redefinir senha.', { code: error.code }); }
  },

  async logout() {
    try {
      await signOut(auth);
      
    } catch (error) {throw new ApiError('Erro ao sair.', { code: error.code });}
  },

  isAuthenticated() {
    try {
      return Boolean(auth.currentUser);
    } catch (error) { throw new ApiError('Erro ao verificar autenticação.', { code: error.code }); }
  },

async getToken() {
  const user = auth.currentUser;
  if (!user) return null;
  try {
    return await user.getIdToken();
  } catch (error) {
    throw toApiError(error, 'Erro ao obter o token.');
  }
},

waitForAuth() {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => { unsubscribe(); resolve(user); },
      (error) => { unsubscribe(); reject(toApiError(error)); }
    );
  });
}

}
