/* eslint-disable camelcase */
import axios from 'axios';
import express, { Request, Response } from 'express';
import { songsterrSearch } from 'songsterr-api-node';
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
    try {
      //     const { refresh_token, access_token } = await exchangeSpotifyToken(
      //       tokenFromStorage
      //     );
      const { access_token, refresh_token } = req.body.tokens;
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

router.post(
  '/artists',
  exchangeTokenMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { access_token, refresh_token } = req.body.tokens;
      const { id, name } = req.body;
      console.log(name);
      const { data } = await axios.get(
        `https://api.spotify.com/v1/artists/${id}/top-tracks?market=us`,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
      const idsArray = data.tracks.map((song: any) => song.id);
      const ids = idsArray.join(',');

      const { data: songsData } = await axios.get(
        `https://api.spotify.com/v1/tracks?ids=${ids}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
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

router.post(
  '/albums',
  exchangeTokenMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { access_token, refresh_token } = req.body.tokens;
      const { id } = req.body;
      const { data } = await axios.get(
        `https://api.spotify.com/v1/albums/${id}/tracks`,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
      const idsArray = data.items.map((song: any) => song.id);
      const ids = idsArray.join(',');

      const { data: songsData } = await axios.get(
        `https://api.spotify.com/v1/tracks?ids=${ids}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log(data);
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

router.post('/tabs', async (req, res) => {
  const { title, artist } = req.body;
  console.log('tabs route ======================', title, artist);
  const results = await songsterrSearch(encodeURIComponent(title));
  //   !Array.isArray(results) && console.log(results);
  const filteredResults = Array.isArray(results)
    ? results.filter((song) => song.artist === artist)
    : results;
  res.json({ song: filteredResults });
});

export default router;
