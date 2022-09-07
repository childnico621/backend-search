"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// dotenv.config();
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const debug_1 = __importDefault(require("debug"));
const api_1 = __importDefault(require("./routes/api"));
const path_1 = __importDefault(require("path"));
const debug = (0, debug_1.default)('express');
const CLIENT_DIR = process.env.NODE_ENV === 'production' ? '../client-build' : '../../search-app/build';
const app = (0, express_1.default)();
//app.use(express.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.disable('x-powered-by');
app.use('/api', api_1.default);
if (process.env.NODE_ENV !== 'production') {
    app.get('/', (req, res) => {
        res.redirect('http://localhost:3000');
    });
}
else {
    app.use(express_1.default.static(path_1.default.join(__dirname, CLIENT_DIR)));
    app.get('/', function (req, res) {
        console.log('dirname is ' + __dirname + ', clientdir is ' + CLIENT_DIR);
        res.sendFile(path_1.default.join(__dirname, CLIENT_DIR, 'index.html'));
    });
    app.use(function (req, res, next) {
        if (req.method !== 'GET') {
            next();
            return;
        }
        if (req.path.lastIndexOf('.') > req.path.lastIndexOf('/')) {
            next();
            return;
        }
        console.log('returning index', req.path);
        res.sendFile(path_1.default.join(__dirname, CLIENT_DIR, 'index.html'));
    });
}
const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`App listening on port ${port}!`));
