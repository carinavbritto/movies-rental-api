const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: { type: String, required: true },
    synopsis: { type: String, required: true },
    rating: { type: String, required: true },
    status: {
        type: String,
        enum: ['available', 'reserved', 'leased'],
        default: 'available',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
