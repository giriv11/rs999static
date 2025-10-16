# 🚀 Vercel Deployment Guide - Rs999 Next.js

## Quick Deploy (5 Minutes)

### Step 1: Push to GitHub
```bash
cd /home/ubuntu/2025/rs999-nextjs

# Initialize git if not done
git init
git add .
git commit -m "Initial Next.js migration complete"

# Add GitHub remote (replace with your repo URL)
git remote add origin https://github.com/giriv11/rs999-nextjs.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel CLI (Fastest)
```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - Project name? rs999-nextjs
# - Directory? ./
# - Override settings? No

# Deploy to production
vercel --prod
```

#### Option B: Using Vercel Dashboard
1. Go to https://vercel.com/new
2. Import Git Repository
3. Select GitHub and authorize
4. Import `rs999-nextjs` repository
5. Configure project:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
6. Add Environment Variables (see below)
7. Click **Deploy**

---

## Environment Variables Configuration

Add these in Vercel Dashboard → Settings → Environment Variables:

### Required Variables:
```env
# WordPress API
WORDPRESS_API_URL=https://rs999.in/wp-json
NEXT_PUBLIC_WORDPRESS_API_URL=https://rs999.in/wp-json

# Site URL
NEXT_PUBLIC_SITE_URL=https://rs999.in

# Google Analytics
NEXT_PUBLIC_GA_ID=G-PKX2SEY7ZL
```

### Optional Variables:
```env
# Perfex CRM (if using)
PERFEX_API_KEY=your_actual_api_key
PERFEX_API_URL=https://your-perfex-domain.com/api

# ISR Revalidation
REVALIDATE_TIME=3600
```

**Important:** Make sure to set these for all environments (Production, Preview, Development)

---

## Custom Domain Setup

### Step 1: Add Domain in Vercel
1. Go to Project Settings → Domains
2. Add domain: `rs999.in`
3. Add www subdomain: `www.rs999.in`

### Step 2: Update DNS Records

Add these records in your domain registrar (20i, GoDaddy, etc.):

**For apex domain (rs999.in):**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

**Or use Vercel nameservers (recommended):**
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

### Step 3: Configure SSL
- Vercel automatically provisions SSL certificates
- Wait 24-48 hours for DNS propagation
- Verify at: https://rs999.in

---

## ISR Configuration

ISR (Incremental Static Regeneration) is already configured with 1-hour revalidation.

### How it works:
1. First request → Server-side render
2. Response cached for 1 hour
3. After 1 hour → Regenerate in background
4. Fresh content served on next request

### Adjust revalidation time:
Edit `lib/wordpress.ts`:
```typescript
export async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  // Change 3600 to desired seconds
  const res = await fetch(url, {
    ...options,
    next: { revalidate: 3600 } // 1 hour
  });
}
```

**Recommended values:**
- Blog posts: 3600 (1 hour)
- Homepage: 1800 (30 minutes)
- Static pages: 86400 (24 hours)

---

## Build Optimization

### Analyze Bundle Size
```bash
npm run build

# Check output:
# Route (app)                              Size     First Load JS
# ┌ ○ /                                   X kB            Y kB
# ├ ○ /blog                               X kB            Y kB
# └ ƒ /blog/[slug]                        X kB            Y kB
```

### Reduce Bundle Size:
1. **Use dynamic imports** for heavy components
2. **Optimize images** - use Next.js Image component
3. **Remove unused dependencies**
4. **Enable compression** (Vercel does this automatically)

---

## Performance Checklist

### Before Going Live:
- [ ] Test all routes work: `/`, `/blog`, `/blog/[slug]`
- [ ] Verify WordPress API connection
- [ ] Check environment variables are set
- [ ] Test mobile responsiveness
- [ ] Run Lighthouse test (target 95+)
- [ ] Verify SEO meta tags in source
- [ ] Test contact forms
- [ ] Check analytics tracking
- [ ] Test ISR caching behavior
- [ ] Verify custom domain works
- [ ] Check SSL certificate

### Post-Deployment:
- [ ] Monitor Vercel Analytics
- [ ] Check WordPress API rate limits
- [ ] Set up error tracking (Sentry)
- [ ] Configure CDN caching
- [ ] Monitor Core Web Vitals

---

## Monitoring & Analytics

### Vercel Analytics (Free)
- Enable in: Settings → Analytics
- View: Overview dashboard

### Google Analytics
Already configured in `app/layout.tsx`
- GA ID: G-PKX2SEY7ZL
- View reports: https://analytics.google.com

### Performance Monitoring
```bash
# Run Lighthouse
npm install -g lighthouse
lighthouse https://rs999.in --view

