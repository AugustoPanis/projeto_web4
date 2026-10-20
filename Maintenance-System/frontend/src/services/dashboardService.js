import { api } from './api.js';

export const dashboardService = {

  async searchEquipment(search) {

    const query = search ? `?term=${encodeURIComponent(search)}` : '';
    const data = await api.get(`/equipament${query}` );
    return data;
  },
  
  async loadEquipments() {

    const data = await api.get('/equipament');
    return data;
  },

  async loadEquipmentsTable() {

    const data = await api.get('/equipment/table');
    return data;
  }
};