import express from "express";

const router = express.Router();

import clientController from "../controllers/clientController.js";

router.get("/", clientController.getAll);

router.get("/:id", clientController.getId);

router.post("/", clientController.createClient);

router.put("/:id", clientController.updateClient);

router.delete("/:id", clientController.deleteClient);

export default router;