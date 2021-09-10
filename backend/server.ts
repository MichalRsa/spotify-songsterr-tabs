/* eslint-disable camelcase */
import axios from 'axios';
import express from 'express';
import dotenv from 'dotenv';
// import { Buffer } from 'buffer';
dotenv.config();

const spotifyAuth =
  'https://accounts.spotify.com/authorize?client_id=378f1ce509b643ae809011e62f85b8d9&response_type=code&redirect_uri=http://localhost:8080/redirect&state=34fFs29kd09';

const app = express();

app.use(express.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT, PATCH, DELETE'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, auth-token, access-control-allow-origin'
  );
  next();
});

app.get('/api', (req, res) => {
  res.redirect(spotifyAuth);
});

app.get('/api/songs', async (req, res) => {
  const { data } = await axios.get(
    `https://www.songsterr.com/api/songs?size=50&pattern=metallica`
  );
  res.json({ songs: data });
});

app.post(`/api/auth`, async (req, res) => {
  const { code } = req.body;
  console.log(code);
  const reqData = {
    grant_type: 'authorization_code',
    code,
    redirect_uri: 'http://localhost:8080/redirect',
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
    const { data } = await axios.post(
      `https://accounts.spotify.com/api/token`,
      new URLSearchParams(reqData),
      reqConfig
    );
    res.json(data);
    console.log('data resived from spotify api', data);
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
});

app.listen(3000, () => console.log('Server is running'));
