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

    createEquipament(handler) {
        this.saveEquipament.addEventListener('submit', (execute) => {
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


