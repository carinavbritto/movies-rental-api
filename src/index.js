const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./utils/db');
const movieRoutes = require('./routes/movieRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const errorHandler = require('./middlewares/errorHandler');
const { auth } = require('./middlewares/authMiddleware');
const movieService = require('./services/movieService');

const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', movieRoutes);
app.use('/api/employees', employeeRoutes); 
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    connectDB();
    console.log(`Movies API running on port ${port}`);
});

// Expirar reservas
setInterval(async () => {
    await movieService.expireReservations();
}, 60 * 60 * 1000);
