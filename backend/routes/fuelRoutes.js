const express = require('express');
const router = express.Router();
const { FuelRecord } = require('../models');
const { protect } = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/fuel/{vehicleId}:
 *   get:
 *     summary: Get all fuel records for a specific vehicle
 *     tags: [Fuel]
 *     parameters:
 *       - in: path
 *         name: vehicleId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of fuel records
 */
router.get('/:vehicleId', protect, async (req, res) => {
    try {
        const records = await FuelRecord.findAll({
            where: { vehicleId: req.params.vehicleId },
            order: [['date', 'DESC']]
        });
        const recordsWithId = records.map(r => ({ ...r.dataValues, _id: r.id }));
        res.json(recordsWithId);
    } catch (error) {
        console.error('Get Fuel Records Error:', error);
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/fuel:
 *   post:
 *     summary: Add a new fuel record
 *     tags: [Fuel]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [vehicleId, date, odometer, liters, cost]
 *             properties:
 *               vehicleId: { type: integer }
 *               date: { type: string, format: date }
 *               odometer: { type: number }
 *               liters: { type: number }
 *               cost: { type: number }
 *     responses:
 *       201:
 *         description: Fuel record created
 */
router.post('/', protect, async (req, res) => {
    const { vehicleId, date, odometer, liters, cost } = req.body;

    try {
        const record = await FuelRecord.create({
            vehicleId,
            date,
            odometer,
            liters,
            cost
        });
        const r = record.dataValues;
        res.status(201).json({ ...r, _id: r.id });
    } catch (error) {
        console.error('Add Fuel Record Error:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
