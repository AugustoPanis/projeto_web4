import { api } from '../services/api.js';
import { loginView } from '../views/loginView.js';

export const loginController = {
  async init() {
    this.bindEvents();
    await this.loadUsers();
  },

  bindEvents() {
    loginView.elements.form.addEventListener('submit', (e) => this.handleSubmit(e));
  },

  async loadUsers() {
    try {
      const users = await api.get('/users');
      loginView.renderUsers(users);
    } catch (err) {
      loginView.showFeedback(err.message, 'error');
    }
  },

  async handleSubmit(event) {
    event.preventDefault();
    const payload = loginView.getFormData();

    loginView.setLoading(true);

    try {
      await api.post('/users', payload);
      loginView.showFeedback('Cadastrado com sucesso!', 'success');
      loginView.resetForm();
      await this.loadUsers(); // Atualiza a listagem
    } catch (err) {
      loginView.showFeedback(err.message, 'error');
    } finally {
      loginView.setLoading(false);
    }
  }
};