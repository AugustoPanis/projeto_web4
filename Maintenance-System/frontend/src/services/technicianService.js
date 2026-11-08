import { api } from './api.js';

export const technicianService = {

  async searchTecnician(search) {
    const query = search ? `?term=${encodeURIComponent(search)}` : '';
    const data = await api.get(`/technician${query}`);
    return data;
  },

  async getAll() {
    const data = await api.get('/technician');
    return data;
  },
  async getById(id) {
    const data = await api.get(`/technician/${id}`);
    return data;
  },
  async createTechnician(technician) {
    const data = await api.post('/technician', technician);
    return data;
  },
  async deleteTechnician(id) {
    const data = await api.delete(`/technician/${id}`);
    return data;
  }, 
    async putTecnician(id, tecnician) {
    const data = await api.put(`/technician/${id}`, tecnician);
    return data;
  }, 

};