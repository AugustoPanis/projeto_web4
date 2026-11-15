import express from "express";

const router = express.Router();

import locationController from "../controllers/locationController.js";
import { requireAuth } from "../middlewares/auth.js";

router.get("/", requireAuth, locationController.getAll);

router.get("/:id", requireAuth, locationController.getById);

router.post("/", requireAuth, locationController.create);

router.put("/:id", requireAuth, locationController.update);

router.delete("/:id", requireAuth, locationController.deleteLocation);

export default router;