import express from "express";
import createDocument from "./createDocument.js";
import getDocuments from "./getDocuments.js";

const router = express.Router();

// Attach routes
router.use("/", createDocument);
router.use("/", getDocuments);

export default router;