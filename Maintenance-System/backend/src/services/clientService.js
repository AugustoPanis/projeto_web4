import clientRepository from "../repositories/clientRepository.js";
import { authAdmin } from '../config/firebaseAdmin.js';

const existingUser = async (data) => {
    const existingUser = await clientRepository.existingUser(data);

    if (existingUser) {
        throw new Error("CPF ou E-mail já cadastrado");
    }
}

const getClientById = async (id) => {
    const client = await clientRepository.getId(id);
    if (!client) {
        throw new Error("Client não encontrado");
    }
    return client;
}

const create = async (data) => {
    await existingUser(data);

    let firebaseUser = null;

    try {
        firebaseUser = await authAdmin.createUser({id: data.uid,email: data.email,password: data.password,name: data.name,cpf: data.cpf
        });
        const userToSave = { id: firebaseUser.uid, name: data.name,email: data.email,cpf: data.cpf};

        return await clientRepository.create(userToSave);
    } catch (error) {
        if (firebaseUser?.uid) {
            console.warn(`[Rollback] Removendo UID ${firebaseUser.uid} do Firebase...`);
            await authAdmin.deleteUser(firebaseUser.uid).catch((delErr) => {
                console.error('Falha ao reverter usuário no Firebase:', delErr);
            });
        }
        throw new Error(error.message || 'Erro ao processar criação de usuário.');
    }
};

const getAll = async () => {
    return await clientRepository.getAll();
}

const getId = async (id) => {
    return await clientRepository.getId(id);
}

const update = async (id, data) => {
    await getClientById(id);

    if (data.email) {
        const emailExistente = await clientRepository.findByEmail(data.email);
        if (emailExistente && emailExistente._id.toString() !== id) {
            throw new Error("E-mail já cadastrado");
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
    getId,
    update,
    deleteClient: deletarClient
};  