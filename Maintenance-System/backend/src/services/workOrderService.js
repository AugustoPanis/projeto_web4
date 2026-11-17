import workOrderRepository from "../repositories/workOrderRepository.js";
import { AppError } from "../errors/AppError.js";
import { translateError } from "../errors/translateError.js";

const parseId = (value) => {
    const id = Number(value);
    if (!Number.isInteger(id)) {
        throw new AppError("ID inválido", { statusCode: 400, code: "INVALID_ID", field: "id" });
    }
    return id;
};

const existingDescription = async (description, workOrderId = null) => {
    const existing = await workOrderRepository.existingDescription(description);

    if (existing && existing.id.toString() !== workOrderId) {
        throw new AppError("Já existe uma Ordem de Serviço com essa descrição", {
            statusCode: 409,
            code: "DUPLICATE_DESCRIPTION",
        });
    }
};

const getById = async (id) => {
    const workOrderId = parseId(id);

    const workOrder = await workOrderRepository.getById(workOrderId);
    if (!workOrder) {
        throw new AppError("Ordem de Serviço não encontrada", {
            statusCode: 404,
            code: "WORK_ORDER_NOT_FOUND",
        });
    }
    return workOrder;
};

const createWorkOrder = async (data) => {
    const equipamentId = parseId(data.equipament_id);

    const technicianId = parseId(data.technician_id);

    await existingDescription(data.description);
    try {
        return await workOrderRepository.create({
            ...data,
            equipament_id: equipamentId,
            technician_id: technicianId,
        });
    } catch (error) {
        throw translateError(error);
    }
};

const getAll = async (term) => {
    if (term) {
        return await workOrderRepository.search(term);
    }
    return await workOrderRepository.getAll();
};

const updateWorkOrder = async (id, data) => {
    const workOrderId = parseId(id);

    if (data.description) {
        await existingDescription(data.description, workOrderId);
    }

    return await workOrderRepository.update(workOrderId, data);
};

const deleteWorkOrder = async (id) => {
    const workOrderId = parseId(id);

    return await workOrderRepository.deleteWorkOrder(workOrderId);
};

export default {
    getById,
    createWorkOrder,
    getAll,
    updateWorkOrder,
    deleteWorkOrder
};