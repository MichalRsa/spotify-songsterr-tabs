/* eslint-disable camelcase */
import axios from 'axios';
import express from 'express';
import dotenv from 'dotenv';
// import params from './utils/songsterQueryParameters';
import exchangeSpotifyToken from './utils/getSpotifyData';
import renderHeaders from './controllers/renderHeaders';
import userRoutes from './routes/userRoutes';
dotenv.config();

// const spotifyAuth = `https://accounts.spotify.com/authorize?client_id=${params.client_id}&scope=${params.scope}&response_type=${params.response_type}&redirect_uri=${params.redirect_uri}&state=${params.state}`;

const app = express();

app.use(express.json());

app.use((req, res, next) => renderHeaders(req, res, next));

app.use('/api/user', userRoutes);

app.get('/api/songs', async (req, res) => {
  const { data } = await axios.get(
    `https://www.songsterr.com/api/songs?size=50&pattern=metallica`
  );
  res.json({ songs: data });
});

app.post('/api/home', async (req, res) => {
  const { tokenFromStorage } = req.body;
  console.log(tokenFromStorage);
  console.log(req.body);
  try {
    const { refresh_token, access_token } = await exchangeSpotifyToken(
      tokenFromStorage
    );

    const { data: songsData } = await axios.get(
      `https://api.spotify.com/v1/me/player/recently-played`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
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
});

app.listen(3000, () => console.log('Server is running'));
