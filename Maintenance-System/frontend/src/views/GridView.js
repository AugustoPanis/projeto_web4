export class GridView {
    constructor() {

        this.equipmentsTable = document.getElementById('equipmentsTable');
        this.saveEquipament = document.getElementById('saveEquipament');
        this.modalEl = document.getElementById('modalNovoEquipamento');
        this.modalTitle = document.getElementById('modalNovoEquipamentoLabel');
        this.form = document.getElementById('formNovoEquipamento');

    }

    bindRowEditSelect(handler) {
        this.equipmentsTable.addEventListener('dblclick', (e) => {
            const row = e.target.closest('tr');
            if (!row) return;

            this.clearSelection();
            row.classList.add('table-active');
            handler(row.dataset.id);
        });
    }

    bindRowSelect(handler) {
        this.equipmentsTable.addEventListener('click', (e) => {
            const row = e.target.closest('tr');
            if (!row) return;
            if (e.detail > 1) return;


            const lineSelect = row.classList.contains('table-active');
            this.clearSelection();

            if (lineSelect) {
                handler(null);
                return;
            }

            row.classList.add('table-active');
            handler(row.dataset.id);
        });
    }

    clearSelection() {
        this.equipmentsTable
            .querySelectorAll('tr.table-active')
            .forEach((r) => r.classList.remove('table-active'));
    }
    bindModalReset() {
        this.modalEl.addEventListener('hidden.bs.modal', () => {
            this.form.reset();
        });
    }
    closeModal() {
        document.activeElement?.blur();

        bootstrap.Modal.getInstance(this.modalEl)?.hide();
    }
    openModal() {
        bootstrap.Modal.getOrCreateInstance(this.modalEl).show();
    }

    setModalMode(isEditing) {
        this.modalTitle.textContent = isEditing ? 'Editar Equipamento' : 'Novo Equipamento';
        this.saveEquipament.textContent = isEditing ? 'Atualizar' : 'Salvar';
    }
}