export class ModalView {
    constructor() {
        this.saveEquipament = document.getElementById('saveEquipament');
        this.form = document.getElementById('formNovoEquipamento');
        this.modalEl = document.getElementById('modalNovoEquipamento');
        this.modalTitle = document.getElementById('modalNovoEquipamentoLabel');
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
        this.modalTitle.textContent = isEditing ? 'Editar Equipamento' : 'Novo Equipamento';
        this.saveEquipament.textContent = isEditing ? 'Atualizar' : 'Salvar';
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