// albumInputHandler.js
// Function to parse user input (JSON or CSV) and return array of album objects
const fs = require('fs');
const mysql = require('mysql2/promise');

function parseAlbumInput(input) {
  let fields = [];
  let albums = [];
  try {
    // Try to parse as JSON
    albums = JSON.parse(input);
    if (!Array.isArray(albums)) albums = [albums];
    return albums;
  } catch {
    // Try to parse as CSV
    const lines = input.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      if (values.length === headers.length) {
        const album = {};
        headers.forEach((h, idx) => {
          album[h] = values[idx];
        });
        albums.push(album);
      }
    }
    return albums;
  }
}

// Optionally, read from a file
function parseAlbumFile(filePath) {
  const input = fs.readFileSync(filePath, 'utf8');
  return parseAlbumInput(input);
}

// Get all fields (columns) in the albums table
async function getAlbumTableFields(dbConfig) {
  const connection = await mysql.createConnection(dbConfig);
  const [columns] = await connection.query('SHOW COLUMNS FROM artists');
  await connection.end();
  return columns.map(col => col.Field);
}

// Select a specific field from the albums table
async function selectAlbumField(dbConfig, fieldName) {
  const connection = await mysql.createConnection(dbConfig);
  const [rows] = await connection.query(`SELECT \`${fieldName}\` FROM artists`);
  await connection.end();
  return rows;
}

module.exports = { parseAlbumInput, parseAlbumFile, getAlbumTableFields, selectAlbumField };
