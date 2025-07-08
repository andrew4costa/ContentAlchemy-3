#!/bin/bash

# Build the React frontend
echo "Building frontend..."
npm run build

# Ensure the dist/public directory exists and has the right structure
echo "Setting up static files..."
mkdir -p dist/public
cp -r dist/public/* ./public/ 2>/dev/null || true

echo "Build complete!"