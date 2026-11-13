import { Router } from 'express';
import { codeController } from '../controllers/codeController.js';

const router = Router();

router.post('/run', codeController.run);
router.post('/submit', codeController.submit);
router.post('/review', codeController.review);
router.post('/similarity', codeController.similarity);

export default router;

