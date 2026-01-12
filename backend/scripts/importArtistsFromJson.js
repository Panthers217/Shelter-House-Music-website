// Function to retrieve all data from the artists table
async function getAllArtists() {
  const connection = await mysql.createConnection(dbConfig);
  try {
    const [rows] = await connection.query("SELECT * FROM artists");
    console.log('Artists table data:');
    rows.forEach((artist, idx) => {
      console.log(`Artist #${idx + 1}:`);
      Object.entries(artist).forEach(([key, value]) => {
        console.log(`  ${key}: ${value}`);
      });
      console.log('---');
    });
  } catch (err) {
    console.error('Error retrieving artists:', err.message);
  }
  await connection.end();
}

// Function to list all tables in the database
async function listTables() {
  const connection = await mysql.createConnection(dbConfig);
  try {
    const [rows] = await connection.query("SHOW TABLES");
    console.log('Tables in database:');
    rows.forEach(row => {
      console.log(Object.values(row)[0]);
    });
  } catch (err) {
    console.error('Error retrieving tables:', err.message);
  }
  await connection.end();
}

// importArtistsFromJson.js
// Usage: node importArtistsFromJson.js

import { readFileSync } from 'fs';
import fs from 'fs';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'soulfeltmusic',
  port: process.env.DB_PORT || 3306
};

async function importArtists() {
  const data = JSON.parse(fs.readFileSync('./artistSqldemo.json', 'utf8'));
  const connection = await mysql.createConnection(dbConfig);
  for (const artist of data) {
    const query = `INSERT INTO artists (name, artist_country, image_url, demos, bio, career_highlights, influences, featured_tracks) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [artist.name, artist.artist_country, artist.img, artist.demo, "Artist biography placeholder", "artist.career_highlights", "artist.influences", "artist.featured_tracks"];
    try {
      await connection.execute(query, values);
      console.log(`Inserted: ${artist.name}`);
    } catch (err) {
      console.error(`Error inserting ${artist.name}:`, err.message);
    }
  }
  await connection.end();
  console.log('Import complete.');
}

// Uncomment to run import or list tables
// importArtists();
// listTables();
getAllArtists();
