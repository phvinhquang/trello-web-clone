import express from "express";
import { boardValidation } from "../../validations/boardValidation.js";
import { boardController } from "../../controllers/boardController.js";

const router = express.Router();

router.get("/board/:id", boardController.getDetails);

// Tạo board mới
router.post("/board", boardValidation.createNew, boardController.createNew);

export default router;
