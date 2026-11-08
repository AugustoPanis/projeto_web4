import technicianService from "../services/technicianService.js";

const getAll = async (req, res) => {
    const { term } = req.query;

    const result = await technicianService.getAll(term);

    res.json(result);
};

const createTechnician = async (req, res) => {
    console.log(req.body);
    const result = await technicianService.createTechnician(req.body);
    return res.status(201).json(result);
};

const deleteTechnician = async (req, res) => {
    const { id } = req.params;
    await technicianService.deleteTechnician(id);
    return res.status(204).send();
};

const getId = async (req, res) => {
    const { id } = req.params;
    const result = await technicianService.getTechnicianById(id);
    return res.json(result);
};

const updateTechnician = async (req, res) => {
    const { id } = req.params;
    const result = await technicianService.updateTechnician(id, req.body);
    return res.json(result);
};


export default {
    getAll,
    createTechnician,
    getId,
    updateTechnician,
    deleteTechnician
};