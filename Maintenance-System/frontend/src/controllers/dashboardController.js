import { DashboardView } from '../views/dashboardView.js';
import { dashboardService } from '../services/dashboardService.js';
import { authService } from '../services/authService.js';
import { getFriendlyErrorMessage } from '../utils/errorMessages.js';

export const dashboardController = {
  view: null,
  init() {
    this.view = new DashboardView();
    this.toLoadEquipments();
    this.bindEvents();
  },

  bindEvents() {
    this.view.searchEquipmentForButton((search) => this.searchEquipment(search));
  },

  async searchEquipment(search) {
    try {
      await dashboardService.searchEquipment(search);
              this.view.toLoadEquipmentsTable(equipments);
    } catch (err) {
      // this.view.showError(err.message || 'Erro ao buscar equipamentos');
    }
  },

  async checkAuth() {
    return authService.waitForAuth();
  },

  async toLoadEquipments() {
    try {
      const equipments = await dashboardService.loadEquipments();
      this.view.toLoadEquipments(equipments);
    }
    catch (err) {
      // this.view.showError(getFriendlyErrorMessage(err.code));
    }
  },

  async toLoadEquipmentsTable(equipments) {
    try {
      const equipments = await dashboardService.loadEquipmentsTable();
      this.view.toLoadEquipmentsTable(equipments);
    } catch (error) {
      // this.view.showError(error.message || 'Erro ao carregar tabela de equipamentos');
    }
  },



};