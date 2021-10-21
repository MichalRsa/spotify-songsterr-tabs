/* eslint-disable camelcase */
import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import params from '../utils/songsterQueryParameters';

const spotifyAuth = `https://accounts.spotify.com/authorize?client_id=${params.client_id}&scope=${params.scope}&response_type=${params.response_type}&redirect_uri=${params.redirect_uri}&state=${params.state}`;

export const redirectController = (req: Request, res: Response) => {
  res.redirect(spotifyAuth);
};

export const authController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
  } catch (err) {
    next(err);
  }
};

export const sendTestUserTokenController = (req: Request, res: Response) => {
  const refresh_token =
    'AQDn1bKlGv-FiQ2hJ8VEkaS29Qd2quXI8qmnyVhqm2OO78ZshcR8vIXkqNYPPKvl8GKFNdA0gL3_dv8aEki-tJnFu8oPSGLpRLP9UmO1jdnERFe-rkClOEO0EFeRvbXNuwI';
  const userData = {
    display_name: 'TestUser',
    external_urls: {
      spotify: 'https://open.spotify.com/user/0bqpqp05sgu2gyvqbjp5ox5uv',
    },
    followers: { href: null, total: 0 },
    href: 'https://api.spotify.com/v1/users/0bqpqp05sgu2gyvqbjp5ox5uv',
    id: '0bqpqp05sgu2gyvqbjp5ox5uv',
    images: [],
    type: 'user',
    uri: 'spotify:user:0bqpqp05sgu2gyvqbjp5ox5uv',
  };

  res.json({ refresh_token, userData });
  console.log('================================================== path called');
};
