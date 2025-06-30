#!/bin/bash

# Deployment script for pushing Docker image to Docker Hub
# Usage: ./scripts/deploy.sh [version]
# Example: ./scripts/deploy.sh 1.0.0

set -e  # Exit immediately if a command exits with a non-zero status

# Default values
DOCKER_USERNAME="iamrommel"
REPOSITORY="us-zips"
VERSION=${1:-latest}

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  echo "Error: Docker is not running. Please start Docker and try again."
  exit 1
fi

# Build the image
function build_image() {
  echo "Building Docker image..."
  docker build -t ${DOCKER_USERNAME}/${REPOSITORY}:${VERSION} .
  
  # Also tag as latest if this is not the latest version
  if [ "$VERSION" != "latest" ]; then
    docker tag ${DOCKER_USERNAME}/${REPOSITORY}:${VERSION} ${DOCKER_USERNAME}/${REPOSITORY}:latest
  fi
}

# Push the image to Docker Hub
function push_image() {
  echo "Pushing ${DOCKER_USERNAME}/${REPOSITORY}:${VERSION} to Docker Hub..."
  
  # Login to Docker Hub
  if [ -z "$DOCKER_PASSWORD" ]; then
    echo "DOCKER_PASSWORD environment variable is not set"
    exit 1
  fi
  
  echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
  
  # Push the specified version
  docker push ${DOCKER_USERNAME}/${REPOSITORY}:${VERSION}
  
  # Also push as latest if this is not the latest version
  if [ "$VERSION" != "latest" ]; then
    docker push ${DOCKER_USERNAME}/${REPOSITORY}:latest
  fi
  
  echo "Successfully pushed ${DOCKER_USERNAME}/${REPOSITORY}:${VERSION} to Docker Hub"
}

# Main execution
function main() {
  echo "Starting deployment for version: $VERSION"
  
  build_image
  push_image
  
  echo "Deployment completed successfully!"
}

# Run the main function
main
