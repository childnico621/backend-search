"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import items from './items';
// import search from './search';
const router = (0, express_1.Router)();
// router.use('/search', search);
// router.use('/items', items);
router.get('/status', (req, res) => {
    res.json({ status: 'online', version: '1.0.0' });
});
exports.default = router;
