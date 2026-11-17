import { api } from './api.js';

export const workOrderService = {

  async searchWorkOrder(search) {
    const query = search ? `?term=${encodeURIComponent(search)}` : '';
    const data = await api.get(`/workorder${query}`);
    return data;
  },

  async getAll() {
    const data = await api.get('/workorder');
    return data;
  },
  async getById(id) {
    const data = await api.get(`/workorder/${id}`);
    return data;
  },
  async create(workOrder) {
    const data = await api.post('/workorder', workOrder);
    return data;
  },
  async delete(id) {
    const data = await api.delete(`/workorder/${id}`);
    return data;
  }, 
    async put(id, workOrder) {
    const data = await api.put(`/workorder/${id}`, workOrder);
    return data;
  }, 

};