#!/bin/bash

# ============================================================================
# Shelter House Music - Start Local Development Database
# ============================================================================
# Purpose: Start the local MySQL database using Docker Compose
# Usage: ./scripts/db-up.sh
# ============================================================================

set -e  # Exit on error

echo "🚀 Starting Shelter House Music local MySQL database..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Error: Docker is not running. Please start Docker and try again."
    exit 1
fi

# Start the database container
docker-compose up -d mysql

echo "⏳ Waiting for MySQL to be ready..."

# Wait for MySQL to be healthy
MAX_ATTEMPTS=30
ATTEMPT=0
while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
    if docker-compose exec -T mysql mysqladmin ping -h localhost -u root -pshelter_root_pass --silent > /dev/null 2>&1; then
        echo "✅ MySQL database is ready!"
        echo ""
        echo "📊 Database Connection Details:"
        echo "   Host: localhost"
        echo "   Port: 3306"
        echo "   Database: shelterhouse_dev"
        echo "   User: shelter_dev"
        echo "   Password: shelter_dev_pass"
        echo ""
        echo "💡 Next steps:"
        echo "   - Run './scripts/db-seed.sh' to import seed data"
        echo "   - Update your backend/.env file with the connection details above"
        echo ""
        exit 0
    fi
    ATTEMPT=$((ATTEMPT + 1))
    sleep 2
done

echo "❌ Error: MySQL did not become ready in time. Check Docker logs:"
echo "   docker-compose logs mysql"
exit 1
