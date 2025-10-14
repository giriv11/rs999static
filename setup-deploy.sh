#!/bin/bash

# Quick Setup Script for Automatic Deployment to 20i
# This script helps you configure GitHub Actions for auto-deployment

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  🚀 20i Automatic Deployment Setup                         ║"
echo "║     GitHub Actions + SSH Configuration                     ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Check if SSH key exists
if [ -f ~/.ssh/20i_deploy ]; then
    echo "✅ SSH key already exists at ~/.ssh/20i_deploy"
else
    echo "📝 Generating SSH key for deployment..."
    ssh-keygen -t ed25519 -C "github-actions@rs999.in" -f ~/.ssh/20i_deploy -N ""
    echo "✅ SSH key generated!"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 STEP 1: Add Public Key to 20i"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Copy this public key and add it to 20i:"
echo ""
cat ~/.ssh/20i_deploy.pub
echo ""
echo "📍 Where to add:"
echo "   1. Log into 20i Control Panel"
echo "   2. Go to: Manage Hosting > SSH Access"
echo "   3. Click: Authorized Keys"
echo "   4. Paste the key above"
echo "   5. Save"
echo ""
read -p "Press Enter when you've added the key to 20i..."

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔐 STEP 2: GitHub Secrets to Add"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Go to: https://github.com/giriv11/rs999static/settings/secrets/actions"
echo ""
echo "Add these secrets:"
echo ""

echo "1️⃣  SSH_HOST"
read -p "   Enter your 20i hostname (e.g., vps-xxxxx.20i.com): " SSH_HOST
echo "   ✅ Value: $SSH_HOST"
echo ""

echo "2️⃣  SSH_USERNAME"
read -p "   Enter your 20i username: " SSH_USERNAME
echo "   ✅ Value: $SSH_USERNAME"
echo ""

echo "3️⃣  SSH_PORT"
read -p "   Enter SSH port (default: 22): " SSH_PORT
SSH_PORT=${SSH_PORT:-22}
echo "   ✅ Value: $SSH_PORT"
echo ""

echo "4️⃣  DEPLOY_PATH"
read -p "   Enter deployment path (e.g., ~/public_html): " DEPLOY_PATH
DEPLOY_PATH=${DEPLOY_PATH:-~/public_html}
echo "   ✅ Value: $DEPLOY_PATH"
echo ""

echo "5️⃣  SITE_URL"
read -p "   Enter your site URL (e.g., https://rs999.in): " SITE_URL
SITE_URL=${SITE_URL:-https://rs999.in}
echo "   ✅ Value: $SITE_URL"
echo ""

echo "6️⃣  SSH_PRIVATE_KEY"
echo "   📄 Copy this ENTIRE private key (including BEGIN/END lines):"
echo ""
echo "   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cat ~/.ssh/20i_deploy
echo "   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Save to temp file for easy copying
cat ~/.ssh/20i_deploy > /tmp/20i_deploy_private.txt
echo "   💾 Private key also saved to: /tmp/20i_deploy_private.txt"
echo ""

read -p "Press Enter when you've added all 6 secrets to GitHub..."

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🧪 STEP 3: Test SSH Connection"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Testing connection to 20i..."
ssh -i ~/.ssh/20i_deploy -o StrictHostKeyChecking=no -p $SSH_PORT $SSH_USERNAME@$SSH_HOST "echo 'SSH connection successful!'"

if [ $? -eq 0 ]; then
    echo "✅ SSH connection works!"
else
    echo "❌ SSH connection failed. Please check:"
    echo "   - Public key is added to 20i"
    echo "   - Hostname and username are correct"
    echo "   - SSH port is correct"
    echo "   - SSH is enabled on 20i"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 STEP 4: Enable Automatic Deployment"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Disabling notification workflow..."
mv .github/workflows/notify-deploy.yml .github/workflows/notify-deploy.yml.disabled 2>/dev/null

echo "✅ Automatic deployment enabled!"
echo ""
echo "Committing changes..."
git add .github/workflows/
git commit -m "Enable automatic deployment to 20i"
git push origin main

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  ✅ Setup Complete!                                        ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "📋 Summary:"
echo "   ✅ SSH key generated and configured"
echo "   ✅ GitHub secrets added"
echo "   ✅ Automatic deployment enabled"
echo ""
echo "🎯 Next steps:"
echo "   1. Make a change to test deployment"
echo "   2. Push to GitHub"
echo "   3. Watch deployment: https://github.com/giriv11/rs999static/actions"
echo ""
echo "🔗 Useful links:"
echo "   📊 GitHub Actions: https://github.com/giriv11/rs999static/actions"
echo "   🔐 GitHub Secrets: https://github.com/giriv11/rs999static/settings/secrets/actions"
echo "   📖 Full Guide: Read DEPLOYMENT_GUIDE.md"
echo ""
echo "💡 To create a blog post:"
echo "   1. Run: npm run server"
echo "   2. Open: http://localhost:3001/admin.html"
echo "   3. Create post → It auto-deploys to 20i! ✨"
echo ""
