const barbershopRepository = require("../repositories/barbershopRepository");

const validateEmail = async (email) => {
    const emailExistente = await barbershopRepository.findByEmail(email);

    if (emailExistente) {
        throw new Error("E-mail já cadastrado");
    }
}

const validaBarbearia = async (id) => {
    const barbershop = await barbershopRepository.getId(id);

    if (!barbershop) {
        throw new Error("Barbearia não encontrada");
    }

    return barbershop;
}

const create = async (data) => {
    await validateEmail(data.email);

    return await barbershopRepository.create(data);
};

const getAll = async () => {
    return await barbershopRepository.getAll();
}

const getId = async (id) => {
    return await barbershopRepository.getId(id);
}

const update = async (id, data) => {
    await validaBarbearia(id);

    if (data.email) {
        const emailExistente = await barbershopRepository.findByEmail(data.email);
        if (emailExistente && emailExistente._id.toString() !== id) {
            throw new Error("E-mail já cadastrado");
        }
    }

    return await barbershopRepository.update(id, data);
};

    const deletarBarbershop = async (id) => {
        await validaBarbearia(id);

       return await barbershopRepository.deleteBarbershop(id);


    };

    module.exports = {
        create,
        getAll,
        getId,
        update,
        deleteBarbershop: deletarBarbershop
    };  