import express from 'express';

const app = express();
app.use(express.json());

app.get('/', () => console.log('siema'));

app.listen(3000, () => console.log('Server is running'));
