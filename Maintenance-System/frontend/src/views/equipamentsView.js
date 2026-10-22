export class EquipamentsView {
    constructor() {
        this.searchForm = document.getElementById('search-form');
        this.searchInput = document.getElementById('searchInput');
        this.searchButton = document.getElementById('searchButton');
                this.equipmentsTable = document.getElementById('equipmentsTable');

        this.tecnicos = document.getElementById('tecnicos');
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
                <td>${equipment.local}</td>
                <td>${equipment.status}</td>
            `;
            this.equipmentsTable.appendChild(row);
        });
    }

}


