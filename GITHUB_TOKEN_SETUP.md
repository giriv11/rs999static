# GitHub Token Setup for DigitalOcean Deployment

## 🔑 Why You Need a GitHub Token

Your API server uses GitHub's REST API to create and update blog post files directly in your repository. Without this token, the server cannot push changes to GitHub, and new blog posts won't appear on your website.

## 📝 Step-by-Step: Create GitHub Personal Access Token

### 1. Go to GitHub Settings
Visit: https://github.com/settings/tokens

Or navigate:
- Click your profile picture (top right)
- Settings → Developer settings → Personal access tokens → Tokens (classic)

### 2. Generate New Token
- Click **"Generate new token"** → **"Generate new token (classic)"**

### 3. Configure Token
**Name:** `Rs999 DigitalOcean Admin`

**Expiration:** Choose:
- 90 days (recommended - more secure)
- No expiration (easier but less secure)

**Scopes:** Check ONLY these:
- ✅ `repo` (Full control of private repositories)
  - This includes: repo:status, repo_deployment, public_repo, repo:invite, security_events

### 4. Generate Token
- Scroll down, click **"Generate token"**
- **IMPORTANT:** Copy the token immediately (you won't see it again!)
- Example: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

## 🚀 Add Token to DigitalOcean

### Method 1: Via Dashboard (Recommended)

1. **Go to your app** in DigitalOcean
   - https://cloud.digitalocean.com/apps

2. **Navigate to Settings**
   - Click on your app (`rs999-complete-app`)
   - Go to the **"rs999-admin-api"** component
   - Click **"Environment Variables"**

3. **Add the token**
   - Click **"Edit"**
   - Find `GITHUB_TOKEN` variable
   - Replace `YOUR_GITHUB_TOKEN_HERE` with your actual token
   - Make sure **"Encrypt"** is checked ✅
   - Click **"Save"**

4. **Redeploy**
   - DigitalOcean will prompt to redeploy
   - Click **"Deploy"**

### Method 2: Update app.yaml and Redeploy

**⚠️ WARNING:** Never commit the actual token to your repository!

1. **Update via DigitalOcean Dashboard only** (Method 1 above)
2. Keep `YOUR_GITHUB_TOKEN_HERE` as placeholder in app.yaml
3. Set the real token in DigitalOcean environment variables

## ✅ Verify Setup

After redeployment (2-3 minutes):

1. **Check server logs:**
   - Go to your app → Runtime Logs
   - Should see: `✅ Git configured successfully`

2. **Create a test blog post:**
   - Visit: https://rs999-static-app-vc4qz.ondigitalocean.app/admin.html
   - Create a test post
   - Should see: `✅ Git push completed`

3. **Verify on GitHub:**
   - Visit: https://github.com/giriv11/rs999static/commits/main
   - Should see new commit: "Add new blog post: [Your Title]"

4. **Check website:**
   - Wait 60 seconds for auto-deployment
   - Visit your blog page
   - New post should appear!

## 🔒 Security Best Practices

### ✅ DO:
- Use token expiration (90 days recommended)
- Store token as encrypted environment variable in DigitalOcean
- Rotate tokens periodically
- Delete tokens you're no longer using

### ❌ DON'T:
- Never commit tokens to git repository
- Never share tokens publicly
- Don't use tokens with more permissions than needed

## 🐛 Troubleshooting

### Token Not Working?

1. **Verify token has correct permissions:**
   - Go to https://github.com/settings/tokens
   - Check that token has `repo` scope

2. **Check token is set correctly:**
   - In DigitalOcean app settings
   - Verify GITHUB_TOKEN environment variable
   - Make sure it starts with `ghp_`

3. **View runtime logs:**
   - Go to your app → Runtime Logs
   - Look for git error messages
   - Should see `✅ Git push completed` on success

### Still Getting Git Errors?

**Check the logs for:**
- `fatal: Authentication failed` → Token is wrong or missing
- `fatal: unable to auto-detect email` → Git config issue (fixed in server.js)
- `fatal: could not read Username` → Token not being used correctly

**Fix:**
1. Regenerate GitHub token
2. Update GITHUB_TOKEN in DigitalOcean
3. Redeploy the API service

## 📞 Need Help?

If you're still having issues:
1. Check DigitalOcean Runtime Logs
2. Verify token permissions on GitHub
3. Make sure GITHUB_REPO environment variable is set correctly: `giriv11/rs999static`

---

**Next:** After adding the token, create a test blog post to verify everything works! 🎉