# Or use Chrome DevTools:
# 1. Open rs999.in
# 2. F12 → Lighthouse tab
# 3. Generate report
```

---

## WordPress Configuration

### Required WordPress Setup:
1. **Enable REST API** (default enabled)
2. **Install Yoast SEO** or **RankMath**
3. **Set permalinks**: Settings → Permalinks → Post name
4. **Add CORS headers** (if needed):

Add to WordPress `.htaccess` or `functions.php`:
```php
// In functions.php
function add_cors_http_header(){
    header("Access-Control-Allow-Origin: https://rs999.in");
}
add_action('init','add_cors_http_header');
```

### Verify WordPress API:
```bash
curl https://rs999.in/wp-json/wp/v2/posts
curl https://rs999.in/wp-json/wp/v2/pages
```

---

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### WordPress API Not Working
1. Check CORS settings
2. Verify API URL in `.env.local`
3. Test API endpoint directly
4. Check WordPress REST API is enabled

### ISR Not Updating
1. Check revalidate time in `lib/wordpress.ts`
2. Trigger manual revalidation
3. Clear Vercel cache: Settings → General → Clear Cache

### Domain Not Working
1. Verify DNS records propagate: https://dnschecker.org
2. Check Vercel domain settings
3. Wait 24-48 hours for full propagation
4. Try clearing browser cache

---

## Cost Breakdown

### Vercel Free Tier Includes:
- ✅ 100GB bandwidth/month
- ✅ 100 deployments/day
- ✅ Automatic HTTPS
- ✅ Edge Network (CDN)
- ✅ Unlimited team members
- ✅ Preview deployments
- ✅ Analytics (optional)

### When You Exceed Free Tier:
- Pro Plan: $20/month
- 1TB bandwidth
- Priority support
- Advanced analytics

### Current Setup Cost:
- **WordPress Hosting**: £4.99/month (20i UK)
- **Vercel**: FREE
- **Total**: £4.99/month (~₹500/month)

**Savings**: ~£15-25/month vs traditional hosting

---

## Rollback Plan

### If Something Goes Wrong:

#### Option 1: Revert Deployment
```bash
# List deployments
vercel ls

# Rollback to previous
vercel rollback [deployment-url]
```

#### Option 2: Redeploy from Git
1. Go to Vercel Dashboard
2. Find previous successful deployment
3. Click "Promote to Production"

#### Option 3: Keep Static Site Running
- Static site is backed up at `/home/ubuntu/2025/Rs999Static_backup_*`
- WordPress still running at rs999.in
- Can switch back DNS to point to old server

---

## Next Steps After Deployment

### 1. Test Everything
```bash
# Homepage
curl -I https://rs999.in

# Blog
curl -I https://rs999.in/blog

# Check headers
curl -I https://rs999.in | grep -i cache
```

### 2. Monitor Performance
- Check Vercel Analytics daily
- Monitor WordPress API usage
- Watch for errors in Vercel logs

### 3. Optimize Further
- Add more pages from WordPress
- Implement image optimization
- Add sitemap generation
- Set up robots.txt

### 4. SEO Verification
- Submit sitemap to Google Search Console
- Verify structured data
- Check mobile-friendliness
- Monitor Core Web Vitals

---

## Support & Resources

### Documentation:
- Next.js: https://nextjs.org/docs
- Vercel: https://vercel.com/docs
- WordPress API: https://developer.wordpress.org/rest-api/

### Need Help?
- Vercel Support: https://vercel.com/support
- Next.js Discord: https://nextjs.org/discord
- Project docs: See `GETTING_STARTED.md`

---

## Deployment Checklist

### Pre-Deployment:
- [x] Code committed to GitHub
- [x] Environment variables configured
- [x] WordPress API tested
- [x] Build succeeds locally
- [x] All routes working

### Deployment:
- [ ] GitHub repository connected
- [ ] Vercel project created
- [ ] Environment variables added
- [ ] Initial deployment successful
- [ ] Preview URL works

### Post-Deployment:
- [ ] Custom domain added
- [ ] DNS records updated
- [ ] SSL certificate active
- [ ] All pages accessible
- [ ] WordPress integration working
- [ ] Analytics tracking
- [ ] Performance tested
- [ ] SEO verified

---

**Current Status:** Ready to Deploy! 🚀

**Deployment Time:** ~15 minutes  
**DNS Propagation:** 24-48 hours  
**Full Setup:** Complete within 1 hour

🎉 **Your Next.js site is ready for production!**
