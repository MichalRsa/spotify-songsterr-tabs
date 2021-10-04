"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var renderHeaders_1 = __importDefault(require("./controllers/renderHeaders"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var songsRoutes_1 = __importDefault(require("./routes/songsRoutes"));
var userLibraryRoutes_1 = __importDefault(require("./routes/userLibraryRoutes"));
var path = require('path');
dotenv_1.default.config();
var port = typeof process.env.PORT === 'string' && parseFloat(process.env.PORT);
var app = (0, express_1.default)();
if (port) {
    app.use(express_1.default.static(path.join(__dirname, '..', 'frontend', 'dist')));
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '..', 'frontend', 'dist'));
    });
}
app.use(express_1.default.json());
app.use(function (req, res, next) { return (0, renderHeaders_1.default)(req, res, next); });
app.use('/api/user', userRoutes_1.default);
app.use('/api/songs', songsRoutes_1.default);
app.use('/api/user-library', userLibraryRoutes_1.default);
if (typeof port !== 'number') {
    port = 3000;
}
app.listen(port, function () { return console.log('Server is running'); });
