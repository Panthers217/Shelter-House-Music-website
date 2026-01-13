#!/bin/bash

# ============================================================================
# Shelter House Music - Reset Local Development Database
# ============================================================================
# Purpose: Drop and recreate the database, then re-import seed data
# Usage: ./scripts/db-reset.sh
# Warning: This will delete ALL data in the local database
# ============================================================================

set -e  # Exit on error

echo "🔄 Resetting Shelter House Music local database..."
echo "⚠️  WARNING: This will delete all data in the local database!"
echo ""

# Prompt for confirmation
read -p "Are you sure you want to continue? (yes/no): " CONFIRM
if [ "$CONFIRM" != "yes" ]; then
    echo "❌ Reset cancelled."
    exit 0
fi

# Check if Docker container is running
if ! docker-compose ps mysql | grep -q "Up"; then
    echo "❌ Error: MySQL container is not running."
    echo "   Run './scripts/db-up.sh' first to start the database."
    exit 1
fi

echo ""
echo "🗑️  Dropping database..."

# Drop and recreate the database
docker-compose exec -T mysql mysql -u root -pshelter_root_pass -e "DROP DATABASE IF EXISTS shelterhouse_dev;"
docker-compose exec -T mysql mysql -u root -pshelter_root_pass -e "CREATE DATABASE shelterhouse_dev CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

echo "✅ Database dropped and recreated."
echo ""

# Re-seed the database
echo "🌱 Re-seeding database..."
./scripts/db-seed.sh

echo ""
echo "✅ Database reset complete! Your local database is now in a clean state."
