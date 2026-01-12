require('dotenv').config();

const { getAlbumTableFields, selectAlbumField } = require('./albumInputHandler.cjs');

// Replace with your actual database config
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
};
(async () => {
  // Test: Get all fields in albums table
  const fields = await getAlbumTableFields(dbConfig);
  console.log('Album table fields:', fields);

  // Test: Select a specific field (e.g., 'title')
  const titles = await selectAlbumField(dbConfig, 'name');
  console.log('Album titles:', titles.map(row => row.name));
})();