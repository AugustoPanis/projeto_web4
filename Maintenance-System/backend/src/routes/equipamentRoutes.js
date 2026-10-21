import express from "express";

const router = express.Router();

import equipamentController from "../controllers/equipamentController.js";

router.get("/", equipamentController.getAll);

router.get("/:id", equipamentController.getId);

router.post("/", equipamentController.createEquipament);

router.put("/:id", equipamentController.updateBarbershop);

router.delete("/:id", equipamentController.deleteBarbershop);

export default router;