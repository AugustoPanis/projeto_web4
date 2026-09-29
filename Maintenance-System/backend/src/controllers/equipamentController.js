const barbershopService = require("../services/barbershopService");


const createEquipament = async (req, res) => {
    try {
        const result = await barbershopService.create(req.body);

        return res.status(201).json(result);
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
};

const getAll = async (req, res) => {
    try {
        const result = await barbershopService.getAll();

        return res.json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

};

const getId = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await barbershopService.getId(id);
        
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updateEquipament = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await barbershopService.update(id, req.body);

        return res.json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deleteEquipament = async (req, res) => {
    try {
        const { id } = req.params;
        await barbershopService.deleteBarbershop(id);
        
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

};

module.exports = {
  getAll,
  createBarbershop: createEquipament,
  getId,
  updateBarbershop: updateEquipament,
  deleteBarbershop: deleteEquipament
};