import workOrderService from "../services/workOrderService.js";


const getAll = async (req, res) => {
    const { term } = req.query;

    const result = await workOrderService.getAll(term);

    res.json(result);
};

const create = async (req, res) => {
    const result = await workOrderService.createWorkOrder(req.body);
    return res.status(201).json(result);
};

const deleteWorkOrder = async (req, res) => {
    const { id } = req.params;
    await workOrderService.deleteWorkOrder(id);
    return res.status(204).send();
};

const getById = async (req, res) => {
    const { id } = req.params;
    const result = await workOrderService.getById(id);
    return res.json(result);
};

const update = async (req, res) => {
    const { id } = req.params;
    const result = await workOrderService.updateWorkOrder(id, req.body);
    return res.json(result);
};

export default {
    getAll,
    create,
    getById,
    update,
    deleteWorkOrder
};