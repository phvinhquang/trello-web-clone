import express from "express";
import { columnValidation } from "../../validations/columnValidation.js";
import { columnController } from "../../controllers/columnController.js";

const router = express.Router();

// router.get("/columns");

// Tạo column mới
router.post("/columns", columnValidation.createNew, columnController.createNew);

// Cập nhật card trong cùng column
router.put("/columns/:id", columnValidation.update, columnController.update);

// Xóa column
router.delete(
  "/columns/:id",
  columnValidation.deleteItem,
  columnController.deleteItem
);

export default router;
