import express from 'express';
import createDocument from './createDocument.js';
import getDocuments from './getDocuments.js';
import deleteDocument from './deleteDocument.js';

const router = express.Router();

// Attach routes
router.use('/', createDocument);
router.use('/', getDocuments);
router.use('/', deleteDocument);

export default router;
