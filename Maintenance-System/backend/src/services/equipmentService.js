import equipmentRepository from "../repositories/equipmentRepository.js";
import { AppError } from "../errors/AppError.js";
import { translateError } from "../errors/translateError.js";



const getAll = async (term) => {
    if (term) {
        console.log("de boa");
        return await equipmentRepository.search(term);
    }
    return await equipmentRepository.getAll();
};


const getEquipamentById = async (id) => {
    const equipament = await equipmentRepository.getId(id);
    if (!equipament) {
        throw new AppError("Equipamento não encontrado", {
            statusCode: 404,
            code: "EQUIPAMENT_NOT_FOUND",
        });
    }
    return equipament;
};


const create = async (data) => {

   const equipament =  await equipmentRepository.create(data);
    return equipament;
};

const update = async (id, data) => {
    await getEquipamentById(id);

    if (data.email) {
        const emailExistente = await equipmentRepository.findByEmail(data.email);
        if (emailExistente && emailExistente._id?.toString() !== id && emailExistente.id !== id) {
            throw new AppError("E-mail já cadastrado", {
                statusCode: 409,
                code: "EMAIL_ALREADY_IN_USE",
                field: "email",
            });
        }
    }

    return await equipmentRepository.update(id, data);
};

const deletarEquipament = async (id) => {
    await getEquipamentById(id);
    return await equipmentRepository.deleteEquipament(id);
};

export default {
    create,
    getAll,
    update,
    deleteEquipament: deletarEquipament
};