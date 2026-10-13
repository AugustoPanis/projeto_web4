import { authService } from '../services/authService.js';
import { clientService } from '../services/clientService.js';
import { RegisterView } from '../views/registerView.js';
import { navigate } from '../router/router.js';

export const registerController = {
  view: null,
  init() {
    this.view = new RegisterView();
    this.bindEvents();
  },

  bindEvents() {
    this.view.bindSingUpClick((credentials) => this.SingUp(credentials));
  },

  async SingUp(credentials) {
    try {
      await clientService.clientCreate(credentials);
      this.view.showSuccess('Cadastro realizado com sucesso!');
      
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