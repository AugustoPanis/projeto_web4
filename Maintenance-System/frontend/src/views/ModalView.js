export class ModalView {
    constructor() {
        this.save = document.getElementById('save');
        this.form = document.getElementById('formNewRegister');
        this.modalEl = document.getElementById('modalNewRegister');
        this.modalTitle = document.getElementById('modalNewRegisterLabel');
        this.statusEquipment = document.getElementById('statusEquipment');
        this.nameEquipament = document.getElementById('nameEquipment');
        this.dateAcquisition = document.getElementById('dateAcquisition');
        this.locationEquipment = document.getElementById('locationEquipment');
        this.patrymony = document.getElementById('patrymony');
    }

    bindModalReset(onClose) {
        this.modalEl.addEventListener('hide.bs.modal', () => {
            document.activeElement?.blur();
        });

        this.modalEl.addEventListener('hidden.bs.modal', () => {
            this.form.reset();
            this.setModalMode(false);
            onClose?.();
        });
    }
    
    closeModal() {
        bootstrap.Modal.getInstance(this.modalEl)?.hide();
    }
    openModal() {
        bootstrap.Modal.getOrCreateInstance(this.modalEl).show();
    }

    setModalMode(isEditing) {
        this.modalTitle.textContent = isEditing ? 'Editar' : 'Novo';
        this.save.textContent = isEditing ? 'Atualizar' : 'Salvar';
    }
}