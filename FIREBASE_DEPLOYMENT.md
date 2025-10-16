# Firebase Hosting Deployment Guide

## Prerequisites

1. **Node.js and npm** (already installed ✅)
2. **Firebase CLI**
3. **Google Account** for Firebase Console

## Step 1: Install Firebase CLI

```bash
npm install -g firebase-tools
```

## Step 2: Login to Firebase

```bash
firebase login
```

This will open a browser window for Google authentication.

## Step 3: Initialize Firebase Project

### Option A: Link to Existing Firebase Project

If you already have a Firebase project:

```bash
firebase init hosting
```

Select:
- **Use an existing project** → Choose your project
- **Public directory**: `.` (current directory)
- **Configure as single-page app**: `No`
- **Set up automatic builds**: `No`
- **Overwrite index.html**: `No`

### Option B: Create New Firebase Project

1. Go to https://console.firebase.google.com/
2. Click "Add project"
3. Name: `rs999-web-services` (or your preferred name)
4. Disable Google Analytics (optional)
5. Click "Create project"

Then run:
```bash
firebase init hosting
```

## Step 4: Configure Custom Domain (www.rs999.in)

### In Firebase Console:

1. Go to **Hosting** in Firebase Console
2. Click **Add custom domain**
3. Enter: `www.rs999.in`
4. Firebase will provide DNS records to add:

```
Type: A
Name: www
Value: 151.101.1.195
       151.101.65.195
```

OR

```
Type: CNAME
Name: www
Value: rs999-web-services.web.app
```

### In Your Domain Registrar (20i or wherever rs999.in is registered):

1. Go to DNS settings
2. Add the A records or CNAME provided by Firebase
3. Wait 24-48 hours for DNS propagation

### Add non-www redirect:

Also add for `rs999.in` (without www):
```
Type: A
Name: @
Value: 151.101.1.195
       151.101.65.195
```

Firebase will automatically redirect `rs999.in` → `www.rs999.in`

## Step 5: Deploy Your Site

### First Deployment:

```bash
# Make sure you're in the project directory
cd /home/ubuntu/2025/Rs999Static

# Deploy to Firebase
firebase deploy --only hosting
```

### Subsequent Deployments:

```bash
# After making changes, just run:
firebase deploy --only hosting
```

## Step 6: Verify Deployment

After deployment, Firebase will show:

```
✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/rs999-web-services/overview
Hosting URL: https://rs999-web-services.web.app
```

Visit the URL to verify your site is live!

## Deployment Workflow

### Regular Updates:

```bash
# 1. Make changes to your files
# 2. Test locally (optional)
python3 -m http.server 8080

# 3. Rebuild CSS if needed
npm run build-css

# 4. Commit to Git
git add -A
git commit -m "Your update message"
git push origin main

# 5. Deploy to Firebase
firebase deploy --only hosting
```

## Firebase Project Structure

```
Rs999Static/
├── firebase.json          # Firebase configuration (created ✅)
├── .firebaserc           # Project aliases (auto-created)
├── index.html            # Your homepage
├── page/                 # About, Services, etc.
├── blog/                 # Blog posts
├── assets/               # CSS, JS, images
└── .htaccess            # Not needed (Firebase handles this)
```

## Configuration Details (firebase.json)

### Cache Headers:
- **Images** (jpg, png, webp, avif): 1 year cache
- **Fonts** (woff, woff2): 1 year cache
- **CSS/JS**: 1 month cache
- **HTML/JSON**: 1 hour cache with revalidation

### URL Rewrites:
- `/page/about` → `/page/about.html`
- `/blog/post-name` → `/blog/post-name.html`

### Security:
- Automatic SSL/HTTPS (free)
- CDN included (global edge locations)
- DDoS protection

## Firebase Hosting Benefits

✅ **Free SSL Certificate** - Automatic HTTPS  
✅ **Global CDN** - Fast worldwide delivery  
✅ **Zero-downtime deploys** - Instant rollbacks  
✅ **Custom domain** - www.rs999.in supported  
✅ **Automatic compression** - Gzip/Brotli  
✅ **Free tier** - 10GB storage, 360MB/day  

## Pricing

**Free Spark Plan:**
- 10 GB storage
- 360 MB/day transfer (~10GB/month)
- Perfect for small-medium sites

**If you exceed free tier:**
- Pay-as-you-go: $0.026/GB storage, $0.15/GB transfer

**Your site estimate:**
- Site size: ~15MB
- Expected traffic: Well within free tier

## Testing Before Going Live

### Preview Channel (Optional):

```bash
# Create preview deployment
firebase hosting:channel:deploy preview

# Visit: https://rs999-web-services--preview-abc123.web.app
```

This lets you test changes before deploying to production!

## Troubleshooting

### Issue: "Permission denied"
```bash
firebase login --reauth
```

### Issue: "Project not found"
```bash
firebase use --add
# Select your project from the list
```

### Issue: Files not deploying
Check `.firebaseignore` or `firebase.json` ignore patterns

### Issue: 404 errors
Make sure file paths in HTML use relative paths starting with `/`

## Rollback if Needed

```bash
# View deployment history
firebase hosting:clone --only hosting

# Rollback to previous version
firebase hosting:clone SOURCE_SITE_ID:SOURCE_VERSION DESTINATION_SITE_ID
```

## Monitoring

### Firebase Console:
- Usage statistics
- Performance monitoring
- Error tracking
- Analytics (if enabled)

## Domain Migration from 20i

Once Firebase deployment is working:

1. **Test Firebase site**: Visit `rs999-web-services.web.app`
2. **Add custom domain**: Follow Step 4 above
3. **Update DNS**: Point www.rs999.in to Firebase
4. **Wait for propagation**: 24-48 hours
5. **Verify**: Visit www.rs999.in
6. **Keep 20i backup**: For 30 days before canceling

## Quick Reference Commands

```bash
# Login
firebase login

# Initialize project
firebase init hosting

# Deploy
firebase deploy --only hosting

# View live site
firebase open hosting:site

# Check deployment status
firebase hosting:channel:list

# View usage
firebase hosting:clone --only hosting
```

## Next Steps After Deployment

1. ✅ Deploy to Firebase
2. ✅ Test on `rs999-web-services.web.app`
3. ✅ Add custom domain `www.rs999.in`
4. ✅ Update DNS records
5. ✅ Verify SSL certificate (automatic)
6. ✅ Run PageSpeed test on Firebase URL
7. ✅ Monitor performance in Firebase Console

## Support

- Firebase Documentation: https://firebase.google.com/docs/hosting
- Firebase Console: https://console.firebase.google.com/
- Community: https://stackoverflow.com/questions/tagged/firebase-hosting

---

**Ready to deploy?** Run: `firebase login && firebase init hosting && firebase deploy`
