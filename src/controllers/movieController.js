const Movie = require('../models/movieModel');
const Reservation = require('../models/reservationModel');

exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.reserveMovie = async (req, res) => {
    const { movieId } = req.body;
    try {
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        if (movie.status !== 'available') {
            return res.status(400).json({ message: "Movie is not available for reservation" });
        }
        const expiresAt = new Date(Date.now() + 3 * 60 * 60 * 1000); // 3 hours from now
        const reservation = new Reservation({
            movieId: movie._id,
            expiresAt,
        });
        movie.status = 'reserved';
        await movie.save();
        await reservation.save();
        res.status(201).json({ reserveId: reservation._id, reserveExpiresAt: expiresAt.toISOString() });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.leaseMovie = async (req, res) => {
    const { reserveId, customer } = req.body;
    try {
        const reservation = await Reservation.findById(reserveId).populate('movieId');
        if (!reservation || reservation.status !== 'active') {
            return res.status(404).json({ message: "Reservation not found or expired" });
        }
        const movie = await Movie.findById(reservation.movieId._id);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        if (movie.status !== 'reserved') {
            return res.status(400).json({ message: "Movie is not reserved" });
        }
        const leaseExpiresAt = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days from now
        movie.status = 'leased';
        movie.leaseExpiresAt = leaseExpiresAt;
        reservation.status = 'expired';
        await movie.save();
        await reservation.save();
        res.status(201).json({ scheduleId: movie._id, status: 'leased', leaseExpiresAt: leaseExpiresAt.toISOString() });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.returnMovie = async (req, res) => {
    const { scheduleId } = req.body;
    try {
        const movie = await Movie.findById(scheduleId);
        if (!movie) {
            return res.status(404).json({ message: "Lease not found" });
        }
        if (movie.status !== 'leased') {
            return res.status(400).json({ message: "Movie is not leased" });
        }
        movie.status = 'available';
        movie.leaseExpiresAt = undefined;
        await movie.save();
        res.status(201).json({ scheduleId: movie._id, status: 'available' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addMovie = async (req, res) => {
    const movie = new Movie(req.body);
    try {
        const newMovie = await movie.save();
        res.status(201).json(newMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateMovie = async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteMovie = async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
