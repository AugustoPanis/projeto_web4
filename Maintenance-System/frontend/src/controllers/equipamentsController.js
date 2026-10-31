import { EquipamentView } from '../views/EquipamentView.js';
import { ToastView } from '../views/ToastView.js';
import { equipmentService } from '../services/equipmentService.js';
import { authService } from '../services/authService.js';
import { getFriendlyErrorMessage } from '../utils/errorMessages.js';
import { navigate } from '../router/router.js';
import { ToolbarView } from '../views/ToolbarView.js';
import { GridView } from '../views/GridView.js';



export const equipamentsController = {
  Equipamentview: null,
  ToolbarView: null,
  gridView: null,
  toast: null,


  selectedId: null,

  init() {
    this.Equipamentview = new EquipamentView();
    this.ToolbarView = new ToolbarView();
    this.gridView = new GridView();
    this.toast = new ToastView();
    this.bindEvents();
  },

  bindEvents() {
    this.Equipamentview.bindNavClick((route) => navigate(route));
    this.Equipamentview.createEquipament((data) => this.createEquipament(data));
    this.gridView.bindRowSelect((id) => { this.selectedId = id; });
    this.gridView.bindRowEditSelect((id) => { this.selectedId = id; this.editEquipment(id); });
    this.ToolbarView.searchEquipmentForButton((search) => this.searchEquipment(search));
    this.ToolbarView.bindDeleteClick(() => this.deleteEquipment());
    this.ToolbarView.bindEditClick(() => this.editEquipmentForButton(this.selectedId));
    this.toLoadEquipmentsTable();
    this.gridView.bindModalReset();
  },

  async editEquipment(id) {
    try {
      const equipment = await equipmentService.getById(id);
      this.editingId = id;
      this.Equipamentview.fillForm(equipment);
      this.gridView.setModalMode(true);
      this.gridView.openModal();
    } catch (err) {
      this.toast.error(getFriendlyErrorMessage(err.code));
    }

  },
  async editEquipmentForButton(id) {
    if (!this.selectedId) {
      this.toast.error('Selecione um equipamento para editar.');
      return;
    }
    try {
      const equipment = await equipmentService.getById(id);
      this.editingId = id;
      this.Equipamentview.fillForm(equipment);
      this.gridView.setModalMode(true);
      this.gridView.openModal();
    } catch (err) {
      this.toast.error(getFriendlyErrorMessage(err.code));
    }

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
      if (this.editingId) {
        await equipmentService.putEquipament(this.editingId, equipament);
      } else {
        await equipmentService.createEquipament(equipament);
      }
      this.toast.success('Equipamento cadastrado com sucesso!');
      this.gridView.closeModal();
      await this.toLoadEquipmentsTable();
    } catch (err) {
      this.toast.error(getFriendlyErrorMessage(err.code));
    }
  },

  async searchEquipment(search) {
    try {
      const equipments = await equipmentService.searchEquipment(search);
      this.Equipamentview.toLoadEquipmentsTable(equipments);
    } catch (err) {
      this.toast.error(getFriendlyErrorMessage(err.code));
    }
  },

  async toLoadEquipmentsTable() {
    try {
      const equipments = await equipmentService.loadEquipments();
      this.Equipamentview.toLoadEquipmentsTable(equipments);
    } catch (err) {
      this.toast.error(getFriendlyErrorMessage(err.code));
    }
  },

  async checkAuth() {
    return authService.waitForAuth();
  },
};