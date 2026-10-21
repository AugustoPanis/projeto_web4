import equipmentService from "../services/equipmentService.js";


const getAll = async (req, res) => {
    const { term } = req.query;

    const result = await equipmentService.getAll(term);

    res.json(result);
};









const createEquipament = async (req, res) => {
    const result = await equipmentService.create(req.body);
    return res.status(201).json(result);
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
    createEquipament,
    getId,
    updateBarbershop: updateEquipament,
    deleteBarbershop: deleteEquipament
};