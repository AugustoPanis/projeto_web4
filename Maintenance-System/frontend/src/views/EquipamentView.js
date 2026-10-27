export class EquipamentView {
    constructor() {
        this.searchForm = document.getElementById('search-form');
        this.searchInput = document.getElementById('searchInput');
        this.searchButton = document.getElementById('searchButton');
        this.equipmentsTable = document.getElementById('equipmentsTable');
        this.saveEquipament = document.getElementById('saveEquipament');
        this.statusEquipment = document.getElementById('statusEquipment');
        this.nameEquipament = document.getElementById('nameEquipment');
        this.dateAcquisition = document.getElementById('dateAcquisition');
        this.locationEquipment = document.getElementById('locationEquipment');
        this.patrymony = document.getElementById('patrymony');
        this.deleteButton = document.getElementById('deleteButton');
        this.modalEl = document.getElementById('modalNovoEquipamento');
        this.form = document.getElementById('formNovoEquipamento');

    }
    createEquipament(handler) {
        this.saveEquipament.addEventListener('click', (execute) => {
            execute.preventDefault();
            const name = this.nameEquipament.value;
            const status = this.statusEquipment.value;
            const patrymony = this.patrymony.value;
            const local = this.locationEquipment.value;
            const acquisitionDate = this.dateAcquisition.value;

            handler({ name, status, local, acquisitionDate, patrymony });

        });
    }
    bindModalReset() {
        this.modalEl.addEventListener('hidden.bs.modal', () => {
            this.form.reset();
        });
    }
    closeModal() {
        bootstrap.Modal.getInstance(this.modalEl)?.hide();
    }
    bindRowSelect(handler) {
        this.equipmentsTable.addEventListener('click', (e) => {
            const row = e.target.closest('tr');
            if (!row) return;

            const lineSelect = row.classList.contains('table-active');

            this.equipmentsTable
                .querySelectorAll('tr.table-active')
                .forEach((r) => r.classList.remove('table-active'));

            if (lineSelect) {
                handler(null);
                return;
            }

            row.classList.add('table-active');
            handler(row.dataset.id);
        });
    }

    bindDeleteClick(handler) {
        this.deleteButton.addEventListener('click', handler);
    }

    bindNavClick(handler) {
        document.querySelectorAll('[data-route]').forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                handler(link.dataset.route);
            });
        });
    }
    searchEquipmentForButton(handler) {
        this.searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handler(this.searchInput.value);
        });
    }
    toLoadEquipmentsTable(equipments) {
        this.equipmentsTable.innerHTML = '';

        equipments.forEach((equipment) => {
            const row = document.createElement('tr');
            row.dataset.id = equipment.id;
            row.innerHTML = `
                <td>${equipment.name}</td>
                <td>${equipment.local}</td>
                <td>${equipment.status}</td>
            `;
            this.equipmentsTable.appendChild(row);
        });
    }
}


