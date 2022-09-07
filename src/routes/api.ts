import { Router } from 'express';
import items from './items';
import search from './search';

const router = Router();
router.use('/search', search);
router.use('/items', items);



router.get('/status', (req, res) => {
    res.json({ status: 'online', version: '1.0.0' });
  });
  
  export default router;