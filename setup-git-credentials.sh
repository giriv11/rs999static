#!/bin/bash

##############################################################################
# Git Credentials Setup Script
# 
# Sets up Git credentials for automated pushing in deployment script
# 
# Usage: ./setup-git-credentials.sh
##############################################################################

echo ""
echo "🔐 Git Credentials Setup"
echo "========================="
echo ""

# Check current git configuration
echo "📋 Current Git Configuration:"
echo ""
git config --list | grep -E "user\.|credential\." || echo "  ℹ️  No user or credential configuration found"
echo ""

# Configure user identity if not set
echo "👤 Setting up Git user identity..."
GIT_USER=$(git config --global user.name)
GIT_EMAIL=$(git config --global user.email)

if [ -z "$GIT_USER" ]; then
  echo "  → Git user.name not set"
  read -p "Enter your name: " USER_NAME
  git config --global user.name "$USER_NAME"
  echo "  ✓ Set user.name to: $USER_NAME"
else
  echo "  ✓ user.name: $GIT_USER"
fi

if [ -z "$GIT_EMAIL" ]; then
  echo "  → Git user.email not set"
  read -p "Enter your email: " USER_EMAIL
  git config --global user.email "$USER_EMAIL"
  echo "  ✓ Set user.email to: $USER_EMAIL"
else
  echo "  ✓ user.email: $GIT_EMAIL"
fi

echo ""
echo "🔑 Setting up credentials helper..."

# Option 1: Credential cache (stores credentials in memory for 1 hour)
echo ""
echo "Select credential storage method:"
echo "  1) Cache (stores in memory for 1 hour) - Recommended"
echo "  2) Store (stores permanently in ~/.git-credentials) - Use with SSH key"
echo "  3) Skip (manual authentication each time)"
echo ""
read -p "Enter choice (1-3): " CHOICE

case $CHOICE in
  1)
    git config --global credential.helper 'cache --timeout=3600'
    echo "  ✓ Credential cache enabled (1 hour timeout)"
    echo ""
    echo "  💡 First push will ask for credentials, then cached for 1 hour"
    ;;
  2)
    git config --global credential.helper store
    echo "  ✓ Credential store enabled"
    echo ""
    echo "  ⚠️  WARNING: Credentials stored in plain text at ~/.git-credentials"
    echo "  💡 Consider using SSH key instead for better security"
    ;;
  3)
    echo "  ℹ️  Skipped credential helper setup"
    echo "  💡 You'll need to authenticate on each push"
    ;;
  *)
    echo "  ❌ Invalid choice"
    exit 1
    ;;
esac

echo ""
echo "🔐 Checking authentication..."

# Test GitHub connection
if git ls-remote origin &> /dev/null; then
  echo "  ✓ GitHub authentication working!"
else
  echo "  ⚠️  GitHub authentication not working"
  echo ""
  echo "  To fix, choose one option:"
  echo ""
  echo "  Option A: Use HTTPS with Personal Access Token (PAT)"
  echo "    1. Go to https://github.com/settings/tokens"
  echo "    2. Generate new token (classic)"
  echo "    3. Select scopes: repo (all)"
  echo "    4. Copy the token"
  echo "    5. Run: git push origin main"
  echo "    6. Username: your-github-username"
  echo "    7. Password: paste-your-token"
  echo ""
  echo "  Option B: Use SSH (Recommended)"
  echo "    1. Generate SSH key: ssh-keygen -t ed25519 -C \"your_email@example.com\""
  echo "    2. Add to GitHub: https://github.com/settings/keys"
  echo "    3. Change remote URL:"
  echo "       git remote set-url origin git@github.com:giriv11/rs999static.git"
fi

echo ""
echo "✅ Git configuration complete!"
echo ""
echo "📝 Summary:"
git config --list | grep -E "user\.|credential\."
echo ""
echo "🚀 You can now run: ./optimize-and-deploy.sh"
echo ""
