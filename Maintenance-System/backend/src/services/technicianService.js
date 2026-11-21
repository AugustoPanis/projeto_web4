import technicianRepository from "../repositories/technicianRepository.js";
import { AppError } from "../errors/AppError.js";
import { translateError } from "../errors/translateError.js";

const parseId = (value) => {
    const id = Number(value);
    if (!Number.isInteger(id)) {
        throw new AppError("ID inválido", { statusCode: 400, code: "INVALID_ID", field: "id" });
    }
    return id;
};

const ensureEmailAvailable = async (email, currentId = null) => {
    if (!email) return;

    const existing = await technicianRepository.findByEmail(email);
    if (existing && existing.id !== currentId) {
        throw new AppError("E-mail já cadastrado", {
            statusCode: 409,
            code: "EMAIL_ALREADY_IN_USE",
            field: "email",
        });
    }
};

const getTechnicianById = async (id) => {
    const technicianId = parseId(id);

    const technician = await technicianRepository.getId(technicianId);
    if (!technician) {
        throw new AppError("Técnico não encontrado", {
            statusCode: 404,
            code: "TECHNICIAN_NOT_FOUND",
        });
    }
    return technician;
};

const createTechnician = async (data) => {
    await ensureEmailAvailable(data.email);
    try {
        return await technicianRepository.create(data);
    } catch (error) {
        throw translateError(error);
    }
};

const getAll = async (term) => {
    if (term) {
        return await technicianRepository.search(term);
    }
    return await technicianRepository.getAll();
};

const updateTechnician = async (id, data) => {
    const technicianId = parseId(id);

    await getTechnicianById(technicianId);
    await ensureEmailAvailable(data.email, technicianId);

    try {
        return await technicianRepository.update(technicianId, data);
    } catch (error) {
        throw translateError(error);
    }
};

const deleteTechnician = async (id) => {
    const technicianId = parseId(id);

    await getTechnicianById(technicianId);

    try {
        return await technicianRepository.deleteTechnician(technicianId);
    } catch (error) {
        throw translateError(error);
    }
};

export default {
    getTechnicianById,
    createTechnician,
    getAll,
    updateTechnician,
    deleteTechnician,
};