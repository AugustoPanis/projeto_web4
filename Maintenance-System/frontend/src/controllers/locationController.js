
import { LocationView } from '../views/LocationView.js';
import { ToolbarView } from '../views/ToolbarView.js';
import { ToastView } from '../views/ToastView.js';
import { ModalView } from '../views/ModalView.js';
import { NavView } from '../views/NavView.js';
import { GridView } from '../views/GridView.js';
import { locationService } from '../services/locationService.js';
import { viaCepService } from '../services/viaCepService.js';
import { authService } from '../services/authService.js';
import { getFriendlyErrorMessage } from '../utils/errorMessages.js';
import { navigate } from '../router/router.js';

export const locationController = {
  selectedId: null,
  editingId: null,

  init() {
    this.locationView = new LocationView();
    this.ToolbarView = new ToolbarView();
    this.gridView = new GridView();
    this.navView = new NavView();
    this.modalView = new ModalView();
    this.toast = new ToastView();
    this.bindEvents();
  },

  bindEvents() {
    this.locationView.createLocation((data) => this.create(data));
    this.locationView.newLocation(() => { this.editingId = null; this.modalView.openModal(); });
    this.ToolbarView.bindEditClick(() => {this.edit(this.selectedId); this.editingId = this.selectedId;});
    this.gridView.bindRowEditSelect((id) => { this.editingId = id; this.edit(id); });
    this.gridView.bindRowSelect((id) => { this.selectedId = id; });
    this.ToolbarView.bindDeleteClick(() => this.delete());
    this.ToolbarView.search((search) => this.searchLocation(search));
    this.locationView.searchLocationForCep((cep) => this.searchLocationForCep(cep));
    this.toLoadLocationTable();
    this.modalView.bindModalReset();
    this.navView.bindNavClick((route) => navigate(route));
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
  
  async searchLocationForCep(cep) {
    try {
      const location = await viaCepService.searchLocation(cep);
      this.locationView.fillFormReturnApi(location);
    } catch (err) {
      console.log(err);
      this.toast.error(getFriendlyErrorMessage(err.code));
    }
  },

  async searchLocation(search) {
    try {
      const location = await locationService.searchLocation(search);
      this.locationView.toLoadLocationTable(location);
    } catch (err) {
      console.log(err);
      this.toast.error(getFriendlyErrorMessage(err.code));
    }
  },

  async edit(id) {
    if (!id) {
      this.toast.error('Selecione uma localização para editar.');
      return;
    }
    try {
      const location = await locationService.getById(id);
      this.editingId = id;
      this.locationView.fillForm(location);
      this.modalView.setModalMode(true);
      this.modalView.openModal();
    } catch (err) {
      console.log(err);
      this.toast.error(getFriendlyErrorMessage(err.code));
    }
  },

  async delete() {
    if (!this.selectedId) {
      this.toast.error('Selecione uma localização para excluir.');
      return;
    }
    if (!confirm('Deseja excluir essa localização?')) return;

    try {
      await locationService.delete(this.selectedId);
      this.selectedId = null;
      this.toast.success('Localização excluída com sucesso!');
      await this.toLoadLocationTable();
    } catch (err) {
      this.toast.error(getFriendlyErrorMessage(err.code));
    }
  },

  async create(location) {
    if (!this.modalView.isFormValid()) return;
    try {
      if (this.editingId) {
        await locationService.put(this.editingId, location);
        this.toast.success('Localização atualizada com sucesso!');
      } else {
        await locationService.post(location);
        this.toast.success('Localização cadastrada com sucesso!');
      }
      this.modalView.closeModal();
      await this.toLoadLocationTable();
    } catch (err) {
      this.toast.error(getFriendlyErrorMessage(err.code));
    }
  },

  async toLoadLocationTable() {
    try {
      const locations = await locationService.getAll();
      this.locationView.toLoadLocationTable(locations);
    } catch (err) {
      this.toast.error(getFriendlyErrorMessage(err.code));
    }
  },

  async checkAuth() {
    return authService.waitForAuth();
  },
};