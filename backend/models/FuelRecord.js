const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const FuelRecord = sequelize.define('FuelRecord', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    vehicleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Vehicles',
            key: 'id'
        }
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    odometer: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    liters: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    cost: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    mileage: {
        type: DataTypes.FLOAT,
        allowNull: true
    }
});

module.exports = FuelRecord;
