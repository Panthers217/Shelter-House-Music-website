#!/bin/bash

# ============================================================================
# Shelter House Music - Seed Local Development Database
# ============================================================================
# Purpose: Import schema and seed data into local MySQL
# Usage: ./scripts/db-seed.sh
# Note: Database must be running (use ./scripts/db-up.sh first)
# ============================================================================

set -e  # Exit on error

echo "🌱 Seeding Shelter House Music local database..."

# Check if Docker container is running
if ! docker-compose ps mysql | grep -q "Up"; then
    echo "❌ Error: MySQL container is not running."
    echo "   Run './scripts/db-up.sh' first to start the database."
    exit 1
fi

# Check if schema file exists
SCHEMA_FILE="aiven_dump.sql"
if [ ! -f "$SCHEMA_FILE" ]; then
    echo "❌ Error: Schema file not found at $SCHEMA_FILE"
    exit 1
fi

# Check if seed file exists
SEED_FILE="database/seed_shelterhouse.sql"
if [ ! -f "$SEED_FILE" ]; then
    echo "❌ Error: Seed file not found at $SEED_FILE"
    exit 1
fi

echo "📋 Step 1/2: Importing database schema from $SCHEMA_FILE..."

# Note: The schema dump uses "defaultdb" but we need "shelterhouse_dev"
# We'll create a temporary modified version
TEMP_SCHEMA="/tmp/schema_local.sql"
sed 's/USE `defaultdb`/USE `shelterhouse_dev`/g; s/CREATE DATABASE.*defaultdb.*//g' "$SCHEMA_FILE" > "$TEMP_SCHEMA"

# Import the schema
docker-compose exec -T mysql mysql -u root -pshelter_root_pass shelterhouse_dev < "$TEMP_SCHEMA"

# Clean up temporary file
rm "$TEMP_SCHEMA"

echo "✅ Schema imported successfully!"
echo ""
echo "📥 Step 2/2: Importing seed data from $SEED_FILE..."

# Note: The seed file uses "USE defaultdb;" but we need to use "shelterhouse_dev"
TEMP_SEED="/tmp/seed_shelterhouse_local.sql"
sed 's/USE defaultdb;/USE shelterhouse_dev;/g' "$SEED_FILE" > "$TEMP_SEED"

# Import the seed file
docker-compose exec -T mysql mysql -u root -pshelter_root_pass shelterhouse_dev < "$TEMP_SEED"

# Clean up temporary file
rm "$TEMP_SEED"

echo "✅ Database seeded successfully!"
echo ""
echo "📊 Your local database now contains:"
echo "   - Complete database schema (all tables)"
echo "   - Artist profiles (Sarah Monroe, Maya Rivers, etc.)"
echo "   - Albums and tracks"
echo "   - Demo data for testing"
echo ""
echo "💡 You can now start your backend server and test the application."
