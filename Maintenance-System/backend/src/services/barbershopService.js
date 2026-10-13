import clientRepository from "../repositories/clientRepository.js";

const validateEmail = async (email) => {
    const emailExistente = await clientRepository.findByEmail(email);

    if (emailExistente) {
        throw new Error("E-mail já cadastrado");
    }
}

const validaBarbearia = async (id) => {
    const barbershop = await clientRepository.getId(id);

    if (!barbershop) {
        throw new Error("Barbearia não encontrada");
    }

    return barbershop;
}

const create = async (data) => {
    await validateEmail(data.email);
    return await clientRepository.create(data);
};

const getAll = async () => {
    return await clientRepository.getAll();
}

const getId = async (id) => {
    return await clientRepository.getId(id);
}

const update = async (id, data) => {
    await validaBarbearia(id);

    if (data.email) {
        const emailExistente = await clientRepository.findByEmail(data.email);
        if (emailExistente && emailExistente._id.toString() !== id) {
            throw new Error("E-mail já cadastrado");
        }
    }

    return await clientRepository.update(id, data);
};

const deletarBarbershop = async (id) => {
    await validaBarbearia(id);

    return await clientRepository.deleteBarbershop(id);


};

export default {
    create,
    getAll,
    getId,
    update,
    deletarBarbershop

};
