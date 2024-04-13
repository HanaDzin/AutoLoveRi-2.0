import asyncHandler from "../middleware/asyncHandler.js";

import Review from "../models/reviewModel.js";

// @desc dohvat najnovije 3 recenzije
// @route GET /api/reviews
// @acces public
const getNewestReviews = asyncHandler (async (req, res) => {
    const reviews = await Review.find({}).sort({ createdAt: -1}).limit(3);
    res.json(reviews);
});


export {getNewestReviews};