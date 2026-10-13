import prisma from '../lib/prisma.js';

export const create = async (data) => {
    return await prisma.user.create({
        data
    });
};

export const getAll = async () => {
    return await prisma.user.findMany();
};

export const getId = async (id) => {
    return await prisma.client.findUnique({
        where: { id }
    });
};

export const existingUser = async (data) => {
    return await prisma.user.findFirst({
        where: {
            OR: [{ email: data.email }, { cpf: data.cpf }]
        }
    });
};

export const update = async (id, data) => {
    return await prisma.client.update({
        where: { id },
        data,
    });
};

export const deleteClient = async (id) => {
    return await prisma.client.delete({
        where: { id },
    });
};

export default {
    create,
    getAll,
    getId,
    existingUser,
    update,
    deleteClient,
};