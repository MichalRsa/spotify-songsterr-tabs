import express from 'express';
import dotenv from 'dotenv';
import renderHeaders from './controllers/renderHeaders';
import userRoutes from './routes/userRoutes';
import songsRoutes from './routes/songsRoutes';
import userLibraryRoutes from './routes/userLibraryRoutes';
dotenv.config();

const app = express();

app.use(express.json());

app.use((req, res, next) => renderHeaders(req, res, next));

app.use('/api/user', userRoutes);

app.use('/api/songs', songsRoutes);

app.use('/api/user-library', userLibraryRoutes);

let port = typeof process.env.PORT === 'string' && parseFloat(process.env.PORT);
if (port == null) {
  port = 3000;
}
app.listen(port);

app.listen(port, () => console.log('Server is running'));
