import { EquipamentView } from '../views/EquipamentView.js';
import { ToastView } from '../views/ToastView.js';
import { equipmentService } from '../services/equipmentService.js';
import { authService } from '../services/authService.js';
import { getFriendlyErrorMessage } from '../utils/errorMessages.js';
import { navigate } from '../router/router.js';

export const equipamentsController = {
  view: null,
  toast: null,
  selectedId: null,

  init() {
    this.view = new EquipamentView();
    this.toast = new ToastView();
    this.bindEvents();
    this.toLoadEquipmentsTable();
    this.view.bindModalReset();
  },

  bindEvents() {
    this.view.bindNavClick((route) => navigate(route));
    this.view.createEquipament((data) => this.createEquipament(data));
    this.view.searchEquipmentForButton((search) => this.searchEquipment(search));
    this.view.bindRowSelect((id) => { this.selectedId = id; });
    this.view.bindDeleteClick(() => this.deleteEquipment());
  },

  async deleteEquipment() {
    if (!this.selectedId) {
      this.toast.error('Selecione um equipamento para excluir.');
      return;
    }
    if (!confirm('Deseja excluir este equipamento?')) return;

    try {
      await equipmentService.deleteEquipament(this.selectedId);
      this.selectedId = null;
      this.toast.success('Equipamento excluído com sucesso!');
      await this.toLoadEquipmentsTable();
    } catch (err) {
      this.toast.error(getFriendlyErrorMessage(err.code));
    }
  },

  async createEquipament(equipament) {
    try {
      await equipmentService.createEquipament(equipament);
      this.toast.success('Equipamento cadastrado com sucesso!');
      this.view.closeModal();
      await this.toLoadEquipmentsTable();
    } catch (err) {
      this.toast.error(getFriendlyErrorMessage(err.code));
    }
  },

  async searchEquipment(search) {
    try {
      const equipments = await equipmentService.searchEquipment(search);
      this.view.toLoadEquipmentsTable(equipments);
    } catch (err) {
      this.toast.error(getFriendlyErrorMessage(err.code));
    }
  },

  async toLoadEquipmentsTable() {
    try {
      const equipments = await equipmentService.loadEquipments();
      this.view.toLoadEquipmentsTable(equipments);
    } catch (err) {
      this.toast.error(getFriendlyErrorMessage(err.code));
    }
  },

  async checkAuth() {
    return authService.waitForAuth();
  },
};