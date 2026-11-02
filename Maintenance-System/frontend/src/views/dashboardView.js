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

    bindNavClick(handler) {
        document.querySelectorAll('[data-route]').forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                handler(link.dataset.route);
            });
        });
    }

}


