export class EquipamentView {
    constructor() {

        this.table = document.getElementById('table');
        this.saveEquipament = document.getElementById('save');
        this.statusEquipment = document.getElementById('statusEquipment');
        this.nameEquipament = document.getElementById('nameEquipment');
        this.dateAcquisition = document.getElementById('dateAcquisition');
        this.locationEquipment = document.getElementById('locationEquipment');
        this.patrymony = document.getElementById('patrymony');
        this.loadLocation = document.getElementById('locationEquipment');
        this.loadCategory = document.getElementById('categoryEquipment');
    }

    createEquipament(handler) {
        this.saveEquipament.addEventListener('click', (execute) => {
            execute.preventDefault();
            const name = this.nameEquipament.value;
            const status = this.statusEquipment.value;
            const patrymony = this.patrymony.value;
            const local = this.locationEquipment.value;
            const acquisitionDate = this.dateAcquisition.value;
            const category = this.loadCategory.value;

            handler({ name, status, local, acquisitionDate, patrymony, category });

        });
    }

    toLoadEquipmentsTable(equipments) {
        this.table.innerHTML = '';

        equipments.forEach((equipment) => {
            const row = document.createElement('tr');
            row.dataset.id = equipment.id;
            row.innerHTML = `
                <td>${equipment.name}</td>
                <td>${equipment.patrymony}</td>
                <td>${equipment.category}</td>
                <td>${equipment.local}</td>
                <td>${equipment.status}</td>
            `;
            this.table.appendChild(row);
        });
    }

    toLoadLocationsForm(location) {
        location.forEach((location) => {
            const options = document.createElement('option');
            options.value = `${location.description} - ${location.city}`;
            options.textContent = `${location.description} - ${location.city}`;
            this.loadLocation.appendChild(options);
        });
    }

    toLoadCategoryForm(category) {
        category.forEach((category) => {
            const options = document.createElement('option');
            options.value = `${category.descriptionCategory}`;
            options.textContent = `${category.descriptionCategory}`;
            this.loadCategory.appendChild(options);
        });
    }

    fillForm(equipment) {
        this.nameEquipament.value = equipment.name;
        this.statusEquipment.value = equipment.status;
        this.patrymony.value = equipment.patrymony;
        this.locationEquipment.value = equipment.local;
        this.dateAcquisition.value = equipment.acquisitionDate
            ? equipment.acquisitionDate.slice(0, 10) : '';;
    }

}


