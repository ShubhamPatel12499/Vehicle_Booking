const { Vehicle } = require('./models/Vehicle.model');

// Seed vehicle data
const seedData = async () => {
    try {
        // await Vehicle.destroy({ truncate: true });
        const existingData = await Vehicle.findAll();
        if (existingData.length === 0) {
            // Seed data only if database is empty
            await Vehicle.create({ type: 'Car', model: 'Sedan', wheels: 4 });
            await Vehicle.create({ type: 'Car', model: 'Hatchback', wheels: 4 });
            await Vehicle.create({ type: 'Car', model: 'SUV', wheels: 4 });
            await Vehicle.create({ type: 'Bike', model: 'Cruiser', wheels: 2 });
            await Vehicle.create({ type: 'Bike', model: 'Sports', wheels: 2 });
            console.log('Seeding completed.');
        } else {
            console.log('Data already exists in the database. Skipping seeding.');
        }
    } catch (error) {
        console.error('Error seeding data:', error);
    }
};

module.exports = {
    seedData
};

