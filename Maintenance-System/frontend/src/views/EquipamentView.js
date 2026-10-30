export class EquipamentView {
    constructor() {

        this.equipmentsTable = document.getElementById('equipmentsTable');
        this.saveEquipament = document.getElementById('saveEquipament');
        this.statusEquipment = document.getElementById('statusEquipment');
        this.nameEquipament = document.getElementById('nameEquipment');
        this.dateAcquisition = document.getElementById('dateAcquisition');
        this.locationEquipment = document.getElementById('locationEquipment');
        this.patrymony = document.getElementById('patrymony');
        this.modalEl = document.getElementById('modalNovoEquipamento');
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
        bootstrap.Modal.getInstance(this.modalEl)?.hide();
    }
    openModal() {
        bootstrap.Modal.getOrCreateInstance(this.modalEl).show();
    }





        bindNavClick(handler) {
        document.querySelectorAll('[data-route]').forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                handler(link.dataset.route);
            });
        });
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

    fillForm(equipment) {
        this.nameEquipament.value = equipment.name;
        this.statusEquipment.value = equipment.status;
        this.patrymony.value = equipment.patrymony;
        this.locationEquipment.value = equipment.local;
        this.dateAcquisition.value = equipment.acquisitionDate; // formato YYYY-MM-DD
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


