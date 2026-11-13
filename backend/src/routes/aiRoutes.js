import { Router } from 'express';
import { aiController } from '../controllers/aiController.js';

const router = Router();

router.post('/chat', aiController.chat);
router.post('/generate-mcq', aiController.generateMCQ);

export default router;

