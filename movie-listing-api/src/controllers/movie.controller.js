// Movie controller
// Handles movie CRUD operations

const Movie = require("../models/movie.model");

// Create movie
/** 
* - POST /api/movies
*/
exports.createMovie = async (req, res, next) => {
  const { title, description, genre, releaseYear } = req.body;
  try {
    const movie = await Movie.create({
      title,
      description,
      genre,
      releaseYear,
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Movie created successfully",
      movie,
    });
  } catch (err) {
    next(err);
  }
};

// Get movies
/** 
* - GET /api/movies/
*/
exports.getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find().populate("createdBy", "name email");

    res.json({
      count: movies.length,
      movies,
    });
  } catch (err) {
    next(err);
  }
};

// get single movie
/** 
* - GET /api/movies/:id
*/
exports.getMovieById = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id).populate(
      "createdBy",
      "name email",
    );

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }
    res.json(movie);
  } catch (err) {
    next(err);
  }
};

// Update movie
/** 
* - PUT /api/movies/:id
*/
exports.updateMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndUpdate()(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    res.json({
      message: "Movie updated",
      movie,
    });
  } catch (err) {
    next(err);
  }
};

// Delete movie
/** 
* - DELETE /api/movies/:id
*/
exports.deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) {
      res.status(404).json({
        message: "Movie not found",
      });
    }

    res.json({
      message: "Movie deleted successfully!",
    });
  } catch (err) {
    next(err);
  }
};
