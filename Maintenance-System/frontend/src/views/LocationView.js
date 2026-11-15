export class LocationView {
    constructor() {

        this.table = document.getElementById('table');
        this.saveEquipament = document.getElementById('save');
        this.cep = document.getElementById('cep');
        this.street = document.getElementById('street');
        this.addition = document.getElementById('addition');
        this.neighborhood = document.getElementById('neighborhood');
        this.city = document.getElementById('city');
        this.state = document.getElementById('state');
        this.searchLocation = document.getElementById('searchLocation');
    }

    createLocation(handler) {
        this.saveEquipament.addEventListener('click', (execute) => {
            execute.preventDefault();
            const cep = this.cep.value;
            const street = this.street.value;
            const addition = this.addition.value;
            const neighborhood = this.neighborhood.value;
            const city = this.city.value;
            const state = this.state.value;

            handler({ cep, street, addition, neighborhood, city, state });

        });
    }

    searchLocationForCep(handler) {
        this.searchLocation.addEventListener('click', (execute) => {
            execute.preventDefault();
            const cep = this.cep.value;
            handler(cep);
        });
    }

    toLoadLocationTable(location) {
        this.table.innerHTML = '';

        location.forEach((location) => {
            const row = document.createElement('tr');
            row.dataset.id = location.id;
            row.innerHTML = `
                <td>${location.cep}</td>
                <td>${location.street}</td>
                <td>${location.addition}</td>
                <td>${location.neighborhood}</td>
                <td>${location.city}</td>
                <td>${location.state}</td>
            `;
            this.table.appendChild(row);
        });
    }

    fillForm(location) {
        this.cep.value = location.cep;
        this.street.value = location.street;
        this.addition.value = location.addition;
        this.neighborhood.value = location.neighborhood;
        this.city.value = location.city;
        this.state.value = location.state;
    }

    fillFormReturnApi(location) {
        this.cep.value = location.cep;
        this.street.value = location.logradouro;
        this.addition.value = location.complemento;
        this.neighborhood.value = location.bairro;
        this.city.value = location.localidade;
        this.state.value = location.estado;
    }

}