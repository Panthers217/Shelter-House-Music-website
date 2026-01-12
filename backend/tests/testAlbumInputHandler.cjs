const { parseAlbumInput, parseAlbumFile } = require('./albumInputHandler.cjs');

// Test with JSON string
const jsonInput = '[{"id":1,"artist_id":2,"title":"Test Album","release_date":"2025-01-01","cover_url":"cover.jpg"}]';
console.log('JSON result:', parseAlbumInput(jsonInput));

// Test with CSV string
const csvInput = require('fs').readFileSync('./testTableValues.csv', 'utf8');
console.log('CSV result:', parseAlbumInput(csvInput));

// Test with file (if you have a file to test)
const albumsFromFile = parseAlbumFile('./tableSchema/albums.csv');
console.log('File result:', albumsFromFile);