#!/bin/bash

# Firebase Quick Deploy Script for Rs999 Static Site
# Usage: ./firebase-deploy.sh

set -e  # Exit on error

echo "🚀 Rs999 Firebase Deployment Script"
echo "===================================="
echo ""

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found!"
    echo "📦 Installing Firebase CLI..."
    npm install -g firebase-tools
    echo "✅ Firebase CLI installed"
fi

# Check if logged in
echo "🔐 Checking Firebase login..."
if ! firebase projects:list &> /dev/null; then
    echo "🔑 Please login to Firebase..."
    firebase login
fi

# Rebuild CSS if needed
echo ""
echo "🎨 Rebuilding Tailwind CSS..."
npm run build-css

# Git commit (optional)
echo ""
read -p "📝 Commit changes to Git? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "💾 Committing to Git..."
    git add -A
    read -p "Enter commit message: " commit_msg
    git commit -m "$commit_msg" || echo "Nothing to commit"
    git push origin main || echo "Push failed or nothing to push"
fi

# Deploy to Firebase
echo ""
echo "🚀 Deploying to Firebase Hosting..."
firebase deploy --only hosting

echo ""
echo "✅ Deployment Complete!"
echo ""
echo "🌐 Visit your site:"
firebase hosting:sites:list

echo ""
echo "📊 View in Firebase Console:"
firebase open hosting:site
