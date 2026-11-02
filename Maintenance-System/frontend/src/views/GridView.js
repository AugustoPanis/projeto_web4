export class GridView {
    constructor() {
        this.equipmentsTable = document.getElementById('equipmentsTable');
        this.form = document.getElementById('formNovoEquipamento');
    }

    clearSelection() {
        this.equipmentsTable
            .querySelectorAll('tr.table-active')
            .forEach((r) => r.classList.remove('table-active'));
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

    bindRowEditSelect(handler) {
        this.equipmentsTable.addEventListener('dblclick', (e) => {
            const row = e.target.closest('tr');
            if (!row) return;

            this.clearSelection();
            row.classList.add('table-active');
            handler(row.dataset.id);
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