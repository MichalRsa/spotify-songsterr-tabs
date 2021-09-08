import express from 'express';
// import cors from 'cors';

const spotifyAuth =
  'https://accounts.spotify.com/authorize?client_id=378f1ce509b643ae809011e62f85b8d9&response_type=code&redirect_uri=http://localhost:8080/&state=34fFs29kd09';

// const randomRedirect =
//   'https://stackoverflow.com/questions/33188989/allowing-frontend-javascript-post-requests-to-https-accounts-spotify-com-api-t';
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
// app.use(cors);

app.get('/api', (req, res) => {
  //   console.log(req);
  //  sprubój tu dodać adress autoryzaycjny spotify     V
  // res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.redirect(spotifyAuth);
  //   .json({ działam: 'tak' });
});

app.get('/api/username', (req, res) => {
  res.json({ username: 'michał' });
});

app.listen(3000, () => console.log('Server is running'));
