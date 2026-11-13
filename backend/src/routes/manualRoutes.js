import { Router } from 'express';
import { manualController } from '../controllers/manualController.js';

const router = Router();

router.get('/', manualController.listManuals);
router.post('/upload', manualController.uploadManual);
router.post('/extract', manualController.extractManual);
router.post('/publish', manualController.publishExperiments);

export default router;

