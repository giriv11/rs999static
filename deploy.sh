#!/bin/bash

# Auto Deploy Script - Git Push + Firebase Deploy
# Usage: ./deploy.sh "your commit message"

set -e  # Exit on error

echo "🚀 Auto Deploy: GitHub + Firebase"
echo "=================================="

# Rebuild CSS with purging
echo ""
echo "📦 Rebuilding Tailwind CSS..."
npx tailwindcss -i ./src/input.css -o ./assets/css/styles.css --minify
echo "✅ CSS rebuilt (purged & minified)"

# Git operations
echo ""
echo "📤 Pushing to GitHub..."
git add -A

# Use provided message or default
if [ -z "$1" ]; then
    commit_msg="Update site - $(date '+%Y-%m-%d %H:%M')"
else
    commit_msg="$1"
fi

git commit -m "$commit_msg" || echo "No changes to commit"
git push origin main
echo "✅ Pushed to GitHub"

# Firebase deploy
echo ""
echo "🔥 Deploying to Firebase..."
firebase deploy --only hosting

echo ""
echo "✅ DEPLOYMENT COMPLETE!"
echo ""
echo "🌐 Live: https://rs999static.web.app"
echo "📊 Console: https://console.firebase.google.com/project/rs999static/overview"
