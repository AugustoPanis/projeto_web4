export class EquipamentView {
    constructor() {

        this.equipmentsTable = document.getElementById('equipmentsTable');
        this.saveEquipament = document.getElementById('saveEquipament');
        this.statusEquipment = document.getElementById('statusEquipment');
        this.nameEquipament = document.getElementById('nameEquipment');
        this.dateAcquisition = document.getElementById('dateAcquisition');
        this.locationEquipment = document.getElementById('locationEquipment');
        this.patrymony = document.getElementById('patrymony');
    }

    bindNavClick(handler) {
        document.querySelectorAll('nav a[href]').forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                handler(link.getAttribute('href'));
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

}


