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

    this.view.bindSubmit((credentials) => this.handleLogin(credentials));

  },

  async handleLogin(credentials) {

    try {

      // await authService.login(credentials);

      navigate('/dashboard');

    } catch (err) {

      this.view.showError(err.message || 'Falha na autenticação');

    }

  }

};