import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { songsterrSearch } from 'songsterr-api-node';

/* eslint-disable camelcase */
export const artistsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { access_token, refresh_token } = req.body.tokens;
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
    res.json({ songsData, refresh_token });
  } catch (err) {
    next(err);
    // if (err.response) {
    //   console.log(err.response.data);
    //   console.log(err.response.status);
    //   console.log(err.response.headers);
    // } else if (err.request) {
    //   console.log(err.request);
    // } else {
    //   console.log('Error', err.message);
    // }
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
    //   if (err.response) {
    //     console.log(err.response.data);
    //     console.log(err.response.status);
    //     console.log(err.response.headers);
    //   } else if (err.request) {
    //     console.log(err.request);
    //   } else {
    //     console.log('Error', err.message);
    //   }
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
    // if (err.response) {
    //   console.log(err.response.data);
    //   console.log(err.response.status);
    //   console.log(err.response.headers);
    // } else if (err.request) {
    //   console.log(err.request);
    // } else {
    //   console.log('Error', err.message);
    // }
  }
};

export const tabsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, artist } = req.body;
  const shortTitle = title.split('-')[0];
  console.log(shortTitle);
  const results = await songsterrSearch(encodeURIComponent(shortTitle));
  const filteredResults = Array.isArray(results)
    ? results.filter((song) => song.artist === artist)
    : results;
  res.json({ song: filteredResults });
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
