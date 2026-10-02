import { api } from '../services/api.js';
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
      const response = await api.post('/login', credentials);
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      window.location.href = '/dashboard.html';
    } catch (err) {
      this.view.showError(err.message || 'Credenciais inválidas');
    } finally {
      this.view.setLoading(false);
    }
  }
};