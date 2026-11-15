import express from "express";

const router = express.Router();

import categoryController from "../controllers/categoryController.js";
import { requireAuth } from "../middlewares/auth.js";

router.get("/", requireAuth, categoryController.getAll);

router.get("/:id", requireAuth, categoryController.getById);

router.post("/", requireAuth, categoryController.create);

router.put("/:id", requireAuth, categoryController.update);

router.delete("/:id", requireAuth, categoryController.deleteCategory);

export default router;