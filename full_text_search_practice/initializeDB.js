const db = require('./models/index');
// Importing the sample data
// Sample data is imported from seeders folder
const seed = require('./seeders/seed-db');

// Syncing and Seeding the Database
// Seeding the database means inserting sample data to the Database
// If you are running this project for the first time uncomment the code below
async function initializeDB() {
  db.sequelize.sync({ force: true })
    .then(() => {
      // Seeding the Database
      seed.insert();
      console.log('Database Seeding Complete');
    });
}


initializeDB();
