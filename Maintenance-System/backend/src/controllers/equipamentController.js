import equipmentService from "../services/equipmentService.js";


const getAll = async (req, res) => {
    const { term } = req.query;

    const result = await equipmentService.getAll(term);

    res.json(result);
};

const createEquipament = async (req, res) => {
    const result = await equipmentService.createEquipament(req.body);
    return res.status(201).json(result);
};

const deleteEquipament = async (req, res) => {
    const { id } = req.params;
    await equipmentService.deleteEquipament(id);
    return res.status(204).send();
};



const getId = async (req, res) => {
    const { id } = req.params;
    const result = await equipmentService.getEquipamentById(id);
    return res.json(result);
};

const updateEquipament = async (req, res) => {
    const { id } = req.params;
    const result = await equipmentService.update(id, req.body);
    return res.json(result);
};




export default {
    getAll,
    createEquipament,
    getId,
    updateEquipament,
    deleteEquipament
};