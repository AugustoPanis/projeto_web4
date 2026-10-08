import { DashboardView } from '../views/dashboardView.js';
import { dashboardService } from '../services/dashboardService.js';

export const dashboardController = {

  view: null,

  init() {

    this.view = new DashboardView();

    this.bindEvents();

  },

  bindEvents() {

    this.view.searchEquipment((search) => this.searchEquipment({ search }));

  },

  async searchEquipment(search) {

    try {

      // await dashboardService.equipment(credentials);


    } catch (err) {

      this.view.showError(err.message || 'Falha na autenticação');

    }

  }

};