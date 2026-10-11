import { api } from './api.js';

export const dashboardService = {

  async searchEquipment(search) {

    const data = await api.get('/equipment', search );
    return data;
  },
  
  async loadEquipments() {

    const data = await api.get('/equipment');
    return data;
  },

  async loadEquipmentsTable() {

    const data = await api.get('/equipment/table');
    return data;
  }


};