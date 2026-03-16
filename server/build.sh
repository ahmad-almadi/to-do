#!/bin/bash
set -e

echo "📦 Installing root dependencies..."
cd ..
npm install

echo "🔨 Building frontend..."
npm run build

echo "📦 Installing server dependencies..."
cd server
npm install

echo "✅ Build complete!"
