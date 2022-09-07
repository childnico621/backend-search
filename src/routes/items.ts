import { Router } from 'express';
import { getDetailItem, getDescriptionItem, search } from '../utils/api-ml';
import asyncHandler from '../middleware/async';


const router = Router();

// router.get('/', asyncHandler(async (req, res) => {
//     const { search } = req.query;
//     res.redirect('/items?search=' + search);
// }));


router.get('/', asyncHandler(async (req, res) => {
    const { q } = req.query;
    const items = await search(`${q}`);
    res.json(items);

}));

router.get('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const result = await getDetailItem(`${id}`);
    res.json(result);
    // res.json({})
}));


export default router;