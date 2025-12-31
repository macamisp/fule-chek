const express = require('express');
const router = express.Router();
const { Vehicle } = require('../models');
const { protect } = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/vehicles:
 *   get:
 *     summary: Get all vehicles for logged in user
 *     tags: [Vehicles]
 *     responses:
 *       200:
 *         description: List of vehicles
 */
router.get('/', protect, async (req, res) => {
    try {
        const vehicles = await Vehicle.findAll({ where: { userId: req.user.id } });
        const vehiclesWithId = vehicles.map(v => ({ ...v.dataValues, _id: v.id }));
        res.json(vehiclesWithId);
    } catch (error) {
        console.error('Get Vehicles Error:', error);
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/vehicles:
 *   post:
 *     summary: Add a new vehicle
 *     tags: [Vehicles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, type]
 *             properties:
 *               name: { type: string }
 *               type: { type: string, enum: [Bike, Car, TukTuk, Other] }
 *     responses:
 *       201:
 *         description: Vehicle created
 */
router.post('/', protect, async (req, res) => {
    const { name, type } = req.body;

    if (!name || !type) {
        return res.status(400).json({ message: 'Please add all fields' });
    }

    try {
        const vehicle = await Vehicle.create({
            userId: req.user.id,
            name,
            type
        });
        const v = vehicle.dataValues;
        res.status(201).json({ ...v, _id: v.id });
    } catch (error) {
        console.error('Add Vehicle Error:', error);
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/vehicles/{id}:
 *   get:
 *     summary: Get single vehicle details
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Vehicle details
 */
router.get('/:id', protect, async (req, res) => {
    try {
        const vehicle = await Vehicle.findByPk(req.params.id);

        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        if (vehicle.userId !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        res.json(vehicle);
    } catch (error) {
        console.error('Get Vehicle Error:', error);
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/vehicles/{id}:
 *   put:
 *     summary: Update vehicle details (e.g. Service Reminders)
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               type: { type: string }
 *               nextServiceDate: { type: string, format: date }
 *               nextServiceOdometer: { type: number }
 *     responses:
 *       200:
 *         description: Vehicle updated
 */
router.put('/:id', protect, async (req, res) => {
    try {
        const vehicle = await Vehicle.findByPk(req.params.id);

        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        if (vehicle.userId !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const { name, type, nextServiceDate, nextServiceOdometer } = req.body;

        vehicle.name = name || vehicle.name;
        vehicle.type = type || vehicle.type;
        vehicle.nextServiceDate = nextServiceDate || vehicle.nextServiceDate;
        vehicle.nextServiceOdometer = nextServiceOdometer || vehicle.nextServiceOdometer;

        await vehicle.save();

        res.json(vehicle);
    } catch (error) {
        console.error('Update Vehicle Error:', error);
        res.status(500).json({ message: error.message });
    }
});

// @desc    Delete vehicle
// @route   DELETE /api/vehicles/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const vehicle = await Vehicle.findByPk(req.params.id);

        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        // Check for user
        if (vehicle.userId !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await vehicle.destroy();

        res.json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
