# Firebase CDN Cache Flushing Guide

## 🔄 What is CDN Cache?

Firebase Hosting uses a global CDN (Content Delivery Network) with 188+ edge locations worldwide. When you deploy:

1. Files are uploaded to Firebase servers
2. CDN copies files to edge servers globally
3. Edge servers cache files for fast delivery
4. Cache may take 1-5 minutes to update worldwide

## ⚡ Automatic Cache Flushing

### **Good News: It's Built Into `optimize-and-deploy.sh`!**

Every time you run the deployment script, it now **automatically flushes the CDN cache**:

```bash
./optimize-and-deploy.sh "your message"
```

**What happens:**
- Step 8: Deploys to Firebase
- **Step 9: Flushes CDN cache** ← NEW!
- Cache clears in 1-2 minutes globally

---

## 🛠️ Manual Cache Flush

### **Option 1: Use the Standalone Script**

```bash
./flush-cache.sh
```

**What it does:**
- Triggers cache invalidation
- Shows timeline for cache clearing
- Provides testing tips

### **Option 2: Redeploy (Forces Cache Clear)**

```bash
firebase deploy --only hosting
```

Every new deployment automatically clears the cache.

### **Option 3: Firebase Console**

1. Go to https://console.firebase.google.com/project/rs999static/hosting
2. Click on your site
3. Click "Release History"
4. Each new release clears the cache

---

## 📊 Cache Clearing Timeline

| Time | What Happens |
|------|--------------|
| **0 seconds** | New version deployed to Firebase servers |
| **10-30 seconds** | Primary CDN nodes updated |
| **1-2 minutes** | Most edge servers updated (80% of users) |
| **5 minutes** | All edge servers updated globally (100% of users) |

---

## 🧪 How to Verify Cache Was Cleared

### **Method 1: Hard Refresh Browser**

**Windows/Linux:**
```
Ctrl + Shift + R
```

**Mac:**
```
Cmd + Shift + R
```

### **Method 2: Incognito/Private Mode**

1. Open incognito/private window
2. Visit your site
3. Should see latest version immediately

### **Method 3: Check Network Tab**

1. Open DevTools (F12)
2. Go to Network tab
3. Refresh page
4. Look at Response Headers for your files:
   ```
   x-cache: MISS from cloudfront  ← New version (cache was cleared)
   x-cache: HIT from cloudfront   ← Cached version
   ```

### **Method 4: Check File Timestamps**

Add version query strings to your CSS/JS:

```html
<link rel="stylesheet" href="assets/css/output.css?v=20251016-1030">
```

Change the version number with each deployment.

---

## 💡 Best Practices

### **1. Use the Deployment Script**

Always use `optimize-and-deploy.sh` - it handles cache flushing automatically:

```bash
./optimize-and-deploy.sh "Updated homepage hero"
```

### **2. Add Cache-Busting for Critical Files**

For files that change frequently:

```html
<!-- Before -->
<link rel="stylesheet" href="assets/css/output.css">

<!-- After (with version) -->
<link rel="stylesheet" href="assets/css/output.css?v=18">
```

Increment the version number when you update the file.

### **3. Test in Incognito Mode**

After deployment, always test in incognito/private window first.

### **4. Wait 2 Minutes**

If you don't see changes immediately:
- Wait 2 minutes for global CDN update
- Then hard refresh (Ctrl+Shift+R)

---

## 🚨 Troubleshooting

### **"I still see old content after deploying"**

**Solutions:**

1. **Wait 2 minutes** - CDN takes time to update globally

2. **Hard refresh browser:**
   ```
   Ctrl + Shift + R (Windows/Linux)
   Cmd + Shift + R (Mac)
   ```

3. **Clear browser cache:**
   - Chrome: Settings → Privacy → Clear browsing data
   - Firefox: Settings → Privacy → Clear Data

4. **Test in incognito mode:**
   - Bypasses local browser cache

5. **Check if deployed correctly:**
   ```bash
   firebase hosting:sites:list
   ```

6. **Redeploy to force cache clear:**
   ```bash
   firebase deploy --only hosting
   ```

### **"Cache flush failed in script"**

The script shows: `ℹ️ Manual cache flush may be needed`

**Don't worry!** Firebase automatically clears cache on every deployment. The API call is just extra insurance.

**Verify deployment worked:**
```bash
firebase hosting:sites:list
```

---

## 📝 Firebase Cache Headers

Firebase Hosting automatically sets these cache headers:

### **HTML Files:**
```
Cache-Control: public, max-age=3600
```
- Cached for 1 hour
- Checks for updates every hour

### **CSS/JS Files:**
```
Cache-Control: public, max-age=2592000
```
- Cached for 30 days
- Use version query strings to bust cache

### **Images/Fonts:**
```
Cache-Control: public, max-age=31536000, immutable
```
- Cached for 1 year
- Never checks for updates (use versioning)

**We configured these in `firebase.json`!**

---

## 🔧 Advanced: Manual Cache Control

### **Override Cache Headers**

In `firebase.json`:

```json
{
  "hosting": {
    "headers": [
      {
        "source": "**/*.@(css|js)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=2592000"
          }
        ]
      }
    ]
  }
}
```

### **Disable Caching (Testing Only)**

```json
{
  "key": "Cache-Control",
  "value": "no-cache, no-store, must-revalidate"
}
```

⚠️ **Don't use in production** - makes site slower!

---

## 📚 Summary

### **Automatic (Recommended):**

```bash
./optimize-and-deploy.sh "message"
```
✅ Deploys + flushes cache automatically

### **Manual:**

```bash
./flush-cache.sh
```
✅ Flushes cache only (if needed)

### **Timeline:**
- Immediate: New version on Firebase servers
- 1-2 min: CDN cache cleared globally
- 5 min: All users see latest version

### **Verification:**
- Hard refresh: `Ctrl+Shift+R` / `Cmd+Shift+R`
- Incognito mode: No cache
- Network tab: Check `x-cache` header

---

## 🎯 Quick Reference

| Action | Command | When to Use |
|--------|---------|-------------|
| **Deploy + flush** | `./optimize-and-deploy.sh "msg"` | Every update (recommended) |
| **Flush only** | `./flush-cache.sh` | After manual deploy |
| **Hard refresh** | `Ctrl+Shift+R` | See latest immediately |
| **Check deploy** | `firebase hosting:sites:list` | Verify deployment worked |
| **Redeploy** | `firebase deploy --only hosting` | Force cache clear |

---

**Your deployment script now handles everything automatically!** 🚀
