
import { EquipamentView } from '../views/EquipamentView.js';
import { ToolbarView } from '../views/ToolbarView.js';
import { ToastView } from '../views/ToastView.js';
import { ModalView } from '../views/ModalView.js';
import { NavView } from '../views/NavView.js';
import { GridView } from '../views/GridView.js';
import { equipmentService } from '../services/equipmentService.js';
import { authService } from '../services/authService.js';
import { getFriendlyErrorMessage } from '../utils/errorMessages.js';
import { navigate } from '../router/router.js';

export const equipamentsController = {
  selectedId: null,

  init() {
    this.Equipamentview = new EquipamentView();
    this.ToolbarView = new ToolbarView();
    this.gridView = new GridView();
    this.navView = new NavView();
    this.modalView = new ModalView();
    this.toast = new ToastView();
    this.bindEvents();
  },

  bindEvents() {
    this.navView.bindNavClick((route) => navigate(route));
    this.Equipamentview.createEquipament((data) => this.createEquipament(data));
    this.gridView.bindRowSelect((id) => { this.selectedId = id; });
    this.gridView.bindRowEditSelect((id) => { this.selectedId = id; this.editEquipment(id); });
    this.ToolbarView.bindEditClick(() => this.editEquipment(this.selectedId));


    this.ToolbarView.search((search) => this.searchEquipment(search));
    this.ToolbarView.bindDeleteClick(() => this.deleteEquipment());
    this.toLoadEquipmentsTable();
    this.modalView.bindModalReset();
    this.navView.bindlogoutClick(() => this.logout());

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
      this.Equipamentview.toLoadEquipmentsTable(equipments);
    } catch (err) {
      this.toast.error(getFriendlyErrorMessage(err.code));
    }
  },

  async editEquipment(id) {
    if (!id) {
      this.toast.error('Selecione um equipamento para editar.');
      return;
    }

    try {
      const equipment = await equipmentService.getById(id);
      this.editingId = id;
      this.Equipamentview.fillForm(equipment);
      this.modalView.setModalMode(true);
      this.modalView.openModal();
    } catch (err) {
      console.error(err);
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
        this.toast.success('Equipamento atualizado com sucesso!');
      } else {
        await equipmentService.createEquipament(equipament);
        this.toast.success('Equipamento cadastrado com sucesso!');
      }
      this.modalView.closeModal();
      await this.toLoadEquipmentsTable();
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