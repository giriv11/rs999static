# Deployment Synchronization Guide

## How Changes Sync to Live Site

When you make changes through the admin panel (create/edit/delete posts, categories, tags), here's what happens:

### Backend Flow:
1. **Admin Panel** → Makes API request to `server.js`
2. **Server** → Updates files directly on GitHub via GitHub REST API
3. **GitHub** → Repository is updated with new commits
4. **DigitalOcean** → Detects GitHub changes and triggers auto-deployment
5. **Live Site** → Rebuilds and serves updated content

### Timing:
- **Immediate**: Changes are saved to GitHub (1-2 seconds)
- **Deployment**: DigitalOcean rebuilds static site (30-60 seconds)
- **Browser Cache**: Cleared via cache-busting parameters

## Cache-Busting Implementation

All JSON fetches now include `?t=${Date.now()}` parameter to bypass browser cache:

```javascript
// Posts index
fetch(`../posts/index.json?t=${Date.now()}`)

// Individual posts
fetch(`../posts/${slug}.json?t=${Date.now()}`)

// Categories
fetch('../categories.json?t=${Date.now()}')

// Tags
fetch('../tags.json?t=${Date.now()}')
```

## Verifying Changes

### After Creating/Editing/Deleting Content:

1. **Check Admin Panel**: Changes should appear immediately in "All Posts" tab
2. **Wait 30-60 seconds**: DigitalOcean deployment completes
3. **Refresh Browser**: Hard refresh (Ctrl+Shift+R / Cmd+Shift+R) on live site
4. **Verify**: Content should be updated

### If Changes Don't Appear:

1. **Check GitHub Repository**: 
   - Visit: https://github.com/giriv11/rs999static
   - Verify latest commit includes your changes
   - Check timestamp matches when you made changes

2. **Check DigitalOcean Dashboard**:
   - Go to: https://cloud.digitalocean.com/apps
   - Check "rs999-website" deployment status
   - View deployment logs if build failed

3. **Clear Browser Cache**:
   - Hard refresh: `Ctrl + Shift + R` (Windows/Linux) or `Cmd + Shift + R` (Mac)
   - Or open in Incognito/Private mode

4. **Check Server Logs**:
   ```bash
   # In admin API logs on DigitalOcean
   # Look for: ✅ Post created, ✅ Post updated, ✅ Post deleted
   ```

## Troubleshooting

### Problem: Changes in admin but not on live site

**Solution 1**: Wait Full Deployment Time
- DigitalOcean deployment takes 30-60 seconds
- Don't refresh immediately after saving

**Solution 2**: Manual Deployment Trigger
```bash
# From your local machine
curl -X POST https://your-api-url.ondigitalocean.app/api/trigger-deploy \
  -H "Authorization: Bearer Rs999Admin@2025"
```

**Solution 3**: Check GitHub Commit
- Visit repository commits page
- Ensure your changes were committed
- Commit message format: "Create post: {title}" or "Update post: {title}"

### Problem: 404 errors for posts

**Causes**:
1. Post slug changed but old URL cached
2. Post deleted but browser cached
3. JSON index not updated

**Solutions**:
- Clear browser cache completely
- Check `posts/index.json` includes the post
- Verify post file exists in `posts/{slug}.json`

### Problem: Categories not updating

**Causes**:
1. `categories.json` not updated on GitHub
2. Category counts not recalculated
3. Browser cache

**Solutions**:
- Hard refresh browser
- Check `categories.json` on GitHub
- Verify category was added via admin panel, not manually

## Deployment Logs Location

### DigitalOcean Static Site:
- App: `rs999-website`
- Component: Static Site
- Build Logs: Shows Tailwind CSS compilation
- Runtime Logs: N/A (static files only)

### DigitalOcean API Server:
- App: `rs999-website`
- Component: `rs999-admin-api`
- Build Logs: Shows npm install
- Runtime Logs: Shows API requests, GitHub operations

## Manual Deployment Options

### Option 1: Push Empty Commit to GitHub
```bash
git commit --allow-empty -m "Trigger deployment"
git push origin main
```

### Option 2: DigitalOcean Dashboard
1. Go to Apps → rs999-website
2. Click "Settings" tab
3. Click "Force Rebuild and Deploy"

### Option 3: GitHub Actions (Future Enhancement)
Set up webhook to trigger DigitalOcean API after GitHub push.

## Best Practices

1. **After Content Changes**: Wait 1 minute before checking live site
2. **Test in Admin First**: Use "View" button in admin panel
3. **Hard Refresh**: Always use Ctrl+Shift+R after deployment
4. **Monitor Builds**: Check DigitalOcean logs if issues persist
5. **Batch Changes**: Make multiple edits, then wait for one deployment

## Monitoring Deployment Status

### Check Deployment Progress:
1. Admin panel shows success notification
2. GitHub shows new commit (within 5 seconds)
3. DigitalOcean starts build (within 10 seconds)
4. DigitalOcean completes build (30-60 seconds total)
5. Changes visible on live site

### Success Indicators:
- ✅ "Post published successfully! It will appear on live site in 30-60 seconds."
- ✅ GitHub commit appears with your changes
- ✅ DigitalOcean build status shows "Active"
- ✅ Hard refresh shows new content

## Performance Notes

- **CDN Caching**: DigitalOcean may cache static files for 1 hour
- **Browser Caching**: Bypassed via `?t=timestamp` parameters
- **API Server**: No caching, always fresh data
- **GitHub API Rate Limit**: 5000 requests/hour (more than enough)

## Emergency Cache Clear

If content absolutely won't update after 5 minutes:

```bash
# Clear all DigitalOcean CDN cache (if available)
# Contact DigitalOcean support to purge CDN cache

# Or wait up to 1 hour for CDN cache to naturally expire
```

---

**Last Updated**: October 14, 2025
**Version**: 2.0
