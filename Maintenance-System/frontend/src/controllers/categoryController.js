
import { CategoryView } from '../views/CategoryView.js';
import { ToolbarView } from '../views/ToolbarView.js';
import { ToastView } from '../views/ToastView.js';
import { ModalView } from '../views/ModalView.js';
import { NavView } from '../views/NavView.js';
import { GridView } from '../views/GridView.js';
import { categoryService } from '../services/categoryService.js';
import { authService } from '../services/authService.js';
import { getFriendlyErrorMessage } from '../utils/errorMessages.js';
import { navigate } from '../router/router.js';

export const categoryController = {
  selectedId: null,
  editingId: null,

  init() {
    this.categoryView = new CategoryView();
    this.ToolbarView = new ToolbarView();
    this.gridView = new GridView();
    this.navView = new NavView();
    this.modalView = new ModalView();
    this.toast = new ToastView();
    this.bindEvents();
  },

  bindEvents() {
    this.categoryView.createCategory((data) => this.create(data));
    this.categoryView.newCategoryButton(() => { this.editingId = null; this.modalView.openModal(); });
    this.gridView.bindRowEditSelect((id) => { this.editingId = id; this.edit(id); });
    this.ToolbarView.bindEditClick(() => { this.edit(this.selectedId); this.editingId = this.selectedId; });
    this.gridView.bindRowSelect((id) => { this.selectedId = id; });
    this.ToolbarView.bindDeleteClick(() => this.delete());
    this.ToolbarView.search((search) => this.searchCategory(search));
    this.toLoadCategoryTable();
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

  async searchCategory(search) {
    try {
      const category = await categoryService.searchCategory(search);
      this.categoryView.toLoadCategoryTable(category);
    } catch (err) {
      this.toast.error(getFriendlyErrorMessage(err.code));
    }
  },

  async edit(id) {
    if (!id) {
      this.toast.error('Selecione uma categoria para editar.');
      return;
    }
    try {
      const category = await categoryService.getById(id);
      this.editingId = id;
      this.categoryView.fillForm(category);
      this.modalView.setModalMode(true);
      this.modalView.openModal();
    } catch (err) {
      console.log(err);
      this.toast.error(getFriendlyErrorMessage(err.code));
    }
  },

  async delete() {
    if (!this.selectedId) {
      this.toast.error('Selecione uma categoria para excluir.');
      return;
    }
    if (!confirm('Deseja excluir essa categoria?')) return;

    try {
      await categoryService.delete(this.selectedId);
      this.selectedId = null;
      this.toast.success('Categoria excluído com sucesso!');
      await this.toLoadCategoryTable();
    } catch (err) {
      this.toast.error(getFriendlyErrorMessage(err.code));
    }
  },

  async create(category) {
    try {
      if (this.editingId) {
        await categoryService.put(this.editingId, category);
        this.toast.success('Categoria atualizada com sucesso!');
        this.editingId = null;
      } else {
        await categoryService.post(category);
        this.toast.success('Categoria cadastrada com sucesso!');
      }
      this.modalView.closeModal();
      await this.toLoadCategoryTable();
    } catch (err) {
      this.toast.error(getFriendlyErrorMessage(err.code));
    }
  },

  async toLoadCategoryTable() {
    try {
      const categorys = await categoryService.getAll();
      this.categoryView.toLoadCategoryTable(categorys);
    } catch (err) {
      this.toast.error(getFriendlyErrorMessage(err.code));
    }
  },

  async checkAuth() {
    return authService.waitForAuth();
  },
};