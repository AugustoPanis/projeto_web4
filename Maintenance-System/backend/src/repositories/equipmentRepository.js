import prisma from '../lib/prisma.js';

export const getAll = async () => {
    return await prisma.equipament.findMany();

};

export const search = async (term) => {
    return await prisma.equipament.findMany({
        where: term
            ? {
                name: {
                    contains: term,
                    mode: 'insensitive'
                }
            }
            : undefined
    });

};

export const create = async (data) => {
    return await prisma.equipament.create({
        data
    });
};

export const getId = async (id) => {
    return await prisma.equipament.findUnique({
        where: { id }
    });
};




export const update = async (id, data) => {
            console.log("[controller] body:", req.body,"[controller] teste:", req.params);

    return await prisma.equipament.update({
        where: { id },
        data,
    });
};

export const deleteEquipament = async (id) => {
    return await prisma.equipament.delete({
        where: { id },
    });
};

export default {
    create,
    getAll,
    search,
    getId,
    update,
    deleteEquipament,
};