import categoryService from "../services/categoryService.js";


const getAll = async (req, res) => {
    const { term } = req.query;

    const result = await categoryService.getAll(term);

    res.json(result);
};

const create = async (req, res) => {
    const result = await categoryService.create(req.body);
    return res.status(201).json(result);
};

const deleteCategory = async (req, res) => {
    const { id } = req.params;
    await categoryService.deleteCategory(id);
    return res.status(204).send();
};

const getById = async (req, res) => {
    const { id } = req.params;
    const result = await categoryService.getById(id);
    return res.json(result);
};

const update = async (req, res) => {
    const { id } = req.params;
    const result = await categoryService.update(id, req.body);
    return res.json(result);
};

export default {
    getAll,
    create,
    getById,
    update,
    deleteCategory
};