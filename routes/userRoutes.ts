import express from 'express';
import {
  authController,
  redirectController,
} from '../controllers/userControllers';

const router = express.Router();

router.get('/', redirectController);

router.post('/auth', authController);

export default router;
