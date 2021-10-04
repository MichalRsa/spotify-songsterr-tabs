import express from 'express';
import dotenv from 'dotenv';
import renderHeaders from './controllers/renderHeaders';
import userRoutes from './routes/userRoutes';
import songsRoutes from './routes/songsRoutes';
import userLibraryRoutes from './routes/userLibraryRoutes';

const path = require('path');

dotenv.config();

let port = typeof process.env.PORT === 'string' && parseFloat(process.env.PORT);

const app = express();

if (port) {
  app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));
}

app.use(express.json());

app.use((req, res, next) => renderHeaders(req, res, next));

app.use('/api/user', userRoutes);

app.use('/api/songs', songsRoutes);

app.use('/api/user-library', userLibraryRoutes);

if (typeof port !== 'number') {
  port = 3000;
}

app.listen(port, () => console.log('Server is running'));
