import { Router } from 'express';
import { analyticsController } from '../controllers/analyticsController.js';

const router = Router();

router.get('/summary', analyticsController.getCollegeSummary);
router.post('/internal-marks', analyticsController.calculateInternalMarks);
router.get('/department', analyticsController.getDepartmentPerformance);

export default router;

