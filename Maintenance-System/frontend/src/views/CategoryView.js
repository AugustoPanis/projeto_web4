export class CategoryView {
    constructor() {

        this.table = document.getElementById('table');
        this.saveEquipament = document.getElementById('save');
        this.descriptionCategory = document.getElementById('descriptionCategory');
        this.weight = document.getElementById('weight');
        this.height = document.getElementById('height');
    }

    createCategory(handler) {
        this.saveEquipament.addEventListener('click', (execute) => {
            execute.preventDefault();
            const descriptionCategory = this.descriptionCategory.value;
            const weight = this.weight.value;
            const height = this.height.value;

            handler({ descriptionCategory, weight, height });

        });
    }

    toLoadCategoryTable(category) {
        this.table.innerHTML = '';

        category.forEach((category) => {
            const row = document.createElement('tr');
            row.dataset.id = category.id;
            row.innerHTML = `
                <td>${category.descriptionCategory}</td>
                <td>${category.weight}</td>
                <td>${category.height}</td>
            `;
            this.table.appendChild(row);
        });
    }

        fillForm(category) {
        this.descriptionCategory.value = category.descriptionCategory;
        this.weight.value = category.weight;
        this.height.value = category.height;
    }

}


