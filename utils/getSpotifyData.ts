/* eslint-disable camelcase */
import axios from 'axios';

const exchangeSpotifyToken = async (refreshToken: string) => {
  const reqData = {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
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

  return { access_token, refresh_token };
};

export default exchangeSpotifyToken;
