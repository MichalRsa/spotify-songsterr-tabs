/* eslint-disable camelcase */
import axios from 'axios';
import express, { Request, Response } from 'express';
import exchangeTokenMiddleware from '../middleware/exchangeTokenMiddleware';

const router = express.Router();

router.post(
  '/albums',
  exchangeTokenMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { access_token } = req.body.tokens;
      const { data } = await axios.get(`https://api.spotify.com/v1/me/albums`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      res.json({ data });
    } catch (err: any) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.log('Error', err.message);
      }
    }
  }
);
router.post(
  '/recent',
  exchangeTokenMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { access_token } = req.body.tokens;
      const { data } = await axios.get(
        `https://api.spotify.com/v1/me/player/recently-played?limit=50`,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
      const idsArray = data.items.map((song: any) => song.track.id);
      const ids = idsArray.join(',');

      const { data: songsData } = await axios.get(
        `https://api.spotify.com/v1/tracks?ids=${ids}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      res.json({ songsData });
    } catch (err: any) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.log('Error', err.message);
      }
    }
  }
);

router.post(
  '/albums',
  exchangeTokenMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { access_token } = req.body.tokens;
      const { data } = await axios.get(`https://api.spotify.com/v1/me/albums`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      res.json({ data });
    } catch (err: any) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.log('Error', err.message);
      }
    }
  }
);

router.post(
  '/tracks',
  exchangeTokenMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { access_token } = req.body.tokens;
      const { data } = await axios.get(
        `https://api.spotify.com/v1/me/tracks?limit=50`,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
      const idsArray = data.items.map((song: any) => song.track.id);
      const ids = idsArray.join(',');

      const { data: songsData } = await axios.get(
        `https://api.spotify.com/v1/tracks?ids=${ids}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      res.json({ songsData });
    } catch (err: any) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.log('Error', err.message);
      }
    }
  }
);

export default router;
