import express from 'express';
import { getClientFiles } from '../controllers/files';

const router = express.Router();

// GET /api/client-files
router.get('/', getClientFiles);

export default router;
