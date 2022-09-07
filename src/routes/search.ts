import { Router } from 'express';
import {search} from '../utils/api-ml';
import asyncHandler from '../middleware/async';

const router = Router();

router.get('/', asyncHandler(async (req, res) => {
    const { search } = req.query;
    res.redirect('/items?search=' + search);
}));


router.get('/find', asyncHandler(async (req, res) => {
    const { textToSearch } = req.query;
    const items = await search(`${textToSearch}`);    
    res.json(items);

}));

export default router;