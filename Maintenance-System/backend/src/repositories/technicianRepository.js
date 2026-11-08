import prisma from '../lib/prisma.js';


export const findByEmail = async (email) => {
    return await prisma.technician.findUnique({
        where: { email }
    });
}


export const getId = async (id) => {
    return await prisma.technician.findUnique({
        where: { id }
    });
};

export const create = async (data) => {
    return await prisma.technician.create({
        data
    });
};

export const getAll = async () => {
    return await prisma.technician.findMany();
};



export const search = async (term) => {
    return await prisma.technician.findMany({
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

export const update = async (id, data) => {
    return await prisma.technician.update({
        where: { id },
        data,
    });
};

export const deleteTechnician = async (id) => {
    return await prisma.technician.delete({
        where: { id },
    });
};

export default {
    findByEmail,

    create,
    getAll,
    search,
    getId,
    update,
    deleteTechnician,
};