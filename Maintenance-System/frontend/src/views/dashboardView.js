export class DashboardView {
    constructor() {
        this.searchForm = document.getElementById('search-form');
        this.searchInput = document.getElementById('searchInput');
        this.searchButton = document.getElementById('searchButton');
        this.equipmentsTable = document.getElementById('equipmentsTable');

        this.activesTotal = document.getElementById('activesTotal');
        this.preventiveTotal = document.getElementById('preventiveTotal');
        this.maintenanceTotal = document.getElementById('maintenceEquipamentsTotal');
    }

    searchEquipmentForButton(handler) {
        this.searchButton.addEventListener('click', (execute) => {
            execute.preventDefault();


            const search = this.searchInput.value;
            handler(search);
        });
    }

    toLoadEquipmentsTable(equipments) {
        this.equipmentsTable.innerHTML = '';

        equipments.forEach((equipment) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${equipment.name}</td>
                <td>${equipment.status}</td>
            `;
            this.equipmentsTable.appendChild(row);
        });
    }

    showEquipmentTotals({ active, preventive, maintenance }) {
        this.activesTotal.textContent = active;
        this.preventiveTotal.textContent = preventive;
        this.maintenanceTotal.textContent = maintenance;
    }

}


