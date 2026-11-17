import express from "express";

const router = express.Router();

import workOrderController from "../controllers/workOrderController.js";
import { requireAuth } from "../middlewares/auth.js";

router.get("/", requireAuth, workOrderController.getAll);

router.get("/:id", requireAuth, workOrderController.getById);

router.post("/", requireAuth, workOrderController.create);

router.put("/:id", requireAuth, workOrderController.update);

router.delete("/:id", requireAuth, workOrderController.deleteWorkOrder);

export default router;