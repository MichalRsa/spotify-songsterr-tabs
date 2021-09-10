"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable camelcase */
var axios_1 = __importDefault(require("axios"));
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
// import { Buffer } from 'buffer';
dotenv_1.default.config();
var spotifyAuth = 'https://accounts.spotify.com/authorize?client_id=378f1ce509b643ae809011e62f85b8d9&response_type=code&redirect_uri=http://localhost:8080/redirect&state=34fFs29kd09';
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, auth-token, access-control-allow-origin');
    next();
});
app.get('/api', function (req, res) {
    res.redirect(spotifyAuth);
});
app.get('/api/songs', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1.default.get("https://www.songsterr.com/api/songs?size=50&pattern=metallica")];
            case 1:
                data = (_a.sent()).data;
                res.json({ songs: data });
                return [2 /*return*/];
        }
    });
}); });
app.post("/api/auth", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var code, reqData, encodedAuthToken, reqConfig, data, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = req.body.code;
                console.log(code);
                reqData = {
                    grant_type: 'authorization_code',
                    code: code,
                    redirect_uri: 'http://localhost:8080/redirect',
                };
                encodedAuthToken = Buffer.from(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET).toString('base64');
                reqConfig = {
                    headers: {
                        Authorization: "Basic " + encodedAuthToken,
                        'content-type': 'application/x-www-form-urlencoded',
                    },
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, axios_1.default.post("https://accounts.spotify.com/api/token", new URLSearchParams(reqData), reqConfig)];
            case 2:
                data = (_a.sent()).data;
                res.json(data);
                console.log('data resived from spotify api', data);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                if (err_1.response) {
                    console.log(err_1.response.data);
                    console.log(err_1.response.status);
                    console.log(err_1.response.headers);
                }
                else if (err_1.request) {
                    console.log(err_1.request);
                }
                else {
                    console.log('Error', err_1.message);
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.listen(3000, function () { return console.log('Server is running'); });
