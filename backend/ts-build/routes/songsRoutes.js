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
var songsterr_api_node_1 = require("songsterr-api-node");
var exchangeTokenMiddleware_1 = __importDefault(require("../middleware/exchangeTokenMiddleware"));
// import exchangeSpotifyToken from '../utils/getSpotifyData';
var router = express_1.default.Router();
router.get('/random', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
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
// router.post(
//   '/recent',
//   exchangeTokenMiddleware,
//   async (req: Request, res: Response) => {
//     //   const { tokenFromStorage } = req.body;
//     try {
//       //     const { refresh_token, access_token } = await exchangeSpotifyToken(
//       //       tokenFromStorage
//       //     );
//       const { access_token, refresh_token } = req.body.tokens;
//       const { data } = await axios.get(
//         `https://api.spotify.com/v1/me/player/recently-played?limit=50`,
//         {
//           headers: { Authorization: `Bearer ${access_token}` },
//         }
//       );
//       const idsArray = data.items.map((song: any) => song.track.id);
//       const ids = idsArray.join(',');
//       const { data: songsData } = await axios.get(
//         `https://api.spotify.com/v1/tracks?ids=${ids}`,
//         {
//           headers: {
//             Authorization: `Bearer ${access_token}`,
//           },
//         }
//       );
//       res.json({ songsData, refresh_token });
//     } catch (err: any) {
//       if (err.response) {
//         console.log(err.response.data);
//         console.log(err.response.status);
//         console.log(err.response.headers);
//       } else if (err.request) {
//         console.log(err.request);
//       } else {
//         console.log('Error', err.message);
//       }
//     }
//   }
// );
router.post('/artists', exchangeTokenMiddleware_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, access_token, refresh_token, _b, id, name_1, data, idsArray, ids, songsData, err_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                _a = req.body.tokens, access_token = _a.access_token, refresh_token = _a.refresh_token;
                _b = req.body, id = _b.id, name_1 = _b.name;
                console.log(name_1);
                return [4 /*yield*/, axios_1.default.get("https://api.spotify.com/v1/artists/" + id + "/top-tracks?market=us", {
                        headers: { Authorization: "Bearer " + access_token },
                    })];
            case 1:
                data = (_c.sent()).data;
                idsArray = data.tracks.map(function (song) { return song.id; });
                ids = idsArray.join(',');
                return [4 /*yield*/, axios_1.default.get("https://api.spotify.com/v1/tracks?ids=" + ids, {
                        headers: {
                            Authorization: "Bearer " + access_token,
                        },
                    })];
            case 2:
                songsData = (_c.sent()).data;
                res.json({ songsData: songsData, refresh_token: refresh_token });
                return [3 /*break*/, 4];
            case 3:
                err_1 = _c.sent();
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
router.post('/albums', exchangeTokenMiddleware_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, access_token, refresh_token, id, data, idsArray, ids, songsData, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body.tokens, access_token = _a.access_token, refresh_token = _a.refresh_token;
                id = req.body.id;
                return [4 /*yield*/, axios_1.default.get("https://api.spotify.com/v1/albums/" + id + "/tracks", {
                        headers: { Authorization: "Bearer " + access_token },
                    })];
            case 1:
                data = (_b.sent()).data;
                idsArray = data.items.map(function (song) { return song.id; });
                ids = idsArray.join(',');
                return [4 /*yield*/, axios_1.default.get("https://api.spotify.com/v1/tracks?ids=" + ids, {
                        headers: {
                            Authorization: "Bearer " + access_token,
                        },
                    })];
            case 2:
                songsData = (_b.sent()).data;
                console.log(data);
                res.json({ songsData: songsData, refresh_token: refresh_token });
                return [3 /*break*/, 4];
            case 3:
                err_2 = _b.sent();
                if (err_2.response) {
                    console.log(err_2.response.data);
                    console.log(err_2.response.status);
                    console.log(err_2.response.headers);
                }
                else if (err_2.request) {
                    console.log(err_2.request);
                }
                else {
                    console.log('Error', err_2.message);
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post('/tabs', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, artist, results, filteredResults;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, title = _a.title, artist = _a.artist;
                console.log('tabs route ======================', title, artist);
                return [4 /*yield*/, (0, songsterr_api_node_1.songsterrSearch)(encodeURIComponent(title))];
            case 1:
                results = _b.sent();
                filteredResults = Array.isArray(results)
                    ? results.filter(function (song) { return song.artist === artist; })
                    : results;
                res.json({ song: filteredResults });
                return [2 /*return*/];
        }
    });
}); });
exports.default = router;
