-- Soul Felt Music PostgreSQL Schema
-- Run these commands in psql or a migration tool

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE artists (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  bio TEXT,
  image_url VARCHAR(255)
);

CREATE TABLE albums (
  id SERIAL PRIMARY KEY,
  artist_id INTEGER REFERENCES artists(id) ON DELETE CASCADE,
  title VARCHAR(100) NOT NULL,
  release_date DATE,
  cover_url VARCHAR(255)
);

CREATE TABLE tracks (
  id SERIAL PRIMARY KEY,
  album_id INTEGER REFERENCES albums(id) ON DELETE CASCADE,
  title VARCHAR(100) NOT NULL,
  duration INTEGER, -- seconds
  audio_url VARCHAR(255)
);

CREATE TABLE purchases (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  track_id INTEGER REFERENCES tracks(id) ON DELETE CASCADE,
  purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add more tables for news, videos, community, etc. as needed
