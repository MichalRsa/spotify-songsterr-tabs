"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderHeaders = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, auth-token, access-control-allow-origin');
    next();
};
exports.default = renderHeaders;
