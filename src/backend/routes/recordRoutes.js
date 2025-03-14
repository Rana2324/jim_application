import { Router } from 'express';
import recordController from '../controllers/recordController.js';

//call the router
const router = Router();

//basic routes
router.get('/', recordController.getAll);
router.get('/:recordId', recordController.getOne);
router.post('/', recordController.create);
router.patch('/:recordId', recordController.update);
router.delete('/:recordId', recordController.delete);

export default router;
