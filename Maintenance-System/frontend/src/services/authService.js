import { api } from './api.js';

export class authService {
  async login(email, password) {
    const data = await api.post('/login', { email, password });

    if (data?.token) {
      localStorage.setItem('token', data.token);
    }

    return data;
  }

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated() {
    return Boolean(localStorage.getItem('token'));
  }
}