/* eslint-disable camelcase */
import axios from 'axios';
import express, { Request, Response } from 'express';
import exchangeTokenMiddleware from '../middleware/exchangeTokenMiddleware';
// import exchangeSpotifyToken from '../utils/getSpotifyData';

const router = express.Router();

router.get('/random', async (req, res) => {
  const { data } = await axios.get(
    `https://www.songsterr.com/api/songs?size=50&pattern=metallica`
  );
  res.json({ songs: data });
});

router.post(
  '/recent',
  exchangeTokenMiddleware,
  async (req: Request, res: Response) => {
    //   const { tokenFromStorage } = req.body;
    //   console.log(tokenFromStorage);
    //   console.log(req.body);
    try {
      //     const { refresh_token, access_token } = await exchangeSpotifyToken(
      //       tokenFromStorage
      //     );
      const { access_token, refresh_token } = req.body.tokens;
      const { data: songsData } = await axios.get(
        `https://api.spotify.com/v1/me/player/recently-played`,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );

      res.json({ songsData, refresh_token });
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
