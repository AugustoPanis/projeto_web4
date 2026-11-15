import { api } from './api.js';

export const categoryService = {

  async searchCategory(search) {
    const query = search ? `?term=${encodeURIComponent(search)}` : '';
    const data = await api.get(`/category${query}`);
    return data;
  },

  async getAll() {
    const data = await api.get('/category');
    return data;
  },
  async getById(id) {
    const data = await api.get(`/category/${id}`);
    return data;
  },
  async post(equipament) {
    const data = await api.post('/category', equipament);
    return data;
  },
  async delete(id) {
    const data = await api.delete(`/category/${id}`);
    return data;
  }, 
    async put(id, equipament) {
    const data = await api.put(`/category/${id}`, equipament);
    return data;
  }, 

};
