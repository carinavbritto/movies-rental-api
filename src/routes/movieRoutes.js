const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/movies', movieController.getMovies);
router.post('/movies/reserve', movieController.reserveMovie);
router.post('/movies/lease', movieController.leaseMovie);
router.post('/movies/return', movieController.returnMovie);
router.post('/movies', movieController.addMovie);
router.put('/movies/:id', movieController.updateMovie);
router.delete('/movies/:id', movieController.deleteMovie);

module.exports = router;
