import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { songsterrSearch } from 'songsterr-api-node';

/* eslint-disable camelcase */

export const artistController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { access_token } = req.body.tokens;
    const { id } = req.body;
    const { data } = await axios.get(
      `https://api.spotify.com/v1/artists/${id}`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

export const artistsTracksController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { access_token } = req.body.tokens;
    const { id } = req.body;
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
    res.json({ songsData });
  } catch (err) {
    next(err);
  }
};

export const artistsAlbumsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { access_token } = req.body.tokens;
    const { id, offset, limit } = req.body;
    const { data } = await axios.get(
      `https://api.spotify.com/v1/artists/${id}/albums?offset=${offset}&limit=${limit}&include_groups=album`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
    const idsArray = data.items.map((song: any) => song.id);
    const ids = idsArray.join(',');

    const { data: albumsData } = await axios.get(
      `https://api.spotify.com/v1/albums?ids=${ids}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    res.json({ albumsData, paginationData: data });
  } catch (err) {
    next(err);
  }
};

export const albumsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { access_token } = req.body.tokens;
    const { id } = req.body;
    const { data: albumData } = await axios.get(
      `https://api.spotify.com/v1/albums/${id}`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
    const { data: songsData } = await axios.get(
      `https://api.spotify.com/v1/albums/${id}/tracks`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
    res.json({ songsData, albumData });
  } catch (err) {
    next(err);
  }
};

export const tabsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, artist } = req.body;
    const shortTitle = title.split('-')[0];
    const results = await songsterrSearch(encodeURIComponent(shortTitle));
    const filteredResults = Array.isArray(results)
      ? results.filter((song) => song.artist === artist)
      : results;
    res.json({ song: filteredResults });
  } catch (err) {
    next(err);
  }
};

export const SearchController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { access_token } = req.body.tokens;
    const { inputValue } = req.body;
    const { data } = await axios.get(
      `https://api.spotify.com/v1/search?q=${inputValue}&type=album,artist,playlist,track`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    res.json(data);
  } catch (err) {
    next(err);
  }
};
