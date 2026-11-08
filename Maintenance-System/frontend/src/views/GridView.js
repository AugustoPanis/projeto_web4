export class GridView {
    constructor() {
        this.table = document.getElementById('table');
        this.form = document.getElementById('formNewRegister');
    }

    clearSelection() {
        this.table
            .querySelectorAll('tr.table-active')
            .forEach((r) => r.classList.remove('table-active'));
    }

    bindRowSelect(handler) {
        this.table.addEventListener('click', (e) => {
            const row = e.target.closest('tr');
            if (!row) return;
            if (e.detail > 1) return;


            const lineSelect = row.classList.contains('table-active');
            this.clearSelection();

            if (lineSelect) {
                handler(null);
                return;
            }

            row.classList.add('table-active');
            handler(row.dataset.id);
        });
    }

    bindRowEditSelect(handler) {
        this.table.addEventListener('dblclick', (e) => {
            const row = e.target.closest('tr');
            if (!row) return;

            this.clearSelection();
            row.classList.add('table-active');
            handler(row.dataset.id);
        });
    }


}