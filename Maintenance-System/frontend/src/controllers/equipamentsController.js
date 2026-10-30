import { EquipamentView } from '../views/EquipamentView.js';
import { ToastView } from '../views/ToastView.js';
import { equipmentService } from '../services/equipmentService.js';
import { authService } from '../services/authService.js';
import { getFriendlyErrorMessage } from '../utils/errorMessages.js';
import { navigate } from '../router/router.js';
import { ToolbarView } from '../views/ToolbarView.js';


export const equipamentsController = {
  Equipamentview: null,
  ToolbarView: null,
  toast: null,
  
  selectedId: null,

  init() {
    this.Equipamentview = new EquipamentView();
    this.ToolbarView = new ToolbarView();
    this.toast = new ToastView();
    this.bindEvents();
    this.toLoadEquipmentsTable();
    this.Equipamentview.bindModalReset();
  },

  bindEvents() {
    this.Equipamentview.bindNavClick((route) => navigate(route));
    this.Equipamentview.createEquipament((data) => this.createEquipament(data));
    this.Equipamentview.bindRowSelect((id) => { this.selectedId = id; });
    this.Equipamentview.bindRowEditSelect((id) => { this.selectedId = id; this.editEquipment(id); });
    this.ToolbarView.searchEquipmentForButton((search) => this.searchEquipment(search));
    this.ToolbarView.bindDeleteClick(() => this.deleteEquipment());
    this.ToolbarView.bindEditClick(() => this.editEquipment(this.selectedId));

  },

  async editEquipment(id) {
    try {
      const equipment = await equipmentService.getById(id);
      this.editingId = id;
      this.Equipamentview.fillForm(equipment);
      this.Equipamentview.openModal();
    } catch (err) {
        console.error(err);

      this.toast.error(getFriendlyErrorMessage(err.code));
    }

  },


  async deleteEquipment() {
    console.log(`${this.selectedID}`)
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
      this.Equipamentview.closeModal();
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