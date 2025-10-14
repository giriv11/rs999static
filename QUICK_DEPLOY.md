# 🚀 Deploy to DigitalOcean - 5 Minute Setup

## Quick Start

### 1. Create App
```
https://cloud.digitalocean.com/apps/new
```

### 2. Connect GitHub
- Repository: `giriv11/rs999static`
- Branch: `main`
- ✅ Enable **Autodeploy**

### 3. Configure
- **Type:** Static Site
- **Build Command:** `npm run build-css`
- **Output Directory:** `/`

### 4. Deploy
- **Plan:** Free Tier (3 sites free)
- **Region:** Choose closest (Bangalore/Singapore/NYC)
- Click: **Create Resources**

### 5. Done! ✨
Your site will be live at:
```
https://your-app-name.ondigitalocean.app
```

---

## Add Custom Domain (Optional)

### In DigitalOcean:
1. Settings → Domains → Add Domain
2. Enter: `rs999.in`

### In Your DNS Provider:
```
Type: A
Name: @
Value: [IP from DigitalOcean]

Type: CNAME  
Name: www
Value: your-app.ondigitalocean.app
```

**Wait:** 10-30 minutes for DNS

**SSL:** Auto-generated (free) ✅

---

## Test Automatic Deployment

### 1. Create a Blog Post:
```bash
npm run server
# Open: http://localhost:3001/admin.html
# Create post → Publish
```

### 2. Watch It Deploy:
- DigitalOcean dashboard shows: Building... → Live!
- Time: 30-60 seconds
- Your post is live! 🎉

---

## That's It!

✅ Auto-deploys on every push  
✅ No manual steps needed  
✅ Free SSL & CDN included  

**Full Guide:** See `DIGITALOCEAN_DEPLOYMENT.md`

---

**Cost:** FREE (Free tier includes 3 static sites)  
**Time:** 5 minutes setup, then automatic forever ✨
