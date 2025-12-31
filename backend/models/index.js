const { sequelize } = require('../config/db');
const User = require('./User');
const Vehicle = require('./Vehicle');
const FuelRecord = require('./FuelRecord');

// Associations
User.hasMany(Vehicle, { foreignKey: 'userId', onDelete: 'CASCADE' });
Vehicle.belongsTo(User, { foreignKey: 'userId' });

Vehicle.hasMany(FuelRecord, { foreignKey: 'vehicleId', onDelete: 'CASCADE' });
FuelRecord.belongsTo(Vehicle, { foreignKey: 'vehicleId' });

module.exports = {
    sequelize,
    User,
    Vehicle,
    FuelRecord
};
