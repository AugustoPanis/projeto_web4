import { authService } from '../services/authService.js';
import { clientService } from '../services/clientService.js';
import { RegisterView } from '../views/registerView.js';
import { navigate } from '../router/router.js';
import { getFriendlyErrorMessage } from '../utils/errorMessages.js';

export const registerController = {
  init() {
    this.view = new RegisterView();
    this.bindEvents();
  },

  bindEvents() {
    this.view.bindSingUpClick((handler) => this.SingUp(handler));
    this.view.bindSingInClick(() => this.SingIn());
  },

  async SingIn() {
    navigate('/login')
  },

  async SingUp(credentials) {
    try {
      await clientService.clientCreate(credentials);
      this.view.showSuccess('Cadastro realizado com sucesso!');
      await authService.singIn(credentials);
      navigate('/dashboard')

    } catch (err) {
      this.view.showError(getFriendlyErrorMessage(err.code));
    }
  },

  async checkAuth() {
    return authService.waitForAuth();
  },
};