// This script uploads image URLs and artist names to a MySQL database
// Usage: node uploadToSql.js

import { createConnection } from "mysql2/promise";
import "dotenv/config";

// Example data to upload
const imageData = [
  {
    artist: "Artist Name",
    imageUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
  },
  // Add more objects as needed
];

async function uploadDataToSql(dataArray) {
  // Update these with your actual database credentials
  const connection = await createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  //   for (const item of dataArray) {
  //     try {
  //       await connection.execute(
  //         'INSERT INTO artist_images (artist_name, image_url) VALUES (?, ?)',
  //         [item.artist, item.imageUrl]
  //       );
  //       console.log(`Inserted: ${item.artist} - ${item.imageUrl}`);
  //     } catch (err) {
  //       console.error('Error inserting:', err.message);
  //     }
  //   }

  // Show all tables
  const [tables] = await connection.query("SHOW TABLES");
  console.log("\nAll tables in the database:");
  tables.forEach((row) => {
    const tableName = Object.values(row)[0];
    console.log("- " + tableName);
  });

  // Show all records from each table
  for (const row of tables) {
    const tableName = Object.values(row)[0];
    const [records] = await connection.query(`SELECT * FROM \`${tableName}\``);
    console.table(records);
  }

  await connection.end();
  console.log("All data uploaded and displayed.");
}

uploadDataToSql(imageData);
