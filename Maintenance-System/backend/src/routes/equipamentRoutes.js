const express = require("express");

const router = express.Router();

const equipamentController = require("../controllers/equipamentController");

router.get("/", equipamentController.getAll);

router.get("/:id", equipamentController.getId);

router.post("/", equipamentController.createBarbershop);

router.put("/:id", equipamentController.updateBarbershop);

router.delete("/:id", equipamentController.deleteBarbershop);

module.exports = router;