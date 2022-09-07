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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_ml_1 = require("../utils/api-ml");
const async_1 = __importDefault(require("../middleware/async"));
const router = (0, express_1.Router)();
router.get('/', (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search } = req.query;
    res.redirect('/items?search=' + search);
})));
router.get('/search', (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { textToSearch } = req.query;
    const items = yield (0, api_ml_1.search)(`${textToSearch}`);
    res.json(items);
})));
exports.default = router;
