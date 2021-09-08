"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// import cors from 'cors';
var spotifyAuth = 'https://accounts.spotify.com/authorize?client_id=378f1ce509b643ae809011e62f85b8d9&response_type=code&redirect_uri=http://localhost:8080/&state=34fFs29kd09';
// const randomRedirect =
//   'https://stackoverflow.com/questions/33188989/allowing-frontend-javascript-post-requests-to-https-accounts-spotify-com-api-t';
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, auth-token, access-control-allow-origin');
    next();
});
// app.use(cors);
app.get('/api', function (req, res) {
    //   console.log(req);
    //  sprubój tu dodać adress autoryzaycjny spotify     V
    // res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.redirect(spotifyAuth);
    //   .json({ działam: 'tak' });
});
app.get('/api/username', function (req, res) {
    res.json({ username: 'michał' });
});
app.listen(3000, function () { return console.log('Server is running'); });
