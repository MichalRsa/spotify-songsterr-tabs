import express from 'express';
import {
  userAlbumController,
  userRecentController,
  userTracksController,
} from '../controllers/userLibraryControllers';
import exchangeTokenMiddleware from '../middleware/exchangeTokenMiddleware';

const router = express.Router();

router.post('/albums', exchangeTokenMiddleware, userAlbumController);

router.post('/tracks', exchangeTokenMiddleware, userTracksController);

router.post('/recent', exchangeTokenMiddleware, userRecentController);

export default router;
