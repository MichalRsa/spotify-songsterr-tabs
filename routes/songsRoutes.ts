import express from 'express';
import {
  albumsController,
  artistsAlbumsController,
  artistsController,
  SearchController,
  tabsController,
} from '../controllers/songsControllers';
import exchangeTokenMiddleware from '../middleware/exchangeTokenMiddleware';

const router = express.Router();

router.post('/artists', exchangeTokenMiddleware, artistsController);

router.post(
  '/artists/albums',
  exchangeTokenMiddleware,
  artistsAlbumsController
);

router.post('/albums', exchangeTokenMiddleware, albumsController);

router.post('/tabs', tabsController);

router.post('/search', exchangeTokenMiddleware, SearchController);

export default router;
