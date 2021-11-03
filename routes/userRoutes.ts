import express from 'express';
import {
  authController,
  redirectController,
  sendEmailController,
  sendTestUserTokenController,
} from '../controllers/userControllers';

const router = express.Router();

router.get('/', redirectController);

router.post('/auth', authController);

router.post('/test-user', sendTestUserTokenController);

router.post('/send-email', sendEmailController);

export default router;
