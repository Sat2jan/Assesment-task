import express from 'express';
import {
  createResource,
  getAllResources,
  getResourceById,
  updateResourceById,
  deleteResourceById,
} from '../controllers/resourceController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { protectAdmin } from '../middlewares/roleMiddleware.js';
import { validateResource } from '../middlewares/validationMiddleware.js';

const router = express.Router();

router.post('/create', protect, protectAdmin, validateResource, createResource);
router.get('/all', protect, getAllResources);
router.get('/byld/:id', protect, getResourceById);
router.put('/update/:id', protect, protectAdmin, validateResource, updateResourceById);
router.delete('/delete/:id', protect, protectAdmin, deleteResourceById);

export default router;
