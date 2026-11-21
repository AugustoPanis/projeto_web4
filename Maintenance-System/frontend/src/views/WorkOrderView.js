export class WorkOrderView {
    constructor() {

        this.table = document.getElementById('table');
        this.saveEquipament = document.getElementById('save');
        this.description = document.getElementById("description");
        this.equipament = document.getElementById("equipament");
        this.technician = document.getElementById("technician");
        this.statusOs = document.getElementById("statusOs");
        this.priority = document.getElementById("priority");
        this.newWorkOrder = document.getElementById("newWorkOrder");

    }
    newWorkOrderButton(handler) {
        this.newWorkOrder.addEventListener('click', (execute) => {
            execute.preventDefault();
            handler();
        });
    }

    createWorkOrder(handler) {
        this.saveEquipament.addEventListener('click', (execute) => {
            execute.preventDefault();
            const description = this.description.value;
            const equipament_id = this.equipament.value;
            const technician_id = this.technician.value;
            const status = this.statusOs.value;
            const priority = this.priority.value;

            handler({ description, equipament_id, technician_id, status, priority });

        });
    }

    toLoadWorkOrderTable(workOrder) {
        this.table.innerHTML = '';

        workOrder.forEach((workOrder) => {
            const row = document.createElement('tr');
            row.dataset.id = workOrder.id;
            row.innerHTML = `
                <td>${workOrder.description}</td>
                <td>${workOrder.equipament_id}</td>
                <td>${workOrder.technician_id}</td>
                <td>${workOrder.status}</td>
                <td>${workOrder.priority}</td>
            `;
            this.table.appendChild(row);
        });
    }

    toLoadTechnicianForm(technician) {
        technician.forEach((technician) => {
            const option = document.createElement('option');
            option.value = technician.id;
            option.textContent = technician.name;
            this.technician.appendChild(option);
        });
    }


    toLoadEquipamentForm(equipament) {

        equipament.forEach((equipament) => {
            const option = document.createElement('option');
            option.value = equipament.id;
            option.textContent = equipament.name;
            this.equipament.appendChild(option);
        });
    }


    fillForm(workOrder) {
        this.description.value = workOrder.description;
        this.technician.value = workOrder.technician_id;
        this.equipament.value = workOrder.equipament_id;
        this.statusOs.value = workOrder.status;
        this.priority.value = workOrder.priority;
    }

}