/* eslint-disable camelcase */
import axios from 'axios';
import { Request, Response } from 'express';

export const userAlbumController = async (req: Request, res: Response) => {
  try {
    const { access_token } = req.body.tokens;
    const { offset, limit } = req.body;
    const { data } = await axios.get(
      `https://api.spotify.com/v1/me/albums?offset=${offset}&limit=${limit}`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
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
};

export const userTracksController = async (req: Request, res: Response) => {
  try {
    const { access_token } = req.body.tokens;
    const { offset, limit } = req.body;
    const { data: songsData } = await axios.get(
      `https://api.spotify.com/v1/me/tracks?offset=${offset}&limit=${limit}`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
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
};

export const userRecentController = async (req: Request, res: Response) => {
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
};
