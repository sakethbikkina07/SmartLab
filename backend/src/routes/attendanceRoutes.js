import { Router } from 'express';
import { attendanceController } from '../controllers/attendanceController.js';

const router = Router();

router.post('/session', attendanceController.createSession);
router.post('/scan', attendanceController.scanQR);
router.get('/records', attendanceController.listRecords);

export default router;

