export class DashboardView {
    constructor() {
        this.activesTotal = document.getElementById('activesTotal');
        this.preventiveTotal = document.getElementById('preventiveTotal');
        this.maintenanceTotal = document.getElementById('maintenanceTotal');
    }

    showEquipmentTotals({ active, preventive, maintenance }) {
        this.activesTotal.textContent = active;
        this.preventiveTotal.textContent = preventive;
        this.maintenanceTotal.textContent = maintenance;
    }
}