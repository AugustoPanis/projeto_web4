import prisma from '../lib/prisma.js';

export const create = async (data) => {
    return await prisma.user.create({
        data
    });
};

export const getAll = async () => {
    try {
    return await prisma.equipament.findMany();
    }
    catch (error) {
        console.error('Erro ao buscar equipamentos:', error);
        throw new Error('Erro ao buscar equipamentos');
    }
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