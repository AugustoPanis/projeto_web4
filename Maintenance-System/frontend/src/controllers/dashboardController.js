import { DashboardView } from '../views/dashboardView.js';
import { dashboardService } from '../services/dashboardService.js';

export const dashboardController = {
  view: null,
  init() {
    this.view = new DashboardView();
    this.toLoadEquipments();
    this.bindEvents();
  },

  bindEvents() {

    this.view.searchEquipment((search) => this.searchEquipment({ search }));
  },

  async toLoadEquipments() {
    try {
      const equipments = await dashboardService.loadEquipments();
      this.view.toLoadEquipments(equipments);
    }
    catch (err) {
      this.view.showError(err.message || 'Erro ao carregar equipamentos');
    }
  },
  
  async toLoadEquipmentsTable(equipments) {
    try {
      const equipments = await dashboardService.loadEquipmentsTable();
      this.view.toLoadEquipmentsTable(equipments);
    } catch (error) {
      this.view.showError(error.message || 'Erro ao carregar tabela de equipamentos');
    }
  },

  async searchEquipment(search) {
    try {
       await dashboardService.searchEquipment(search);
    } catch (err) {
      this.view.showError(err.message || 'Erro ao buscar equipamentos');
    }
  }

};