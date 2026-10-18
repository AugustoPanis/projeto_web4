import clientRepository from "../repositories/clientRepository.js";
import { authAdmin } from '../config/firebaseAdmin.js';
import { AppError } from "../errors/AppError.js";
import { translateError } from "../errors/translateError.js";

const existingUser = async (data) => {
    const existing = await clientRepository.existingUser(data);
    if (existing) {
        throw new AppError("CPF ou e-mail já cadastrado", {
            statusCode: 409,
            code: "DUPLICATE_CPF_OR_EMAIL",
        });
    }
};

const getClientById = async (id) => {
    const client = await clientRepository.getId(id);
    if (!client) {
        throw new AppError("Cliente não encontrado", {
            statusCode: 404,
            code: "CLIENT_NOT_FOUND",
        });
    }
    return client;
};

const create = async (data) => {
    await existingUser(data);

    let firebaseUser = null;

    try {
        firebaseUser = await authAdmin.createUser({
            email: data.email,
            password: data.password,
            displayName: data.name
        });

        const userToSave = {
            id: firebaseUser.uid,
            name: data.name,
            email: data.email,
            cpf: data.cpf
        };

        return await clientRepository.create(userToSave);

    } catch (error) {
        if (firebaseUser?.uid) {
            try {
                await authAdmin.deleteUser(firebaseUser.uid);
            } catch (delErr) {
                console.error('Falha ao reverter usuário no Firebase:', delErr);
            }
        }
        throw translateError(error);
    }
};

const getAll = async () => {
  return await clientRepository.getAll();
};

const update = async (id, data) => {
    await getClientById(id);

    if (data.email) {
        const emailExistente = await clientRepository.findByEmail(data.email);
        if (emailExistente && emailExistente._id?.toString() !== id && emailExistente.id !== id) {
            throw new AppError("E-mail já cadastrado", {
                statusCode: 409,
                code: "EMAIL_ALREADY_IN_USE",
                field: "email",
            });
        }
    }

    return await clientRepository.update(id, data);
};

const deletarClient = async (id) => {
    await getClientById(id);
    return await clientRepository.deleteClient(id);
};

export default {
    create,
    getAll,
    update,
    deleteClient: deletarClient
};