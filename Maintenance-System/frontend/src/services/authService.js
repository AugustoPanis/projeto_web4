import { auth } from './firebase.js';
import { signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth'
import { ApiError } from '../errors/ApiError.js';


export const authService = {

  async singIn(credentials) {
    const { email, password } = credentials;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      return {
        user: { uid: userCredential.user.uid, email: userCredential.user.email }
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
    } catch (error) { throw new ApiError('Erro ao sair.', { code: error.code }); }
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

  async waitForAuth() {
    await auth.authStateReady();
    return auth.currentUser;
  }

}
