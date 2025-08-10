#!/bin/bash

# Deployment script for Mpay App
set -e

# Configuration
REGISTRY=${REGISTRY:-"docker.io"}
IMAGE_NAME=${IMAGE_NAME:-"mpay-app"}
TAG=${TAG:-"latest"}
SERVER_HOST=${SERVER_HOST:-"your-server.com"}
SERVER_USER=${SERVER_USER:-"deploy"}
SERVER_PORT=${SERVER_PORT:-"22"}

echo "🚀 Starting deployment of Mpay App..."

# Build the Docker image
echo "📦 Building Docker image..."
docker build -t $REGISTRY/$IMAGE_NAME:$TAG .

# Push to registry
echo "📤 Pushing image to registry..."
docker push $REGISTRY/$IMAGE_NAME:$TAG

# Deploy to server
echo "🖥️  Deploying to server $SERVER_HOST..."

ssh -p $SERVER_PORT $SERVER_USER@$SERVER_HOST << EOF
    echo "📥 Pulling latest image..."
    docker pull $REGISTRY/$IMAGE_NAME:$TAG
    
    echo "🛑 Stopping existing container..."
    docker stop mpay-app || true
    docker rm mpay-app || true
    
    echo "🚀 Starting new container..."
    docker run -d \
        --name mpay-app \
        --restart unless-stopped \
        -p 80:80 \
        -e NODE_ENV=production \
        $REGISTRY/$IMAGE_NAME:$TAG
    
    echo "🧹 Cleaning up old images..."
    docker image prune -f
    
    echo "✅ Deployment completed successfully!"
    
    # Show running containers
    docker ps | grep mpay-app
EOF

echo "🎉 Deployment completed successfully!"
echo "🌐 App is now running at http://$SERVER_HOST" 