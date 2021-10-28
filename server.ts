import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import renderHeaders from './controllers/renderHeaders';
import userRoutes from './routes/userRoutes';
import songsRoutes from './routes/songsRoutes';
import userLibraryRoutes from './routes/userLibraryRoutes';
import logErrorMiddleware from './middleware/logErrorMiddleware';

const path = require('path');

dotenv.config();

let port = typeof process.env.PORT === 'string' && parseFloat(process.env.PORT);

const app = express();

app.use(express.json());

app.use((req, res, next) => renderHeaders(req, res, next));

app.use('/api/user', userRoutes);

app.use('/api/songs', songsRoutes);

app.use('/api/user-library', userLibraryRoutes);

if (port) {
  app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
  });
}

app.use(logErrorMiddleware);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.response?.status === 400) {
    res
      .status(400)
      .send({ error: err.response.data.error.message, status: 400 });
    console.log('====================== status 400');
  }
});

if (typeof port !== 'number') {
  port = 3000;
}

app.listen(port, () => console.log(`Server is running on port ${port}`));
