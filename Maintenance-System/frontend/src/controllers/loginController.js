import { authService } from '../services/authService.js';
import { LoginView } from '../views/loginView.js';
import { navigate } from '../router/router.js';
import { getFriendlyErrorMessage } from '../utils/errorMessages.js';

export const loginController = {
  init() {
    this.view = new LoginView();
    this.bindEvents();
  },

  bindEvents() {
    this.view.bindSignIn((credentials) => this.singIn(credentials));
    this.view.bindSingUpClick(() => this.SignUp());
    this.view.bindForgotPaswordClick(() => this.forgotPassword());
  },

  async SignUp() {
    navigate('/register');
  },

  async forgotPassword() {
    navigate('/forgot-password');
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