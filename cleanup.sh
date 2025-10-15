#!/bin/bash

# Rs999 Cleanup Script - Remove Unnecessary Files for Pure Static Setup
# Run this script to clean up old backend/admin files

echo "🧹 Starting Rs999 Static Site Cleanup..."
echo ""

# Function to safely remove files/directories
safe_remove() {
    if [ -e "$1" ]; then
        rm -rf "$1"
        echo "✅ Removed: $1"
    else
        echo "⏭️  Skipped (not found): $1"
    fi
}

# Remove admin panels
echo "📝 Removing admin panels..."
safe_remove "admin/"
safe_remove "admin.html"
safe_remove "admin-new.html"

# Remove backend server files
echo "🔧 Removing backend files..."
safe_remove "server.js"

# Remove JSON data files
echo "📄 Removing JSON data files..."
safe_remove "categories.json"
safe_remove "tags.json"
safe_remove "profile.json"
safe_remove "posts/index.json"

# Remove individual post JSON files (keep directory)
echo "🗑️  Removing post JSON files..."
find posts/ -name "*.json" -type f -delete 2>/dev/null && echo "✅ Removed post JSON files" || echo "⏭️  No post JSON files found"

# Remove old post loader
echo "📋 Removing old post loader..."
safe_remove "post.html"

# Remove demo files
echo "🎭 Removing demo files..."
safe_remove "demo.html"

# Remove old documentation
echo "📚 Removing old documentation..."
safe_remove "ADMIN_ENHANCEMENT_GUIDE.md"
safe_remove "ADMIN_FIXES_LOG.md"
safe_remove "ADMIN_GUIDE.md"
safe_remove "DEPLOYMENT_COMPLETE.md"
safe_remove "DEPLOYMENT_GUIDE.md"
safe_remove "DEPLOYMENT_SYNC.md"
safe_remove "DIGITALOCEAN_DEPLOYMENT.md"
safe_remove "EDITING_POSTS_GUIDE.md"
safe_remove "FIXED_HARDCODED_POSTS.md"
safe_remove "GITHUB_TOKEN_SETUP.md"
safe_remove "HOW_TO_SEE_POST.md"
safe_remove "IMAGE_UPLOAD_GUIDE.md"
safe_remove "QUICK_DEPLOY.md"
safe_remove "QUICK_REFERENCE.md"
safe_remove "SEO_IMAGE_FIXES.md"
safe_remove "TROUBLESHOOTING_CACHE.md"

# Remove DigitalOcean config (optional - comment out if you want to keep)
# safe_remove ".do/"

# Remove GitHub workflows (optional - comment out if you want to keep)
# safe_remove ".github/"

echo ""
echo "✨ Cleanup complete!"
echo ""
echo "📂 Remaining structure:"
echo "   ✅ index.html (homepage)"
echo "   ✅ pages/ (about, services, portfolio, contact, blog)"
echo "   ✅ posts/ (blog posts - ready for AI-generated content)"
echo "   ✅ templates/ (templates for AI)"
echo "   ✅ assets/ (CSS, JS, images)"
echo "   ✅ site-config.js (universal settings)"
echo "   ✅ src/ (Tailwind source)"
echo "   ✅ PROJECT_STRUCTURE.md (documentation)"
echo "   ✅ IMPLEMENTATION_GUIDE.md (this guide)"
echo "   ✅ README.md (project readme)"
echo ""
echo "🎯 Next steps:"
echo "   1. Review changes: git status"
echo "   2. Commit cleanup: git add . && git commit -m 'Clean up old backend files for pure static setup'"
echo "   3. Push to GitHub: git push origin main"
echo "   4. Start generating content with AI!"
echo ""
