const { User } = require('./models');

const seedAdmin = async () => {
    try {
        const adminEmail = 'admin@gmail.com';
        const adminPassword = 'admin 1234';

        const adminExists = await User.findOne({ where: { email: adminEmail } });

        if (!adminExists) {
            await User.create({
                name: 'Super Admin',
                email: adminEmail,
                password: adminPassword,
                role: 'admin'
            });
            console.log('✅ Super Admin created: admin@gmail.com / admin 1234');
        } else {
            console.log('ℹ️ Super Admin already exists');
        }
    } catch (error) {
        console.error('❌ Error seeding admin:', error);
    }
};

module.exports = seedAdmin;
