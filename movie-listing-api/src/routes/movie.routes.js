// Movie routes

const express = require('express')
const router = express.Router()


const movieController = require('../controllers/movie.controller')
const {protected, admin} = require('../middleware/auth.middleware')

// Create movie (admin only)
router.post('/', protected, admin, movieController.createMovie);

// Get all Movies 
router.get('/', movieController.getMovies);

// Get single movie 
router.get('/:id', movieController.getMovieById);

// Update movie (admin only)
router.put('/:id', protected,admin, movieController.updateMovie)

// Delete movie 
router.delete('/:id', protected, admin, movieController.deleteMovie)

module.exports = router;