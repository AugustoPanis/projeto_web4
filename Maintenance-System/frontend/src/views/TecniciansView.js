export class TechniciansView {
    constructor() {
        this.table = document.getElementById('table');
        this.name = document.getElementById('name');
        this.email = document.getElementById('email');
        this.specialty = document.getElementById('specialty');
        this.phone = document.getElementById('phone');
        this.saveTecnician = document.getElementById('save');    
    }

    createTechnician(handler) {
        this.saveTecnician.addEventListener('click', (execute) => {
            execute.preventDefault();
            const name = this.name.value;
            const email = this.email.value;
            const specialty = this.specialty.value;
            const phone = this.phone.value;

            handler({ name, email, specialty, phone });
        });
    }

    toLoadTechniciansTable(technicians) {
        this.table.innerHTML = '';

        technicians.forEach((technician) => {
            const row = document.createElement('tr');
            row.dataset.id = technician.id;
            row.innerHTML = `
                <td>${technician.name}</td>
                <td>${technician.email}</td>
                <td>${technician.phone}</td>
                <td>${technician.specialty}</td>

            `;
            this.table.appendChild(row);
        });
    }

    fillForm(equipment) {
        this.name.value = equipment.name;
        this.specialty.value = equipment.specialty;
        this.email.value = equipment.email;
        this.phone.value = equipment.phone;
    }
}