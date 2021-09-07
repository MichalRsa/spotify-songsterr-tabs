import express from 'express';

const app = express();

app.use(express.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT, PATCH, DELETE'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, auth-token'
  );
  next();
});

app.get('/api', (req, res) => res.json({ przywitanko: 'Siemaaaa' }));

app.listen(3000, () => console.log('Server is running'));
