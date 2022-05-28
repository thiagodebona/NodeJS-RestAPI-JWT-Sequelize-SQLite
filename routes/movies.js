const router = require('express').Router();

const authMiddleware = require('../middlawares/authMiddleware');

const { deleteMovie, getAllMovies, getMovieById, insertMovie, updateMovie } = require("../repositories/moviesRepository");

router.get('/', authMiddleware, getAllMovies);
router.post('/', authMiddleware, insertMovie);

router.get('/:id', authMiddleware, getMovieById);
router.put('/:id', authMiddleware, updateMovie);

router.delete('/:id', authMiddleware, deleteMovie);

module.exports = router;