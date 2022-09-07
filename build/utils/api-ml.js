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
exports.search = exports.getDescriptionItem = exports.getItem = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const apiEndpoint = `https://api.mercadolibre.com`;
// const agent = new https.Agent({ rejectUnauthorized: false });
const getItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield (0, node_fetch_1.default)(`${apiEndpoint}/items/${id}`, {
        headers: {
            method: 'GET',
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
        // ,    agent: agent
    });
    if (!resp.ok) {
        var data = yield resp.text();
        throw new Error(data);
    }
    return yield resp.json();
});
exports.getItem = getItem;
//https://api.mercadolibre.com/items/MLA928422060/description
const getDescriptionItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield (0, node_fetch_1.default)(`${apiEndpoint}/items/${id}/description`, {
        headers: {
            method: 'GET',
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
        // ,    agent: agent
    });
    if (!resp.ok) {
        var data = yield resp.text();
        throw new Error(data);
    }
    return yield resp.json();
});
exports.getDescriptionItem = getDescriptionItem;
const search = (find) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield (0, node_fetch_1.default)(`${apiEndpoint}/sites/MLA/search?q=${encodeURIComponent(find)}`, {
        headers: {
            method: 'GET',
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    });
    if (!resp.ok) {
        var data = yield resp.text();
        throw new Error(data);
    }
    return yield resp.json();
});
exports.search = search;
