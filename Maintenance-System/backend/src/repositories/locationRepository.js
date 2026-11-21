import prisma from '../lib/prisma.js';

export const create = async (data) => {
    return await prisma.location.create({
        data
    });
};

export const getAll = async () => {
    return await prisma.location.findMany();
};

export const search = async (term) => {
    console.log('Searching for locations with term:', term);
    return await prisma.location.findMany({
        where: term ? {
            description: {
                contains: term,
                mode: 'insensitive',
            },
        } : {},
    });
}

export const getId = async (id) => {
    return await prisma.location.findUnique({
        where: { id }
    });
};

export const findByDescription = async (description) => {
    return await prisma.location.findFirst({
        where: { description },
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
    search,
    create,
    getAll,
    getId,
    findByDescription,
    update,
    deleteLocation,
};