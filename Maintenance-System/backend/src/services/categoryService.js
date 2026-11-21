import categoryRepository from "../repositories/categoryRepository.js";
import { AppError } from "../errors/AppError.js";
import { translateError } from "../errors/translateError.js";

const parseId = (value) => {
    const id = Number(value);
    if (!Number.isInteger(id)) {
        throw new AppError("ID inválido", { statusCode: 400, code: "INVALID_ID", field: "id" });
    }
    return id;
};

const ensureDescriptionAvailable = async (description, currentId = null) => {
    if (!description) return;

    const existing = await categoryRepository.findByDescription(description);
    if (existing && existing.id !== currentId) {
        throw new AppError("Categoria já cadastrada", {
            statusCode: 409,
            code: "DUPLICATE_CATEGORY",
            field: "description",
        });
    }
};

const getById = async (id) => {
    const categoryId = parseId(id);

    const category = await categoryRepository.getId(categoryId);
    if (!category) {
        throw new AppError("Categoria não encontrada", {
            statusCode: 404,
            code: "CATEGORY_NOT_FOUND",
        });
    }
    return category;
};

const create = async (data) => {
    const description = data.description?.trim();
    await ensureDescriptionAvailable(description);

    try {
        return await categoryRepository.create({ ...data, description });
    } catch (error) {
        throw translateError(error);
    }
};

const getAll = async (term) => {
    if (term) {
        return await categoryRepository.search(term);
    }
    return await categoryRepository.getAll();
};

const update = async (id, data) => {
    const categoryId = parseId(id);
    await getById(categoryId);

    const description = data.description?.trim();
    await ensureDescriptionAvailable(description, categoryId);

    try {
        return await categoryRepository.update(categoryId, { ...data, description });
    } catch (error) {
        throw translateError(error);
    }
};

const deleteCategory = async (id) => {
    const categoryId = parseId(id);
    await getById(categoryId);

    try {
        return await categoryRepository.deleteCategory(categoryId);
    } catch (error) {
        throw translateError(error);
    }
};

export default {
    create,
    getAll,
    getById,
    update,
    deleteCategory,
};