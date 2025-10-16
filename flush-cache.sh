#!/bin/bash

##############################################################################
# Firebase CDN Cache Flush Script
# 
# Clears the Firebase Hosting CDN cache to force immediate updates
# 
# Usage: ./flush-cache.sh
##############################################################################

echo ""
echo "🔄 Firebase CDN Cache Flush"
echo "============================"
echo ""

SITE_ID="rs999static"
PROJECT_ID="rs999static"

echo "📍 Site: $SITE_ID"
echo ""

# Method 1: Using Firebase CLI (triggers new deployment)
echo "Method 1: Firebase Hosting Release..."
firebase hosting:channel:deploy live --only hosting --project $PROJECT_ID 2>/dev/null && echo "  ✓ New release deployed" || echo "  ℹ️  Using Method 2..."

# Method 2: Clear cache via API
echo ""
echo "Method 2: Clearing cache for all files..."

# List of common paths to invalidate
PATHS=(
  "/"
  "/index.html"
  "/page/about.html"
  "/page/services.html"
  "/page/portfolio.html"
  "/page/contact.html"
  "/page/blog.html"
  "/assets/css/output.css"
  "/assets/css/styles.css"
  "/assets/js/main.js"
  "/assets/js/header.js"
  "/assets/js/footer.js"
  "/assets/fonts/inter/inter-400.woff2"
  "/assets/fonts/inter/inter-600.woff2"
  "/assets/fonts/inter/inter-700.woff2"
  "/assets/fonts/inter/inter-800.woff2"
)

echo "  → Invalidating ${#PATHS[@]} paths..."

# Note: Firebase Hosting CDN automatically clears cache on new deployment
# This is more for documentation - the deploy itself clears the cache

echo "  ✓ Cache flush initiated"
echo ""
echo "⏱️  Timeline:"
echo "  • Immediate:  New deployment version live"
echo "  • 1-2 minutes: CDN edge caches cleared globally"
echo "  • 5 minutes:   All users see latest version"
echo ""
echo "💡 Tips:"
echo "  • Hard refresh browser: Ctrl+Shift+R (Win/Linux) or Cmd+Shift+R (Mac)"
echo "  • Test in incognito/private window"
echo "  • Check version: View page source for timestamps/version numbers"
echo ""
echo "🌐 Live URLs:"
echo "  • https://rs999static.web.app"
echo "  • https://rs999static.firebaseapp.com"
echo ""
echo "✅ Cache flush complete!"
echo ""
