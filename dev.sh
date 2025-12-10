#!/bin/bash

# Development script to run the About application locally

set -e

echo "Starting development environment..."

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "docker-compose not found. Please install docker-compose."
    exit 1
fi

# Start services
docker-compose up --build

# Cleanup on exit
trap "docker-compose down" EXIT
