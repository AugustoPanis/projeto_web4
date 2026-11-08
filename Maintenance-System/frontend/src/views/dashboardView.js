export class DashboardView {
    constructor() {
        this.activesTotal = document.getElementById('activesTotal');
        this.preventiveTotal = document.getElementById('preventiveTotal');
        this.maintenanceTotal = document.getElementById('maintenanceTotal');
        this.table = document.getElementById('table');
        this.statusEquipment = document.getElementById('statusEquipment');
        this.nameEquipament = document.getElementById('nameEquipment');
        this.dateAcquisition = document.getElementById('dateAcquisition');
        this.locationEquipment = document.getElementById('locationEquipment');
        this.patrymony = document.getElementById('patrymony');
    }

    showEquipmentTotals({ active, preventive, maintenance }) {
        this.activesTotal.textContent = active;
        this.preventiveTotal.textContent = preventive;
        this.maintenanceTotal.textContent = maintenance;
    }

    toLoadEquipmentsTable(equipments) {
        this.table.innerHTML = '';

        equipments.forEach((equipment) => {
            const row = document.createElement('tr');
            row.dataset.id = equipment.id;
            row.innerHTML = `
                <td>${equipment.name}</td>
                <td>${equipment.local}</td>
                <td>${equipment.status}</td>
            `;
            this.table.appendChild(row);
        });
    }
}