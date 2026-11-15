import locationService from "../services/locationService.js";


const getAll = async (req, res) => {
    const { term } = req.query;

    const result = await locationService.getAll(term);

    res.json(result);
};

const create = async (req, res) => {
    const result = await locationService.create(req.body);
    return res.status(201).json(result);
};

const deleteLocation = async (req, res) => {
    const { id } = req.params;
    await locationService.deleteLocation(id);
    return res.status(204).send();
};

const getById = async (req, res) => {
    const { id } = req.params;
    const result = await locationService.getById(id);
    return res.json(result);
};

const update = async (req, res) => {
    const { id } = req.params;
    const result = await locationService.update(id, req.body);
    return res.json(result);
};

export default {
    getAll,
    create,
    getById,
    update,
    deleteLocation
};