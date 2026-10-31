import { api } from './api.js';

export const equipmentService = {

  async searchEquipment(search) {
    const query = search ? `?term=${encodeURIComponent(search)}` : '';
    const data = await api.get(`/equipament${query}`);
    return data;
  },

  async loadEquipments() {
    const data = await api.get('/equipament');
    return data;
  },
  async getById(id) {
    const data = await api.get(`/equipament/${id}`);
    return data;
  },
  async createEquipament(equipament) {
    const data = await api.post('/equipament', equipament);
    return data;
  },
  async deleteEquipament(id) {
    const data = await api.delete(`/equipament/${id}`);
    return data;
  }, 
    async putEquipament(id, equipament) {
    const data = await api.put(`/equipament/${id}`, equipament);
    return data;
  }, 

};