import { DashboardView } from '../views/dashboardView.js';
import { dashboardService } from '../services/dashboardService.js';
import { authService } from '../services/authService.js';
import { getFriendlyErrorMessage } from '../utils/errorMessages.js';
import { navigate } from '../router/router.js';


export const dashboardController = {
  view: null,
  init() {
    this.view = new DashboardView();
    this.toLoadEquipments();
    this.bindEvents();

  },

  bindEvents() {
    this.view.searchEquipmentForButton((search) => this.searchEquipment(search));
    this.view.bindNavClick((route) => navigate(route));

  },

  async searchEquipment(search) {
    try {
      const equipments = await dashboardService.searchEquipment(search);
      this.view.toLoadEquipmentsTable(equipments);
    } catch (err) {
      this.view.showError(getFriendlyErrorMessage(err.code));

    }
  },

  async toLoadEquipments() {
    try {
      const equipments = await dashboardService.loadEquipments();

      this.view.toLoadEquipmentsTable(equipments);
      this.view.showEquipmentTotals({
        active: equipments.filter(e => e.status === 'ATIVO').length,
        preventive: equipments.filter(e => e.status === 'PREVENTIVA').length,
        maintenance: equipments.filter(e => e.status === 'MANUTENCAO').length,
      });
    } catch (err) {
      this.view.showError(getFriendlyErrorMessage(err.code));
    }
  },

  async checkAuth() {
    return authService.waitForAuth();
  },

};