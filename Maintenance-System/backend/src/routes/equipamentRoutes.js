import express from "express";

const router = express.Router();

import equipamentController from "../controllers/equipamentController.js";

router.get("/", equipamentController.getAll);

router.get("/:id", equipamentController.getId);

router.post("/", equipamentController.createEquipament);

router.put("/:id", equipamentController.updateEquipament);

router.delete("/:id", equipamentController.deleteEquipament);

export default router;