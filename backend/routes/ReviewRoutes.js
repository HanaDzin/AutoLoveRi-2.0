import express from 'express';
const router = express.Router();

import { getNewestReviews } from '../controllers/reviewsController.js';

router.route('/').get(getNewestReviews);


export default router;