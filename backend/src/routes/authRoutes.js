import { Router } from 'express';
import { authController } from '../controllers/authController.js';

const router = Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/registration-requests', authController.getRegistrationRequests);
router.patch('/registration-requests/:id', authController.updateRegistrationRequestStatus);
router.get('/me', authController.me);
router.post('/forgot-password', authController.forgotPassword);
router.post('/logout', authController.logout);

export default router;

