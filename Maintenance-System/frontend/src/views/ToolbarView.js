export class ToolbarView {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.searchButton = document.getElementById('searchButton');
        this.deleteButton = document.getElementById('deleteButton');
        this.editButton = document.getElementById('editButton');
    }
    search(handler) {
        this.searchButton.addEventListener('click', (execute) => {
            execute.preventDefault();
            const search = this.searchInput.value;
            handler(search);
        });
    }

    bindDeleteClick(handler) {
        this.deleteButton.addEventListener('click', handler);
    }

    bindEditClick(handler) {
        this.editButton.addEventListener('click', handler);
    }
}