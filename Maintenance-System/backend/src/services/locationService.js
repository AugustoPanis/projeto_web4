import locationRepository from "../repositories/locationRepository.js";
import { AppError } from "../errors/AppError.js";
import { translateError } from "../errors/translateError.js";

const existingLocation = async (data, id = null) => {
    const existing = await locationRepository.existingLocation(data);

    if (existing && existing.id !== id) {
        throw new AppError("Local já cadastrada", {
            statusCode: 409,
            code: "DUPLICATE_LOCATION",
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
    const locationId = parseId(id);
    const client = await locationRepository.getId(locationId);
    if (!client) {
        throw new AppError("Local não encontrada", {
            statusCode: 404,
            code: "LOCATION_NOT_FOUND",
        });
    }
    return client;
};

const create = async (data) => {
    await existingLocation(data);
    return locationRepository.create(data);
};

const getAll = async () => {
  return await locationRepository.getAll();
};

const update = async (id, data) => {
    const locationId = parseId(id);
    await getById(locationId);
    await existingLocation(data, locationId);

    return locationRepository.update(locationId, data);
};

const deleteLocation = async (id) => {
    const locationId = parseId(id);
    return await locationRepository.deleteLocation(locationId);
};

export default {
    create,
    getAll,
    getById,
    update,
    deleteLocation
};