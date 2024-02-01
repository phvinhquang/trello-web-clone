import express from "express";
import { boardValidation } from "../../validations/boardValidation.js";
import { boardController } from "../../controllers/boardController.js";

const router = express.Router();

// Fetch board
router.get("/boards/:id", boardController.getDetails);

// Tạo board mới
router.post("/boards", boardValidation.createNew, boardController.createNew);

// Cập nhật thứ tự column cho board
router.put("/boards/:id", boardValidation.update, boardController.update);

export default router;
