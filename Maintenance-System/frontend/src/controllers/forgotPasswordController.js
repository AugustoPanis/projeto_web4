import { authService } from '../services/authService.js';
import { ForgotPasswordView } from '../views/forgotPasswordView.js';
import { navigate } from '../router/router.js';
import { getFriendlyErrorMessage } from '../utils/errorMessages.js';

export const forgotPasswordController = {
  init() {
    this.view = new ForgotPasswordView();
    this.bindEvents();
  },

  bindEvents() {
    this.view.bindSignIpClick((credentials) => this.signIn(credentials));
    this.view.bindForgotPaswordClick((credentials) => this.forgotPassword(credentials));
  },

  async signIn() {
    navigate('/login');
  },

  async forgotPassword(credentials) {
    try {
      await authService.forgotPassword(credentials);
      this.view.showSuccess('Consulte seu email para redefinir a senha!');

    } catch (err) {
      this.view.showError(getFriendlyErrorMessage(err.code));
    }
  },

  async checkAuth() {
    return authService.waitForAuth();
  },

};