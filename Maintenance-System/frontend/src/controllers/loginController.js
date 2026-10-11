import { authService } from '../services/authService.js';
import { LoginView } from '../views/loginView.js';
import { navigate } from '../router/router.js';

export const loginController = {
  view: null,
  init() {
    this.view = new LoginView();
    this.bindEvents();
  },

  bindEvents() {
    this.view.bindSignIn((credentials) => this.singIn(credentials));
    this.view.bindSingUpClick((credentials) => this.SingUp(credentials));
  },

  async SingUp(credentials ) {
    try {
      await authService.singUp(credentials);
    } catch (err) {
      this.view.showError(err.message || 'Falha na autenticação');
    }
  },

  async singIn(credentials) {
    try {
      await authService.singIn(credentials);
      navigate('/dashboard');
    } catch (err) {
      this.view.showError(err.message || 'Falha na autenticação');
    }
  },

  async logout() {
    try {
      await authService.logout();
      navigate('/login');
    } catch (err) {
      console.error('Erro ao encerrar sessão:', err);
    }
  },

  async checkAuth() {
    return authService.waitForAuth();
  }


};