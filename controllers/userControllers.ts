/* eslint-disable camelcase */
import axios from 'axios';
import { Request, Response } from 'express';
import params from '../utils/songsterQueryParameters';

const spotifyAuth = `https://accounts.spotify.com/authorize?client_id=${params.client_id}&scope=${params.scope}&response_type=${params.response_type}&redirect_uri=${params.redirect_uri}&state=${params.state}`;

export const redirectController = (req: Request, res: Response) => {
  res.redirect(spotifyAuth);
};

export const authController = async (req: Request, res: Response) => {
  const { code } = req.body;
  const reqData = {
    grant_type: 'authorization_code',
    code,
    redirect_uri: params.redirect_uri,
  };

  const encodedAuthToken = Buffer.from(
    `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
  ).toString('base64');
  const reqConfig = {
    headers: {
      Authorization: `Basic ${encodedAuthToken}`,
      'content-type': 'application/x-www-form-urlencoded',
    },
  };
  try {
    const {
      data: { refresh_token, access_token },
    } = await axios.post(
      `https://accounts.spotify.com/api/token`,
      new URLSearchParams(reqData),
      reqConfig
    );
    const { data: userData } = await axios.get(
      `https://api.spotify.com/v1/me`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
    res.json({ refresh_token, userData });
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
