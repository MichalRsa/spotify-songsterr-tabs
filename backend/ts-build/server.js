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
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(function (req, res, next) { return (0, renderHeaders_1.default)(req, res, next); });
app.use('/api/user', userRoutes_1.default);
app.use('/api/songs', songsRoutes_1.default);
app.listen(3000, function () { return console.log('Server is running'); });
