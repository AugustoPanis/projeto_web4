import { api } from './api.js';

export const authService = {
  async login(credentials) {

    const data = await api.post('/login', credentials);
    
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  },

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/index.html';
  },

  isAuthenticated() {
    return Boolean(localStorage.getItem('token'));
  },

  getToken() {
    return localStorage.getItem('token');
  }
};