import equipmentService from "../services/equipmentService.js";


const createEquipament = async (req, res) => {
    const result = await equipmentsService.create(req.body);
    return res.status(201).json(result);
};

const getAll = async (req, res) => {
    const result = await equipmentService.getAll();
    return res.json(result);
};

const getId = async (req, res) => {
    const { id } = req.params;
    const result = await equipmentsService.getId(id);
    return res.json(result);
};

const updateEquipament = async (req, res) => {
    const { id } = req.params;
    const result = await equipmentsService.update(id, req.body);
    return res.json(result);
};

const deleteEquipament = async (req, res) => {
    const { id } = req.params;
    await equipmentsService.deleteEquipment(id);

    return res.status(204).send();
};

export default {
    getAll,
    createBarbershop: createEquipament,
    getId,
    updateBarbershop: updateEquipament,
    deleteBarbershop: deleteEquipament
};