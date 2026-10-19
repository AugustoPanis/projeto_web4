import { authService } from '../services/authService.js';
import { ForgotPasswordView } from '../views/forgotPasswordView.js';
import { navigate } from '../router/router.js';
import { getFriendlyErrorMessage } from '../utils/errorMessages.js';

export const forgotPasswordController = {
  view: null,
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
    } catch (err) {
      this.view.showError(getFriendlyErrorMessage(err.code));
    }

  },

  async singIn(credentials) {
    try {
      await authService.singIn(credentials);
      navigate('/dashboard');
    } catch (err) {
      this.view.showError(getFriendlyErrorMessage(err.code));
    }
  },

  async logout() {
    try {
      await authService.logout();
      navigate('/login');
    } catch (err) {
      this.view.showError(getFriendlyErrorMessage(err.code));
    }
  },

  async checkAuth() {
    return authService.waitForAuth();
  },

};