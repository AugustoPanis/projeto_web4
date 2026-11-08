import express from "express";

const router = express.Router();

import technicianController from "../controllers/technicianController.js";

import { requireAuth } from "../middlewares/auth.js";

router.get("/", requireAuth, technicianController.getAll);

router.get("/:id", requireAuth, technicianController.getId);

router.post("/", requireAuth, technicianController.createTechnician);

router.put("/:id", requireAuth, technicianController.updateTechnician);

router.delete("/:id", requireAuth, technicianController.deleteTechnician);

export default router;