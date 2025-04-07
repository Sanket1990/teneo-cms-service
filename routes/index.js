import express from "express";
import documentRoutes from "./documents/index.js";

const router = express.Router();

// Attach routes
router.use("/documents", documentRoutes);

export default router;
