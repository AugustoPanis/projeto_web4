export class ToolbarView {
    constructor() {
        this.searchForm = document.getElementById('search-form');
        this.searchInput = document.getElementById('searchInput');
        this.searchButton = document.getElementById('searchButton');
                this.deleteButton = document.getElementById('deleteButton');
        this.editButton = document.getElementById('editButton');
    }
    searchEquipmentForButton(handler) {
        this.searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handler(this.searchInput.value);
        });
    }

    bindDeleteClick(handler) {
        this.deleteButton.addEventListener('click', handler);
    }

    bindEditClick(handler) {
        this.editButton.addEventListener('click', handler);
    }
}

