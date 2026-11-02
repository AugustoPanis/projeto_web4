import express from "express";

const router = express.Router();

import equipamentController from "../controllers/equipamentController.js";
import { requireAuth } from "../middlewares/auth.js";

router.get("/", requireAuth, equipamentController.getAll);

router.get("/:id", requireAuth, equipamentController.getId);

router.post("/", requireAuth, equipamentController.createEquipament);

router.put("/:id", requireAuth, equipamentController.updateEquipament);

router.delete("/:id", requireAuth, equipamentController.deleteEquipament);

export default router;