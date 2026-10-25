import { EquipamentView } from '../views/EquipamentView.js';
import { equipmentService } from '../services/equipmentService.js';
import { authService } from '../services/authService.js';
import { getFriendlyErrorMessage } from '../utils/errorMessages.js';
import { navigate } from '../router/router.js';


export const equipamentsController = {
  view: null,
  selectedId: null,
  init() {
    this.view = new EquipamentView();
    this.bindEvents();
    this.toLoadEquipmentsTable();
  },

  bindEvents() {
    this.view.bindNavClick((route) => navigate(route));
    this.view.createEquipament((handler) => this.createEquipament(handler));
    this.view.searchEquipmentForButton((search) => this.searchEquipment(search));
    this.view.bindRowSelect((id) => { this.selectedId = id; });
    this.view.bindDeleteClick(() => this.deleteEquipment());
  },

  async deleteEquipment() {
    if (!this.selectedId) {
      this.view.showError('Selecione um equipamento para excluir.');
      return;
    }
    if (!confirm('Deseja excluir este equipamento?')) return;

    try {
      await equipmentService.deleteEquipament(this.selectedId);
      this.selectedId = null;
      this.view.clearError();
      this.view.showSuccess('Equipamento excluído com sucesso!');
      await this.toLoadEquipmentsTable();
    } catch (err) {
      this.view.showError(getFriendlyErrorMessage(err.code));
    }
  },

  async createEquipament(equipament) {
    try {
      const equipment = await equipmentService.createEquipament(equipament);
      this.view.showSuccess('Equipamento cadastrado com sucesso!');
      await this.toLoadEquipmentsTable();
      this.view.clearError();
    } catch (err) {
      console.error(err);
      this.view.showError(getFriendlyErrorMessage(err.code));
    }
  },

  async searchEquipment(search) {
    try {
      const equipments = await equipmentService.searchEquipment(search);
      this.view.toLoadEquipmentsTable(equipments);
    } catch (err) {
      this.view.showError(getFriendlyErrorMessage(err.code));
    }
  },

  async toLoadEquipmentsTable() {
    try {
      const equipments = await equipmentService.loadEquipments();
      this.view.toLoadEquipmentsTable(equipments);
    } catch (err) {
      this.view.showError(getFriendlyErrorMessage(err.code));
    }
  },

  async checkAuth() {
    return authService.waitForAuth();
  },

};