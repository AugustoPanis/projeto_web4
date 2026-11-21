
import { WorkOrderView } from '../views/WorkOrderView.js';
import { ToolbarView } from '../views/ToolbarView.js';
import { ToastView } from '../views/ToastView.js';
import { ModalView } from '../views/ModalView.js';
import { NavView } from '../views/NavView.js';
import { GridView } from '../views/GridView.js';
import { workOrderService } from '../services/workOrderService.js';
import { getFriendlyErrorMessage } from '../utils/errorMessages.js';
import { navigate } from '../router/router.js';
import { authService } from '../services/authService.js';
import { equipmentService } from '../services/equipmentService.js';
import { technicianService } from '../services/technicianService.js';

export const workOrderController = {
  selectedId: null,
  editingId: null,

  init() {
    this.workOrderView = new WorkOrderView();
    this.toolbarView = new ToolbarView();
    this.gridView = new GridView();
    this.navView = new NavView();
    this.modalView = new ModalView();
    this.toast = new ToastView();
    this.bindEvents();
  },

  bindEvents() {
    this.workOrderView.createWorkOrder((data) => this.create(data));
    this.workOrderView.newWorkOrderButton(() => {this.editingId = null; this.modalView.openModal();});
    this.toolbarView.bindEditClick(() => {this.edit(this.selectedId); this.editingId = this.selectedId;});
    this.gridView.bindRowEditSelect((id) => { this.editingId = id; this.edit(id); });
    this.gridView.bindRowSelect((id) => { this.selectedId = id; });
    this.toolbarView.bindDeleteClick(() => this.delete());
    this.toolbarView.search((search) => this.searchWorkOrder(search));
    this.modalView.bindModalReset();
    this.toLoadWorkOrderTable();
    this.toLoadEquipamentForm();
    this.toLoadTechnicianForm();
    this.navView.bindNavClick((route) => navigate(route));
    this.navView.bindlogoutClick(() => this.logout());
  },

  async toLoadEquipamentForm() {
    try {
      const equipments = await equipmentService.loadEquipments();
      this.workOrderView.toLoadEquipamentForm(equipments);
    } catch (err) {
      this.toast.error(getFriendlyErrorMessage(err.code));
    }
  },

  async toLoadTechnicianForm() {
    try {
      const technicians = await technicianService.getAll();
      this.workOrderView.toLoadTechnicianForm(technicians);
    } catch (err) {
      this.toast.error(getFriendlyErrorMessage(err.code));
    }
  },

  async logout() {
    try {
      await authService.logout();
      navigate('/login', true);
    } catch (err) {
      this.toast.error(getFriendlyErrorMessage(err.code));
    }
  },

  async searchWorkOrder(search) {
    try {
      const workOrder = await workOrderService.searchWorkOrder(search);
      this.workOrderView.toLoadWorkOrderTable(workOrder);
    } catch (err) {
      this.toast.error(getFriendlyErrorMessage(err.code));
    }
  },

  async edit(id) {
    if (!id) {
      this.toast.error('Selecione uma ordem de serviço para editar.');
      return;
    }
    try {
      const workOrder = await workOrderService.getById(id);
      this.editingId = id;
      this.workOrderView.fillForm(workOrder);
      this.modalView.setModalMode(true);
      this.modalView.openModal();
    } catch (err) {
      console.log(err);
      this.toast.error(getFriendlyErrorMessage(err.code));
    }
  },

  async delete() {
    if (!this.selectedId) {
      this.toast.error('Selecione uma ordem de serviço para excluir.');
      return;
    }
    if (!confirm('Deseja excluir essa ordem de serviço?')) return;

    try {
      await workOrderService.delete(this.selectedId);
      this.selectedId = null;
      this.toast.success('Ordem de serviço excluída com sucesso!');
      await this.toLoadWorkOrderTable();
    } catch (err) {
      this.toast.error(getFriendlyErrorMessage(err.code));
    }
  },

  async create(location) {
    if (!this.modalView.isFormValid()) return;
    try {
      if (this.editingId) {
        await workOrderService.put(this.editingId, location);
        this.toast.success('Ordem de serviço atualizada com sucesso!');
        this.editingId = null;
      } else {
        await workOrderService.create(location);
        this.toast.success('Ordem de serviço cadastrada com sucesso!');
      }
      this.modalView.closeModal();
      await this.toLoadWorkOrderTable();
    } catch (err) {
      this.toast.error(getFriendlyErrorMessage(err.code));
    }
  },

  async toLoadWorkOrderTable() {
    try {
      const workOrders = await workOrderService.getAll();
      for (const workOrder of workOrders) {
        const equipament = await equipmentService.getById(workOrder.equipament_id);
        const technician = await technicianService.getById(workOrder.technician_id);
        workOrder.equipament_id = equipament.name;
        workOrder.technician_id = technician.name;
      }
      this.workOrderView.toLoadWorkOrderTable(workOrders);
    } catch (err) {
      this.toast.error(getFriendlyErrorMessage(err.code));
    }
  },

  async checkAuth() {
    return authService.waitForAuth();
  },
};