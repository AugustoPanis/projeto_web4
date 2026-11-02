import equipmentRepository from "../repositories/equipmentRepository.js";
import { AppError } from "../errors/AppError.js";
import { translateError } from "../errors/translateError.js";

const getAll = async (term) => {
    if (term) {
        return await equipmentRepository.search(term);
    }
    return await equipmentRepository.getAll();
};

const createEquipament = async (data) => {
    try {
        const equipament = {
            ...data,
            acquisitionDate: new Date(data.acquisitionDate),
        };
        return await equipmentRepository.create(equipament);
    } catch (error) {
        throw translateError(error);
    }
};

const parseId = (value) => {
    const id = Number(value);
    if (!Number.isInteger(id)) {
        throw new AppError("ID inválido", { statusCode: 400, code: "INVALID_ID", field: "id" });
    }
    return id;
};

const deleteEquipament = async (id) => {
    const equipamentId = parseId(id);

    await getEquipamentById(equipamentId);
    return await equipmentRepository.deleteEquipament(equipamentId);
};




const getEquipamentById = async (id) => {
    const equipamentId = parseId(id);

    const equipament = await equipmentRepository.getId(equipamentId);
    if (!equipament) {
        throw new AppError("Equipamento não encontrado", {
            statusCode: 404,
            code: "EQUIPAMENT_NOT_FOUND",
        });
    }
    return equipament;
};


const update = async (id, data) => {
    const equipamentId = parseId(id);

    try {
        const equipament = {
            ...data,
            acquisitionDate: new Date(data.acquisitionDate),
        };
        return await equipmentRepository.update(equipamentId, equipament);
    } catch (error) {
        throw translateError(error);
    }
};



export default {
    createEquipament,
    getAll,
    update,
    deleteEquipament,
    getEquipamentById
};