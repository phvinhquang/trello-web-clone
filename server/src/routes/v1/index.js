import express from "express";
const router = express.Router();

router.get("/status", (req, res) => {
  res.send("<h1>Hello </h1>");
});

export default router;
