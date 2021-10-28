# spotify-songsterr-tabs

[`Live preview`](https://fast-ridge-27303.herokuapp.com/)

![app main page](imgs\aplikacjaMain.png)

This app integrate two APIs. First, it fetches user privte data from Spotify, then looks at Songsterr if tabs for given song exist.
It is necessary for user to login with his Spotify account and allow app to fetch his private data. 
App asks for access for following [`Spotify scopes`](https://developer.spotify.com/documentation/general/guides/scopes/):
- user-read-recently-played 
- user-top-read 
- user-library-read
- playlist-read-private

After successful login, app shows user his tracks and playlists and display guitar tuning, if those songs have according tabs.

STACK:
- bundler: [`Webpack`](https://webpack.js.org/)
- language: [`TypeScript`](https://www.typescriptlang.org/)
- frontend library: [`React`](https://reactjs.org/)
- styles: [`Material ui`](https://mui.com/)
- backend framework: [`Express`](https://expressjs.com/)
- User authorzation: [`Spotify Auth`](https://developer.spotify.com/documentation/general/guides/authorization-guide/) with [`OAuth 2.0 protocol`](https://oauth.net/articles/authentication/)
- APIs: 
  - [`Spotify Web API`](https://developer.spotify.com/documentation/web-api/)
  - [`Songsterr`](https://www.songsterr.com/)
  
