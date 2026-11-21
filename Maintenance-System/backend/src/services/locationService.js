import locationRepository from "../repositories/locationRepository.js";
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

    const existing = await locationRepository.findByDescription(description);
    if (existing && existing.id !== currentId) {
        throw new AppError("Descrição de local já cadastrada", {
            statusCode: 409,
            code: "DUPLICATE_LOCATION",
            field: "description",
        });
    }
};

const getById = async (id) => {
    const locationId = parseId(id);

    const location = await locationRepository.getId(locationId);
    if (!location) {
        throw new AppError("Local não encontrado", {
            statusCode: 404,
            code: "LOCATION_NOT_FOUND",
        });
    }
    return location;
};

const create = async (data) => {
    const description = data.description?.trim();
    await ensureDescriptionAvailable(description);

    try {
        return await locationRepository.create({ ...data, description });
    } catch (error) {
        throw translateError(error);
    }
};
const getAll = async (term) => {
    if (term) {
        return await locationRepository.search(term);
    }
    return await locationRepository.getAll();
};

const update = async (id, data) => {
    const locationId = parseId(id);
    await getById(locationId);

    const description = data.description?.trim();
    await ensureDescriptionAvailable(description, locationId);

    try {
        return await locationRepository.update(locationId, { ...data, description });
    } catch (error) {
        throw translateError(error);
    }
};

const deleteLocation = async (id) => {
    const locationId = parseId(id);
    await getById(locationId);

    try {
        return await locationRepository.deleteLocation(locationId);
    } catch (error) {
        throw translateError(error);
    }
};

export default {
    create,
    getAll,
    getById,
    update,
    deleteLocation,
};