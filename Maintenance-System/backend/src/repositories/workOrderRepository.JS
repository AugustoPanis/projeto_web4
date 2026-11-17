import prisma from '../lib/prisma.js';

export const create = async (data) => {
    return await prisma.work_order.create({
        data
    });
};

export const getAll = async () => {
    return await prisma.work_order.findMany();
};

export const getById = async (id) => {
    return await prisma.work_order.findUnique({
        where: { id }
    });
};

export const existingDescription = async (data) => {
    return await prisma.work_order.findFirst({
        where: {
            description: data.description
        }
    });
};

export const update = async (id, data) => {
    return await prisma.work_order.update({
        where: { id },
        data,
    });
};

export const deleteWorkOrder = async (id) => {
    return await prisma.work_order.delete({
        where: { id },
    });
};

export default {
    create,
    getAll,
    getById,
    existingDescription,
    update,
    deleteWorkOrder,
};