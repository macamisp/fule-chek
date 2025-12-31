const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Vehicle = sequelize.define('Vehicle', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', // 'Users' refers to table name
            key: 'id',
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('Bike', 'Car', 'TukTuk', 'Other'),
        allowNull: false
    },
    nextServiceDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    nextServiceOdometer: {
        type: DataTypes.FLOAT,
        allowNull: true
    }
});

module.exports = Vehicle;
