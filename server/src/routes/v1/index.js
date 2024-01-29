import express from "express";
import { boardValidation } from "../../validations/boardValidation.js";

const router = express.Router();

router.post("/boards", boardValidation.createNew);

export default router;
