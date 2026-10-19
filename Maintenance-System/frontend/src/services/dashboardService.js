import { api } from './api.js';

export const dashboardService = {

  async searchEquipment(search) {
    console.log('2. Valor recebido no service:', search);
    const data = await api.get('/equipament', search );
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