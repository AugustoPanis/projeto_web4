import prisma from '../lib/prisma.js';

export const create = async (data) => {
    return await prisma.location.create({
        data
    });
};

export const getAll = async () => {
    return await prisma.location.findMany();
};

export const getId = async (id) => {
    return await prisma.location.findUnique({
        where: { id }
    });
};

export const existingLocation = async (data) => {
    return await prisma.location.findFirst({
        where: {
            OR: [{ cep: data.cep }, { street: data.street }, { number: data.number } ]
        }
    });
};

export const update = async (id, data) => {
    return await prisma.location.update({
        where: { id },
        data,
    });
};

export const deleteLocation = async (id) => {
    return await prisma.location.delete({
        where: { id },
    });
};

export default {
    create,
    getAll,
    getId,
    existingLocation,
    update,
    deleteLocation,
};