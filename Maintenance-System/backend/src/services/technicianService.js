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

const existingTechnician = async (data) => {
    const existing = await technicianRepository.findByEmail(data.email);
    if (existing) {
        throw new AppError("e-mail já cadastrado", {
            statusCode: 409,
            code: "DUPLICATE_CPF_OR_EMAIL",
        });
    }
};

const getTechnicianById = async (id) => {
    const equipamentId = parseId(id);

    const technician = await technicianRepository.getId(equipamentId);
    if (!technician) {
        throw new AppError("Técnico  não encontrado", {
            statusCode: 404,
            code: "CLIENT_NOT_FOUND",
        });
    }
    return technician;
};

const createTechnician = async (data) => {
    await existingTechnician(data);
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
    const equipamentId = parseId(id);

    if (data.email) {
        const emailExistente = await technicianRepository.findByEmail(data.email);
        if (emailExistente && emailExistente._id?.toString() !== equipamentId && emailExistente.id !== equipamentId) {
            throw new AppError("E-mail já cadastrado", {
                statusCode: 409,
                code: "EMAIL_ALREADY_IN_USE",
                field: "email",
            });
        }
    }

    return await technicianRepository.update(equipamentId, data);
};

const deleteTechnician = async (id) => {
    const equipamentId = parseId(id);

    return await technicianRepository.deleteTechnician(equipamentId);
};

export default {
    getTechnicianById,
    createTechnician,
    getAll,
    updateTechnician,
    deleteTechnician
};