import { Router } from 'express';
import { resourceController } from '../controllers/resourceController.js';

const router = Router();

// Key-value state persistence
router.get('/state', resourceController.getAllState);
router.get('/state/:key', resourceController.getState);
router.post('/state/:key', resourceController.setState);
router.put('/state/:key', resourceController.setState);

// Generic resource collections
router.get('/resources/:resource', resourceController.getAll);
router.get('/resources/:resource/:id', resourceController.getById);
router.post('/resources/:resource', resourceController.create);
router.put('/resources/:resource/:id', resourceController.update);
router.delete('/resources/:resource/:id', resourceController.remove);

export default router;

