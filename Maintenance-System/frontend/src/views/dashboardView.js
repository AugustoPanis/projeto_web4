export class DashboardView {

    constructor() {
        this.searchForm = document.getElementById('search-form');
        this.searchInput = document.getElementById('searchInput');
        this.activesTotal = document.getElementById('activesTotal');
        this.preventiveTotal = document.getElementById('preventiveTotal');
        this.maintenceEquipamentsTotal = document.getElementById('maintenceEquipamentsTotal');
        this.equipmentsTable = document.getElementById('equipmentsTable');
    }

    searchEquipment(handler) {
        this.searchForm.addEventListener('submit', (execute) => {
            
            execute.preventDefault();
            this.clearError();
            const search = this.searchInput.value;
            handler({ search });
        });
    }

    toLoadEquipments(equipments) {
        this.maintenceEquipamentsTotal.innerHTML = equipments.length;
    }

    toLoadEquipmentsTable(equipments) {
        this.equipmentsTable.innerHTML = '';

        equipments.forEach((equipment) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${equipment.name}</td>
                <td>${equipment.local}</td>
                <td>${equipment.status}</td>
            `;
            this.equipmentsTable.appendChild(row);
        });
    }
    
    clearError() {
        this.errorEl.textContent = '';
    }
}