import { api } from './api.js';

export const dashboardService = {

  async searchEquipment(search) {

    const data = await api.get('/equipment', search );
    return data;
  },


};