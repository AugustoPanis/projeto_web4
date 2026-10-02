import { authService } from './authService.js';
import { LoginView } from '../views/loginView.js';

export const loginController = {
  view: new LoginView(),

  init() {
    this.view.render();
    this.bindEvents();
  },

  bindEvents() {
    this.view.bindSubmit((credentials) => this.handleLogin(credentials));
  },

  async handleLogin(credentials) {
    this.view.setLoading(true);

    try {
      await authService.login(credentials);
      window.location.href = '/dashboard.html';
    } catch (err) {
      this.view.showError(err.message || 'Falha na autenticação');
    }
  }
};