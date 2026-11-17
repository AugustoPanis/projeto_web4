import { api } from './api.js';

export const workOrderService = {

  async searchWorkOrder(search) {
    const query = search ? `?term=${encodeURIComponent(search)}` : '';
    const data = await api.get(`/workOrder${query}`);
    return data;
  },

  async getAll() {
    const data = await api.get('/workOrder');
    return data;
  },
  async getById(id) {
    const data = await api.get(`/workOrder/${id}`);
    return data;
  },
  async create(workOrder) {
    const data = await api.post('/workOrder', workOrder);
    return data;
  },
  async delete(id) {
    const data = await api.delete(`/workOrder/${id}`);
    return data;
  }, 
    async put(id, workOrder) {
    const data = await api.put(`/workOrder/${id}`, workOrder);
    return data;
  }, 

};