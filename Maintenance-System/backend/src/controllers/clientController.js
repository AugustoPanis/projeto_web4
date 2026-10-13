import clientService from "../services/clientService.js";

const createClient = async (req, res) => {
  try {
    const result = await clientService.create(req.body);
    return res.status(201).json(result);

  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
};

const getAll = async (req, res) => {
  try {
    const result = await clientService.getAll();
    return res.json(result);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

};

const getId = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await clientService.getId(id);
    return res.json(result);
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await clientService.update(id, req.body);

    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    await clientService.deleteClient(id);

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

};

export default {
  getAll,
  createClient,
  getId,
  updateClient,
  deleteClient
};