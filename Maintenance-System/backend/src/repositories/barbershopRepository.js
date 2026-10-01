// const Barbershop = require("../models/barbershopModels");

const create = async (data) => {
    const barbershop = new Barbershop(data);

    return await barbershop.save();
};

const getAll = async () => {
    return await Barbershop.find();
}

const getId = async (id) => {
    return await Barbershop.findById(id);
}

const findByEmail = async (email) => {
    return await Barbershop.findOne({ email });
}

const update = async (id, data) => {
    const barbershop = await Barbershop.findById(id);
    Object.assign(barbershop, data);
    return await barbershop.save();
};

const deleteBarbershop = async (id) => {
    return await Barbershop.findByIdAndDelete(id);
};

module.exports = {
    create,
    getAll,
    getId,
    findByEmail,
    update,
    deleteBarbershop
};
