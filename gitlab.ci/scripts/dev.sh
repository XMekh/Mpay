#!/bin/bash

# Development script for Mpay App
set -e

echo "🚀 Starting Mpay App in development mode..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Build and start development container
echo "📦 Building development container..."
docker-compose --profile dev up --build

echo "✅ Development server started!"
echo "🌐 App is running at http://localhost:3001"
echo "📝 Logs are being streamed. Press Ctrl+C to stop." 