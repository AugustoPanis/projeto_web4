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
    existingUser,
    update,
    deleteEquipament,
};