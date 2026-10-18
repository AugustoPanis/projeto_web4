import clientService from "../services/clientService.js";

const createClient = async (req, res) => {
  const result = await clientService.create(req.body);
  return res.status(201).json(result);
};

const getAll = async (req, res) => {
  const result = await clientService.getAll();
  return res.json(result);
};

const getId = async (req, res) => {
  const { id } = req.params;
  const result = await clientService.getId(id);

  if (!result) {
    return res.status(404).json({ error: "Cliente não encontrado." });
  }
  return res.json(result);
};

const updateClient = async (req, res) => {
  const { id } = req.params;
  const result = await clientService.update(id, req.body);
  return res.json(result);
};

const deleteClient = async (req, res) => {
  const { id } = req.params;
  await clientService.deleteClient(id);
  return res.status(204).send();
};

export default {
  getAll,
  createClient,
  getId,
  updateClient,
  deleteClient
};