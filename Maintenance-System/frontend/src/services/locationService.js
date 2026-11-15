import { api } from './api.js';

export const locationService = {

  async searchLocation(search) {
    const query = search ? `?term=${encodeURIComponent(search)}` : '';
    const data = await api.get(`/location${query}`);
    return data;
  },

  async getAll() {
    const data = await api.get('/location');
    return data;
  },
  async getById(id) {
    const data = await api.get(`/location/${id}`);
    return data;
  },
  async post(equipament) {
    const data = await api.post('/location', equipament);
    return data;
  },
  async delete(id) {
    const data = await api.delete(`/location/${id}`);
    return data;
  }, 
    async put(id, equipament) {
    const data = await api.put(`/location/${id}`, equipament);
    return data;
  }, 

};
