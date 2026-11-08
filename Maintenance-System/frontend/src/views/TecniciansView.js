export class TechniciansView {
    constructor() {
        this.table = document.getElementById('table');
        this.name = document.getElementById('name');
        this.email = document.getElementById('email');
        this.specialty = document.getElementById('specialty');
        this.saveTecnician = document.getElementById('save');    
    }

    createTechnician(handler) {
        this.saveTecnician.addEventListener('click', (execute) => {
            execute.preventDefault();
            const name = this.name.value;
            const email = this.email.value;
            const specialty = this.specialty.value;

            handler({ name, email, specialty });
        });
    }

    toLoadTechniciansTable(technicians) {
        this.table.innerHTML = '';

        technicians.forEach((technician) => {
            const row = document.createElement('tr');
            row.dataset.id = technician.id;
            row.innerHTML = `
                <td>${technician.name}</td>
                <td>${technician.specialty}</td>
                <td>${technician.email}</td>
            `;
            this.table.appendChild(row);
        });
    }

    fillForm(equipment) {
        this.name.value = equipment.name;
        this.email.value = equipment.email;
        this.specialty.value = equipment.specialty;
    }
}