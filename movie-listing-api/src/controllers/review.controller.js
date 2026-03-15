const Review = require("../models/review.model");
const Movie = require("../models/movie.model");

exports.addReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const movieId = req.params.movieId;

    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    const existingReview = await Review.findOne({
      movie: movieId,
      user: req.user._id,
    });

    if (existingReview) {
      return res.status(400).json({
        message: "You already review this movie",
      });
    }

    const review = await Review.create({
      movie: movieId,
      user: req.user._id,
      rating,
      comment,
    });

    res.status(201).json({
      message: "Review added successfully!",
      review,
    });

    // 4️⃣ calculate average rating

    const reviews = await Review.find({ movie: movieId });

    const avgRating =
      reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length;

    // update movie rating
    movie.averageRating = avgRating;
    await movie.save();
  } catch (err) {
    next(err);
  }
};

exports.getMovieReviews = async (req, res, next) => {
  try {
    const movieId = req.params.movieId;

    const reviews = await Review.find({ movie: movieId }).populate(
      "user",
      "name email",
    );

    res.json({
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    next(error);
  }
};
