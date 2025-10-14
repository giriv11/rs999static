# Complete Deployment Guide - Static Site + Admin API

Your Rs999 website has **TWO parts** that need separate deployments:

## 🎯 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  1. STATIC WEBSITE (HTML/CSS/JS)                       │
│     - index.html, pages, blog posts                    │
│     - Reads JSON files                                  │
│     - DigitalOcean Static Site                         │
│     - URL: https://rs999-website.ondigitalocean.app    │
│                                                         │
└─────────────────────────────────────────────────────────┘
                           ↕
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  2. ADMIN API SERVER (Node.js/Express)                 │
│     - server.js                                         │
│     - Creates blog posts                                │
│     - Commits to GitHub                                 │
│     - DigitalOcean Web Service                         │
│     - URL: https://rs999-admin-api.ondigitalocean.app  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## 🚀 Step-by-Step Deployment

### Step 1: Deploy from App Spec (EASIEST)

1. **Go to DigitalOcean Dashboard**
   - Navigate to: https://cloud.digitalocean.com/apps

2. **Create App from Spec**
   - Click "Create" → "Apps"
   - Choose **"Import from App Spec"**
   - Select repository: `giriv11/rs999static`
   - Select branch: `main`
   - It will automatically load `.do/app.yaml`
   - Click "Next" → "Review" → **"Create Resources"**

3. **Wait for Deployment** (2-3 minutes)
   - Both components will deploy automatically
   - Static site builds CSS
   - API server starts on port 8080

### Step 2: Update Admin Panel with API URL

After deployment completes:

1. **Find your API URL**
   - Go to your app in DigitalOcean
   - Click on "rs999-admin-api" component
   - Copy the URL (e.g., `https://rs999-admin-api-xxxxx.ondigitalocean.app`)

2. **Update admin.html** (Line ~335)
   ```javascript
   const API_URL = window.location.hostname === 'localhost'
     ? 'http://localhost:3001/api'
     : 'https://YOUR-ACTUAL-API-URL.ondigitalocean.app/api';  // ← Update this
   ```

3. **Commit and push:**
   ```bash
   git add admin.html
   git commit -m "Update API URL for production"
   git push origin main
   ```

4. **DigitalOcean auto-deploys** (30-60 seconds)

### Step 3: Test the Complete System

1. **Access your static site:**
   - Open: `https://rs999-website-xxxxx.ondigitalocean.app`
   - Should show your homepage

2. **Access admin panel:**
   - Open: `https://rs999-website-xxxxx.ondigitalocean.app/admin.html`
   - Enter password: `Rs999Admin@2025`

3. **Create a test blog post:**
   - Fill in the form
   - Click "Publish Post to GitHub"
   - Should see success message

4. **Verify auto-deployment:**
   - Wait 60 seconds
   - Refresh your blog page
   - New post should appear!

## 💰 Pricing

### Free Tier Includes:
- ✅ **3 Static Sites** - Your website is covered
- ❌ **Web Services are NOT free** - API server costs $5/month

### Cost Breakdown:
- Static Website: **$0/month** (free tier)
- Admin API Server: **$5/month** (basic-xxs instance)
- **Total: $5/month**

## 🔧 Alternative: Run API Locally (Free)

If you want to avoid the $5/month cost:

### Keep Static Site on DigitalOcean (Free)
- Deploy only the static site
- Remove the `services:` section from `.do/app.yaml`

### Run API Server Locally
```bash
# On your local machine when creating blog posts:
cd /home/ubuntu/2025/Rs999Static
node server.js
```

Then open `admin.html` locally to create posts.

**Workflow:**
1. Run `node server.js` locally
2. Open `http://localhost:8000/admin.html` in browser
3. Create blog post
4. Server commits and pushes to GitHub
5. DigitalOcean auto-deploys static site (free)
6. Stop local server when done

## 🌐 Custom Domain Setup

After successful deployment:

1. **In DigitalOcean Dashboard:**
   - Go to your app → Settings → Domains
   - Add: `rs999.in` and `www.rs999.in`

2. **In your DNS provider:**
   - Add CNAME record: `www` → `your-app.ondigitalocean.app`
   - Add ALIAS/ANAME record: `@` → `your-app.ondigitalocean.app`

3. **SSL Certificate:**
   - Automatically provisioned by DigitalOcean
   - Takes 5-10 minutes

## 🔐 Security Notes

### Update Admin Password
In `.do/app.yaml`, the admin password is set as a secret:
```yaml
envs:
  - key: ADMIN_PASSWORD
    value: Rs999Admin@2025
    type: SECRET
```

Change this to a stronger password in production!

### CORS Configuration
The server allows all origins (`*`) for development. In production, update `server.js`:
```javascript
res.header('Access-Control-Allow-Origin', 'https://your-actual-domain.com');
```

## 📊 Monitoring

### Check Health Status
Visit: `https://rs999-admin-api-xxxxx.ondigitalocean.app/api/health`

Should return:
```json
{
  "status": "ok",
  "service": "rs999-admin-api",
  "timestamp": "2025-10-14T20:30:00.000Z"
}
```

### View Logs
- Go to your app in DigitalOcean
- Click "Runtime Logs"
- Monitor API requests and errors

## 🐛 Troubleshooting

### Static Site Not Loading
- Check build logs in DigitalOcean
- Verify `npm run build-css` completed
- Check output directory is `/`

### API Server Health Check Failing
- Verify `/api/health` endpoint responds
- Check PORT environment variable (should be 8080)
- View runtime logs for errors

### Admin Panel Can't Connect to API
- Check API URL in admin.html matches actual deployment URL
- Verify CORS headers in server.js
- Check browser console for errors

### Blog Posts Not Appearing
- Check if git push succeeded in API logs
- Verify `posts/index.json` was updated
- Wait 60 seconds for auto-deployment

## ✅ Success Checklist

- [ ] Both components deployed successfully
- [ ] Static site accessible via URL
- [ ] Admin panel loads (enter password works)
- [ ] API health check returns 200 OK
- [ ] Created test blog post successfully
- [ ] Blog post appears on website after 60 seconds
- [ ] Custom domain configured (optional)

## 📞 Need Help?

If deployment fails, check:
1. GitHub Actions logs (if any workflows are running)
2. DigitalOcean build logs (in your app dashboard)
3. Runtime logs (for API server errors)

---

**Ready to Deploy?** Delete any failed apps in DigitalOcean, then click "Create → Apps → Import from App Spec"! 🚀
