// Movie controller
// Handles movie CRUD operations

const Movie = require("../models/movie.model");

// Create movie
/**
 * - POST /api/movies
 */
exports.createMovie = async (req, res, next) => {
  const { title, description, genre, releaseYear, averageRating } = req.body;
  try {
    const movie = await Movie.create({
      title,
      description,
      genre,
      releaseYear,
      createdBy: req.user._id,
      averageRating,
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
    //1.read query parameter
    const { search, genre, page = 1, limit = 10 } = req.query;
    // 2. create filter object
    const filter = {};
    // 3.Search by title
    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

    //4. filter by genre
    if (genre) {
      filter.genre = genre;
    }

    // 5.pagination calculation
    const skip = (page - 1) * limit;

    const movies = await Movie.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .populate("createdBy", "name email");

    // 6.count total movies

    const totalMovies = await Movie.countDocuments(filter);

    res.json({
      totalMovies,
      currentPage: Number(page),
      totalPage: Math.ceil(totalMovies / limit),
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
