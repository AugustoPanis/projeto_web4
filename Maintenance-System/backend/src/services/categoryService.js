import categoryRepository from "../repositories/categoryRepository.js";
import { AppError } from "../errors/AppError.js";
import { translateError } from "../errors/translateError.js";

const existingCategory = async (data, id = null) => {
    const existing = await categoryRepository.existingCategory(data);

    if (existing && existing.id !== id) {
        throw new AppError("Categoria já cadastrada", {
            statusCode: 409,
            code: "DUPLICATE_CATEGORY",
        });
    }
};

const parseId = (value) => {
    const id = Number(value);
    if (!Number.isInteger(id)) {
        throw new AppError("ID inválido", { statusCode: 400, code: "INVALID_ID", field: "id" });
    }
    return id;
};

const getById = async (id) => {

    const categoryId = parseId(id);
    const client = await categoryRepository.getId(categoryId);
    if (!client) {
        throw new AppError("Categoria não encontrado", {
            statusCode: 404,
            code: "CATEGORY_NOT_FOUND",
        });
    }
    return client;
};

const create = async (data) => {
    await existingCategory(data);
    return categoryRepository.create(data);
};

const getAll = async () => {
  return await categoryRepository.getAll();
};

const update = async (id, data) => {
    const categoryId = parseId(id);
    await getById(categoryId);
    await existingCategory(data, categoryId);

    return categoryRepository.update(id, data);
};

const deleteCategory = async (id) => {
    const categoryId = parseId(id);
    return await categoryRepository.deleteCategory(categoryId);
};

export default {
    create,
    getAll,
    getById,
    update,
    deleteCategory

};