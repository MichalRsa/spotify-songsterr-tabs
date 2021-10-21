import express from 'express';
import {
  authController,
  redirectController,
  sendTestUserTokenController,
} from '../controllers/userControllers';

const router = express.Router();

router.get('/', redirectController);

router.post('/auth', authController);

router.post('/test-user', sendTestUserTokenController);

export default router;
