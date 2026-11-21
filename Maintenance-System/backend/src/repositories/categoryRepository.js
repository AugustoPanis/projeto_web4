import prisma from '../lib/prisma.js';

export const create = async (data) => {
    return await prisma.category.create({
        data
    });
};

export const getAll = async () => {
    return await prisma.category.findMany();
};
export const search = async (term) => {
    return await prisma.category.findMany({
        where: term ? {
            descriptionCategory: {
                contains: term,
                mode: 'insensitive',
            },
        } : {},
    });
}

export const getId = async (id) => {
    return await prisma.category.findUnique({
        where: { id }
    });
};

export const findByDescription = async (descriptionCategory) => {
    return await prisma.category.findFirst({
        where: {
            descriptionCategory:    { equals: descriptionCategory, mode: 'insensitive' },
        },
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
    search,
    create,
    getAll,
    getId,
    findByDescription,
    update,
    deleteCategory,
};