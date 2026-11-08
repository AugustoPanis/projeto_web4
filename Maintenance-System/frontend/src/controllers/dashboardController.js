import { DashboardView } from '../views/dashboardView.js';
import { ToastView } from '../views/ToastView.js';
import { ToolbarView } from '../views/ToolbarView.js';
import { GridView } from '../views/GridView.js';
import { NavView } from '../views/NavView.js';
import { equipmentService } from '../services/equipmentService.js';
import { authService } from '../services/authService.js';
import { getFriendlyErrorMessage } from '../utils/errorMessages.js';
import { navigate } from '../router/router.js';


export const dashboardController = {
  init() {
    this.view = new DashboardView();
    this.toast = new ToastView();
    this.toolbarView = new ToolbarView();
    this.gridView = new GridView();
    this.navView = new NavView();
    this.bindEvents();
  },

  bindEvents() {
    this.toolbarView.search((search) => this.searchEquipment(search));
    this.navView.bindNavClick((route) => navigate(route));
    this.navView.bindlogoutClick(() => this.logout());
    this.toLoadEquipments();
  },
  async logout() {
    try {
      await authService.logout();
      navigate('/login', true);
    } catch (err) {
      this.toast.error(getFriendlyErrorMessage(err.code));
    }
  },

  async searchEquipment(search) {
    try {
      const equipments = await equipmentService.searchEquipment(search);
      this.view.toLoadEquipmentsTable(equipments);
    } catch (err) {
      console.error(err);
      this.toast.error(getFriendlyErrorMessage(err.code));
    }
  },

  async toLoadEquipments() {
    try {
      const equipments = await equipmentService.loadEquipments();

      this.view.toLoadEquipmentsTable(equipments);
      this.view.showEquipmentTotals({
        active: equipments.filter(e => e.status === 'Ativo').length,
        preventive: equipments.filter(e => e.status === 'Manutenção Preventiva').length,
        maintenance: equipments.filter(e => e.status === 'Em Manutenção').length,
      });
    } catch (err) {
      this.toast.error(getFriendlyErrorMessage(err.code));
    }
  },

  async checkAuth() {
    return authService.waitForAuth();
  },

};