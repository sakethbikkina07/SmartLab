import { Router } from 'express';
import { assessmentController } from '../controllers/assessmentController.js';

const router = Router();

router.get('/', assessmentController.listAssessments);
router.post('/schedule', assessmentController.scheduleAssessment);
router.post('/submit-exam', assessmentController.submitExam);
router.get('/viva/questions', assessmentController.listVivaQuestions);
router.post('/viva/evaluate', assessmentController.evaluateViva);

export default router;

