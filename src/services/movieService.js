const Movie = require('../models/movieModel');
const Reservation = require('../models/reservationModel');

exports.expireReservations = async () => {
    const now = new Date();
    const expiredReservations = await Reservation.find({ expiresAt: { $lte: now }, status: 'active' });
    for (const reservation of expiredReservations) {
        const movie = await Movie.findById(reservation.movieId);
        if (movie) {
            movie.status = 'available';
            await movie.save();
        }
        reservation.status = 'expired';
        await reservation.save();
    }
};
