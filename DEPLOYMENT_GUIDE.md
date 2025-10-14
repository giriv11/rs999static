# 🚀 Automatic Deployment to 20i Guide

This guide explains how to set up **automatic deployment** to 20i hosting when you push to GitHub.

---

## 📋 Table of Contents

1. [Quick Overview](#quick-overview)
2. [Option 1: Manual Deploy (Current)](#option-1-manual-deploy-current)
3. [Option 2: GitHub Actions + SSH (Fully Automatic)](#option-2-github-actions--ssh-fully-automatic)
4. [Option 3: 20i Git Auto-Pull (If Available)](#option-3-20i-git-auto-pull-if-available)
5. [Troubleshooting](#troubleshooting)

---

## Quick Overview

**Current Workflow:**
```
Create Post → Push to GitHub → Manual Pull on 20i → Deploy
```

**After Setup:**
```
Create Post → Push to GitHub → ✨ Automatic Deploy ✨
```

---

## Option 1: Manual Deploy (Current)

This is what you're doing now:

### Steps:
1. ✅ Create blog post in admin panel
2. ✅ Automatically pushed to GitHub
3. ⚠️ **Manual**: Log into 20i dashboard
4. ⚠️ **Manual**: Git > Pull Latest > Deploy

### When to Use:
- Quick setup, no configuration needed
- Good for infrequent updates
- Maximum control over deployments

---

## Option 2: GitHub Actions + SSH (Fully Automatic)

**Best option for full automation!**

### Prerequisites:
- SSH access enabled on 20i
- Git installed on 20i server
- Node.js available on 20i

### Setup Steps:

#### Step 1: Enable SSH on 20i

1. Log into **20i Control Panel**
2. Go to: **Manage Hosting** > **SSH Access**
3. Enable SSH access
4. Note your SSH details:
   - Host: `your-server.20i.com` or IP address
   - Username: Your 20i username
   - Port: Usually 22

#### Step 2: Generate SSH Key

On your local machine:
```bash
# Generate SSH key pair
ssh-keygen -t ed25519 -C "github-actions@rs999.in" -f ~/.ssh/20i_deploy

# Copy the public key
cat ~/.ssh/20i_deploy.pub
```

#### Step 3: Add Public Key to 20i

1. Copy the public key content
2. In 20i Control Panel: **SSH Access** > **Authorized Keys**
3. Paste the public key
4. Save

#### Step 4: Add Secrets to GitHub

1. Go to your GitHub repository: https://github.com/giriv11/rs999static
2. Click: **Settings** > **Secrets and variables** > **Actions**
3. Click: **New repository secret**
4. Add these secrets:

| Secret Name | Value | Example |
|------------|-------|---------|
| `SSH_HOST` | Your 20i server hostname | `vps-xxxxx.20i.com` |
| `SSH_USERNAME` | Your 20i username | `your_username` |
| `SSH_PRIVATE_KEY` | Private key content | Contents of `~/.ssh/20i_deploy` |
| `SSH_PORT` | SSH port (usually 22) | `22` |
| `DEPLOY_PATH` | Path to your site | `~/public_html` or `/home/username/public_html` |
| `SITE_URL` | Your website URL | `https://rs999.in` |

**To get private key:**
```bash
cat ~/.ssh/20i_deploy
```
Copy everything including `-----BEGIN OPENSSH PRIVATE KEY-----` and `-----END OPENSSH PRIVATE KEY-----`

#### Step 5: Update Workflow File

The `deploy.yml` workflow is already created. It will automatically:
- Build your CSS
- Connect to 20i via SSH
- Pull latest changes from GitHub
- Install dependencies
- Rebuild assets
- Deploy!

#### Step 6: Test Deployment

```bash
# Make a test change
echo "Test deployment" >> test.txt
git add test.txt
git commit -m "Test automatic deployment"
git push origin main
```

Watch the deployment at: https://github.com/giriv11/rs999static/actions

---

## Option 3: 20i Git Auto-Pull (If Available)

Some 20i plans offer automatic git pulling.

### Check Availability:

1. Log into **20i Control Panel**
2. Go to: **Manage Hosting** > **Git Version Control**
3. Look for: **Auto-deploy** or **Webhooks** option

### If Available:

1. Enable auto-deploy for the `main` branch
2. 20i will automatically pull on GitHub push
3. No GitHub Actions needed!

### Note:
Not all 20i plans include this feature. Contact 20i support if unsure.

---

## How It Works

### With GitHub Actions (Option 2):

```
┌─────────────────┐
│  You: Create    │
│  Blog Post      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Admin Server   │ ← Saves files
│  (server.js)    │ ← Git commit & push
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  GitHub Repo    │ ← Push triggers webhook
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ GitHub Actions  │ ← Runs deploy.yml
│  Workflow       │ ← Connects via SSH
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  20i Server     │ ← Git pull
│  (Production)   │ ← Build assets
│                 │ ← Site updated! ✨
└─────────────────┘
```

---

## Workflow Files

### Current Setup:

1. **`notify-deploy.yml`** (Active by default)
   - Runs on every push
   - Sends notification
   - **Requires manual deploy on 20i**

2. **`deploy.yml`** (Requires SSH setup)
   - Fully automatic deployment
   - **Requires GitHub Secrets configuration**
   - Disabled until secrets are added

### To Switch to Automatic:

1. Complete SSH setup (Option 2 above)
2. Add GitHub Secrets
3. Rename files:
   ```bash
   mv .github/workflows/notify-deploy.yml .github/workflows/notify-deploy.yml.disabled
   # deploy.yml will automatically activate
   ```

---

## Security Best Practices

### SSH Key Security:
- ✅ Use separate SSH key for deployments (not your personal key)
- ✅ Limit key permissions on 20i (if possible)
- ✅ Never commit private keys to repository
- ✅ Use GitHub Secrets (encrypted storage)
- ✅ Rotate keys periodically (every 6-12 months)

### GitHub Secrets:
- ✅ Only accessible to workflow runs
- ✅ Never exposed in logs
- ✅ Can be updated anytime
- ✅ Can be deleted when not needed

---

## Testing Your Setup

### Test Automatic Deployment:

1. Make a small change:
   ```bash
   echo "# Test Deploy $(date)" >> README.md
   git add README.md
   git commit -m "Test: automatic deployment"
   git push origin main
   ```

2. Watch GitHub Actions:
   - Go to: https://github.com/giriv11/rs999static/actions
   - Click on the latest workflow run
   - Monitor the deployment steps

3. Verify on 20i:
   - SSH into your server (if SSH is set up)
   - Or check your website for the changes

---

## Troubleshooting

### GitHub Actions Failing?

**Check SSH Connection:**
```bash
# Test SSH locally
ssh -i ~/.ssh/20i_deploy username@your-server.20i.com
```

**Common Issues:**

1. **"Permission denied (publickey)"**
   - Solution: Verify public key is added to 20i authorized keys
   - Check: Private key is correctly copied to GitHub Secrets

2. **"Host key verification failed"**
   - Solution: Add to workflow:
     ```yaml
     script_stop: false
     script: |
       ssh-keyscan your-server.20i.com >> ~/.ssh/known_hosts
     ```

3. **"Git pull failed"**
   - Solution: Ensure Git is installed on 20i
   - Check: Repository is cloned in correct path

### Deployment Works But Site Doesn't Update?

**Check Build Process:**
```bash
# SSH into 20i
ssh username@your-server.20i.com

# Navigate to site
cd ~/public_html

# Manual pull and build
git pull origin main
npm install
npm run build-css
```

**Cache Issues:**
- Clear browser cache
- Check CSS version number in `index.html`
- Verify `output.css` was rebuilt

---

## Alternative: Webhook Solution

If SSH is not available, you can use webhooks:

### Setup Webhook Endpoint:

1. Create webhook receiver on your 20i site
2. Add webhook URL to GitHub: **Settings** > **Webhooks**
3. On webhook trigger, execute:
   ```php
   <?php
   exec('cd /path/to/site && git pull origin main');
   exec('cd /path/to/site && npm run build-css');
   ?>
   ```

**Note:** This requires PHP execution and shell access on 20i.

---

## Cost & Performance

### GitHub Actions:
- ✅ **Free** for public repositories (2,000 minutes/month)
- ✅ Fast deployment (1-2 minutes)
- ✅ Build logs for debugging

### 20i Auto-Deploy:
- ✅ No additional cost (if available on your plan)
- ✅ Instant deployment
- ⚠️ May require plan upgrade

---

## Recommended Setup

### For Your Use Case:

**Best Option**: GitHub Actions + SSH (Option 2)

**Why?**
- ✅ Fully automatic
- ✅ Works with any 20i plan
- ✅ Complete control
- ✅ Build logs available
- ✅ Can be paused/disabled anytime

**Time to Setup**: 15-20 minutes  
**Technical Level**: Intermediate

---

## Quick Commands

### Enable Automatic Deployment:
```bash
# After SSH setup is complete
mv .github/workflows/notify-deploy.yml .github/workflows/notify-deploy.yml.disabled
git add .github/workflows/
git commit -m "Enable automatic deployment"
git push origin main
```

### Disable Automatic Deployment:
```bash
mv .github/workflows/deploy.yml .github/workflows/deploy.yml.disabled
mv .github/workflows/notify-deploy.yml.disabled .github/workflows/notify-deploy.yml
git add .github/workflows/
git commit -m "Disable automatic deployment"
git push origin main
```

### Manual Trigger (after setup):
```bash
# Trigger deployment without code changes
gh workflow run deploy.yml
# Or use GitHub UI: Actions > Deploy to 20i Hosting > Run workflow
```

---

## Support & Resources

### 20i Documentation:
- SSH Access: https://www.20i.com/support/cpanel/ssh-access
- Git Integration: https://www.20i.com/support/wordpress/git-version-control
- File Manager: https://www.20i.com/support/cpanel/file-manager

### GitHub Actions:
- Documentation: https://docs.github.com/en/actions
- Secrets: https://docs.github.com/en/actions/security-guides/encrypted-secrets
- SSH Action: https://github.com/appleboy/ssh-action

### Need Help?
- Check workflow logs: https://github.com/giriv11/rs999static/actions
- 20i Support: https://www.20i.com/support
- GitHub Issues: Create an issue in your repository

---

## Summary

| Method | Setup Time | Automation | Cost |
|--------|-----------|------------|------|
| **Manual Deploy** | 0 min | ❌ Manual | Free |
| **GitHub Actions** | 15-20 min | ✅ Full | Free |
| **20i Auto-Deploy** | 5 min | ✅ Full | Plan dependent |

**Recommendation**: Set up GitHub Actions + SSH for full automation!

---

**Last Updated**: October 14, 2025  
**Version**: 1.0  
**Status**: Ready for setup
