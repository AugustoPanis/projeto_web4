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

const existingDescription = async (description, currentId = null) => {
    const existing = await workOrderRepository.existingDescription(description);

    if (existing && existing.id !== currentId) {
        throw new AppError("Já existe uma Ordem de Serviço com essa descrição", {
            statusCode: 409,
            code: "DUPLICATE_DESCRIPTION",
            field: "description",
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
        console.log(error);
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
    await getById(workOrderId);

    const payload = { ...data };
    if (data.equipament_id !== undefined) payload.equipament_id = parseId(data.equipament_id);
    if (data.technician_id !== undefined) payload.technician_id = parseId(data.technician_id);

    if (data.description) {
        await existingDescription(data.description, workOrderId);
    }

    return await workOrderRepository.update(workOrderId, payload);
};

const deleteWorkOrder = async (id) => {
    const workOrderId = parseId(id);
    await getById(workOrderId);

    return await workOrderRepository.deleteWorkOrder(workOrderId);
};

export default {
    getById,
    createWorkOrder,
    getAll,
    updateWorkOrder,
    deleteWorkOrder
};