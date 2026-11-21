import { ToastView } from '../views/ToastView.js';
import { ToolbarView } from '../views/ToolbarView.js';
import { GridView } from '../views/GridView.js';
import { NavView } from '../views/NavView.js';
import { ModalView } from '../views/ModalView.js';
import { TechniciansView } from '../views/TecniciansView.js';
import { technicianService } from '../services/technicianService.js';
import { authService } from '../services/authService.js';
import { getFriendlyErrorMessage } from '../utils/errorMessages.js';
import { navigate } from '../router/router.js';


export const techniciansController = {
  editingId: null,
  selectedId: null,
  init() {
    this.techniciansView = new TechniciansView();
    this.toast = new ToastView();
    this.toolbarView = new ToolbarView();
    this.modalView = new ModalView();
    this.gridView = new GridView();
    this.navView = new NavView();
    this.bindEvents();
  },

  bindEvents() {
    this.techniciansView.createTechnician((technician) => this.createTechnician(technician));
    this.techniciansView.newTechnicianButton(() => {this.editingId = null; this.modalView.openModal();});
    this.gridView.bindRowEditSelect((id) => { this.editingId = id; this.editTechnician(id); });
    this.toolbarView.bindEditClick(() => {this.editTechnician(this.selectedId); this.editingId = this.selectedId;});
    this.gridView.bindRowSelect((id) => { this.selectedId = id; });
    this.toolbarView.bindDeleteClick(() => this.deleteTechnician(this.selectedId));
    this.toolbarView.search((search) => this.searchTecnicians(search));
    this.navView.bindNavClick((route) => navigate(route));
    this.navView.bindlogoutClick(() => this.logout());
    this.toLoadTechniciansTable();
    this.modalView.bindModalReset();
  },

  async logout() {
    try {
      await authService.logout();
      navigate('/login', true);
    } catch (err) {
      this.toast.error(getFriendlyErrorMessage(err.code));
    }
  },
  async editTechnician(id) {
    if (!id) {
      this.toast.error('Selecione um técnico para editar.');
      return;
    }

    try {
      const technician = await technicianService.getById(id);
      this.techniciansView.fillForm(technician);
      this.modalView.setModalMode(true);
      this.modalView.openModal();
    } catch (err) {
      console.error(err);
      this.toast.error(getFriendlyErrorMessage(err.code));
    }
  },

  async createTechnician(technician) {
    if (!this.modalView.isFormValid()) return;
    try {
      if (this.editingId) {
        await technicianService.putTecnician(this.editingId, technician);
        this.toast.success('Técnico atualizado com sucesso!');
        this.editingId = null;
      } else {
        await technicianService.createTechnician(technician);
        this.toast.success('Técnico criado com sucesso!');
      }
      this.modalView.closeModal();
      this.toLoadTechniciansTable();
    } catch (err) {
      console.error(err);
      this.toast.error(getFriendlyErrorMessage(err.code));
    }
  },

  async deleteTechnician(id) {
    if (!id) {
      this.toast.error('Selecione um técnico para excluir.');
      return;
    }

    try {
      await technicianService.deleteTechnician(id);
      this.toast.success('Técnico excluído com sucesso!');
      this.toLoadTechniciansTable();
    } catch (err) {
      console.error(err);
      this.toast.error(getFriendlyErrorMessage(err.code));
    }
  },

  async searchTecnicians(search) {
    try {
      const technicians = await technicianService.searchTecnician(search);
      this.techniciansView.toLoadTechniciansTable(technicians);
    } catch (err) {
      console.error(err);
      this.toast.error(getFriendlyErrorMessage(err.code));
    }
  },

  async toLoadTechniciansTable() {
    try {
      const technicians = await technicianService.getAll();
      this.techniciansView.toLoadTechniciansTable(technicians);
    } catch (err) {
      this.toast.error(getFriendlyErrorMessage(err.code));
    }
  },

  async checkAuth() {
    return authService.waitForAuth();
  },

};