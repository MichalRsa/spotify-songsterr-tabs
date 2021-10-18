/* eslint-disable camelcase */
import axios from 'axios';
import { NextFunction, Request, Response } from 'express';

export const userAlbumController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    next(err);
  }
};

export const userTracksController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    next(err);
  }
};

export const userRecentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { access_token } = req.body.tokens;
    // eslint-disable-next-line no-undef
    const { data }: { data: SpotifyApi.UsersRecentlyPlayedTracksResponse } =
      await axios.get(
        `https://api.spotify.com/v1/me/player/recently-played?limit=50`,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
    const removeDuplicates = (a: any) => {
      const seen = new Set();
      const filtered = [...a];
      return filtered.filter((item: any) => {
        const trackId = item.track.id;
        return seen.has(trackId) ? false : seen.add(trackId);
      });
    };
    const filteredData = removeDuplicates(data.items);
    const dataWithoutDuplicates = { ...data, items: filteredData };
    console.log(filteredData);
    console.log(
      '================================================',
      dataWithoutDuplicates.items.length
    );
    console.log(
      '================================================',
      data.items.length
    );

    const idsArray = dataWithoutDuplicates.items.map(
      (song: any) => song.track.id
    );
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
    next(err);
  }
};
