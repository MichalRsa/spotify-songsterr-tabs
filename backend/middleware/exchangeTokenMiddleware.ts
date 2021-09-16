/* eslint-disable camelcase */
import axios from 'axios';
import { NextFunction, Request, Response } from 'express';

const exchangeTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let tokenFromStorage = '';

  if (req.body && req.body.tokenFromStorage) {
    try {
      tokenFromStorage = req.body.tokenFromStorage;

      const reqData = {
        grant_type: 'refresh_token',
        refresh_token: tokenFromStorage,
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

      const {
        data: { access_token, refresh_token },
      }: { data: { access_token: string; refresh_token: string } } =
        await axios.post(
          `https://accounts.spotify.com/api/token`,
          new URLSearchParams(reqData),
          reqConfig
        );
      console.log('middleware', access_token, refresh_token);
      req.body.tokens = { access_token, refresh_token };
      next();
      //       return { access_token, refresh_token };
    } catch (err) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }
  if (!tokenFromStorage) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
};

export default exchangeTokenMiddleware;
