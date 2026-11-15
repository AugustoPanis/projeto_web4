import prisma from '../lib/prisma.js';

export const create = async (data) => {
    return await prisma.category.create({
        data
    });
};

export const getAll = async () => {
    return await prisma.category.findMany();
};

export const getId = async (id) => {
    return await prisma.category.findUnique({
        where: { id }
    });
};

export const existingCategory = async (data) => {
    return await prisma.category.findFirst({
        where: {
            OR: [{ descriptionCategory: data.descriptionCategory }, { weight: data.weight }, { height: data.height } ]
        }
    });
};

export const update = async (id, data) => {
    return await prisma.category.update({
        where: { id },
        data,
    });
};

export const deleteCategory = async (id) => {
    return await prisma.category.delete({
        where: { id },
    });
};

export default {
    create,
    getAll,
    getId,
    existingCategory,
    update,
    deleteCategory,
};