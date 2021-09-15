import express from 'express';
import dotenv from 'dotenv';
import renderHeaders from './controllers/renderHeaders';
import userRoutes from './routes/userRoutes';
import songsRoutes from './routes/songsRoutes';
dotenv.config();

const app = express();

app.use(express.json());

app.use((req, res, next) => renderHeaders(req, res, next));

app.use('/api/user', userRoutes);

app.use('/api/songs', songsRoutes);

app.listen(3000, () => console.log('Server is running'));
