const express = require('express')
const router = express.Router()

const reviewController = require('../controllers/review.controller')
const {protected} = require('../middleware/auth.middleware')

router.post('/:movieId',protected, reviewController.addReview )
router.get('/:movieId', reviewController.getMovieReviews)




module.exports = router;