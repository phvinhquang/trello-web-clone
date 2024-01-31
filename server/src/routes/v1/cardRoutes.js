import express from "express";
import { cardValidation } from "../../validations/cardValidation.js";
import { cardController } from "../../controllers/cardController.js";

const router = express.Router();

router.post("/cards", cardValidation.createNew, cardController.createNew);

export default router;
