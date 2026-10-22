import { EquipamentsView } from '../views/equipamentsView.js';
import { dashboardService } from '../services/dashboardService.js';
import { authService } from '../services/authService.js';
import { getFriendlyErrorMessage } from '../utils/errorMessages.js';
import { navigate } from '../router/router.js';


export const equipamentsController = {
  view: null,
  init() {
    this.view = new EquipamentsView();
    this.toLoadEquipmentsTable();
    this.bindEvents();

  },

  bindEvents() {
    this.view.searchEquipmentForButton((search) => this.searchEquipment(search));
    this.view.toLoadEquipmentsTable((equipaments) => this.toLoadEquipmentsTable(equipaments));
  },

  async searchEquipment(search) {
    try {
      const equipments = await dashboardService.searchEquipment(search);
      this.view.toLoadEquipmentsTable(equipments);
    } catch (err) {
      this.view.showError(getFriendlyErrorMessage(err.code));

    }
  },
  async toLoadEquipmentsTable() {
    try {
      const equipments = await dashboardService.loadEquipments();
      this.view.toLoadEquipmentsTable(equipments);
    } catch (err) {
      this.view.showError(getFriendlyErrorMessage(err.code));
    }
  },

  async checkAuth() {
    return authService.waitForAuth();
  },

};