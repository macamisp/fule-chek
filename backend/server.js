const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { connectDB } = require('./config/db');
const { sequelize, User, Vehicle, FuelRecord } = require('./models');
const setupSwagger = require('./swagger');
const seedAdmin = require('./seed');

const startServer = async () => {
    try {
        // Connect and Create Database if not exists
        await connectDB();

        // Sync Models
        console.log('Syncing database...');
        await sequelize.sync({ alter: true });
        console.log('Database Synced');

        // Seed Admin
        await seedAdmin();

        // Setup Swagger
        setupSwagger(app);

        const authRoutes = require('./routes/authRoutes');
        const vehicleRoutes = require('./routes/vehicleRoutes');
        const fuelRoutes = require('./routes/fuelRoutes');

        // Routes
        app.use('/api/auth', authRoutes);
        app.use('/api/vehicles', vehicleRoutes);
        app.use('/api/fuel', fuelRoutes);

        app.get('/', (req, res) => {
            res.send('Fuel Tracker API is running...');
        });

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer();
