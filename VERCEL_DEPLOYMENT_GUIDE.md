# 🚀 Vercel Deployment Guide - Rs999 Next.js

## Complete Step-by-Step Deployment Instructions

### Prerequisites ✅
- [x] GitHub account
- [x] Vercel account (free tier - sign up at vercel.com)
- [x] WordPress site running with REST API enabled
- [x] Domain registered (rs999.in)

---

## Part 1: Prepare for Deployment

### Step 1: Create Environment Variables File

Create `.env.local` in your project root:

```bash
cd /home/ubuntu/2025/rs999-nextjs
cp .env.example .env.local
```

Edit `.env.local` with your actual values:

```env
# WordPress API Configuration
WORDPRESS_API_URL=https://rs999.in/wp-json
NEXT_PUBLIC_WORDPRESS_API_URL=https://rs999.in/wp-json

# Perfex CRM Integration (Optional)
PERFEX_API_KEY=your_actual_api_key_here
PERFEX_API_URL=https://your-perfex-domain.com/api

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://rs999.in

# Analytics
NEXT_PUBLIC_GA_ID=G-PKX2SEY7ZL
```

### Step 2: Test Local Build

```bash
npm run build
npm start
```

Visit `http://localhost:3000` to verify everything works.

---

## Part 2: Push to GitHub

### Step 1: Initialize Git Repository

```bash
cd /home/ubuntu/2025/rs999-nextjs
git init
git add .
git commit -m "Initial commit: Rs999 Next.js migration"
```

### Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Name: `rs999-nextjs`
3. Description: "Rs999 Web Services - Next.js + WordPress Headless"
4. Visibility: Private (recommended)
5. Click "Create repository"

### Step 3: Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/rs999-nextjs.git
git branch -M main
git push -u origin main
```

---

## Part 3: Deploy to Vercel

### Step 1: Sign Up / Log In to Vercel

1. Go to https://vercel.com
2. Sign up with GitHub (recommended)
3. Authorize Vercel to access your GitHub account

### Step 2: Import Project

1. Click "Add New..." → "Project"
2. Import your `rs999-nextjs` repository
3. Configure project:
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./`
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)
   - **Install Command:** `npm install` (default)

### Step 3: Configure Environment Variables

In Vercel project settings, add these environment variables:

#### Production Environment Variables:

| Key | Value | Environment |
|-----|-------|-------------|
| `WORDPRESS_API_URL` | `https://rs999.in/wp-json` | Production |
| `NEXT_PUBLIC_WORDPRESS_API_URL` | `https://rs999.in/wp-json` | Production, Preview, Development |
| `NEXT_PUBLIC_SITE_URL` | `https://rs999.in` | Production |
| `NEXT_PUBLIC_GA_ID` | `G-PKX2SEY7ZL` | Production, Preview |
| `PERFEX_API_KEY` | `your_api_key` | Production |
| `PERFEX_API_URL` | `https://your-perfex.com/api` | Production |

**Important:** Mark `NEXT_PUBLIC_*` variables for all environments (Production, Preview, Development)

### Step 4: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes for build to complete
3. Vercel will provide a preview URL: `https://rs999-nextjs-xxx.vercel.app`

---

## Part 4: Configure Custom Domain

### Step 1: Add Domain in Vercel

1. Go to your project → Settings → Domains
2. Add domain: `rs999.in`
3. Add www subdomain: `www.rs999.in`
4. Vercel will show DNS configuration instructions

### Step 2: Update DNS Records

In your domain registrar (Namecheap, GoDaddy, etc.):

#### For Root Domain (rs999.in):

**Option A - A Record (Recommended):**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**Option B - CNAME (Alternative):**
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
TTL: 3600
```

#### For WWW Subdomain:

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### Step 3: Verify Domain

1. Wait 5-10 minutes for DNS propagation
2. Vercel will automatically verify and issue SSL certificate
3. Your site will be live at https://rs999.in

---

## Part 5: Configure ISR (Incremental Static Regeneration)

ISR is already configured in your WordPress API functions:

```typescript
// lib/wordpress.ts
const fetchAPI = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${WORDPRESS_API_URL}${endpoint}`;
  
  const res = await fetch(url, {
    ...options,
    next: { revalidate: 3600 }, // ✅ 1-hour cache
  });
  
  // ... rest of code
};
```

**What this means:**
- Pages are cached for 1 hour
- After 1 hour, next visitor triggers background regeneration
- Fresh content appears without manual rebuilds
- Perfect balance of speed + freshness

### Adjust Revalidation Time (Optional):

Edit `lib/wordpress.ts`:
- **More frequent updates:** `revalidate: 1800` (30 minutes)
- **Less frequent:** `revalidate: 7200` (2 hours)
- **No caching:** `revalidate: 0` (not recommended)

---

## Part 6: WordPress Configuration

### Step 1: Verify REST API Access

Test your WordPress API:
```bash
curl https://rs999.in/wp-json/wp/v2/posts
```

Should return JSON data (not error).

### Step 2: Install Required Plugins

1. **Yoast SEO** or **RankMath**
   - Provides `yoast_head_json` in API
   - Auto-generates meta tags
   
2. **ACF (Advanced Custom Fields)** - Optional
   - For custom fields in API
   
3. **WP REST API Controller** - Optional
   - Fine-tune API access

### Step 3: Enable CORS (If Needed)

If you get CORS errors, add to WordPress `functions.php`:

```php
add_action('rest_api_init', function() {
    header('Access-Control-Allow-Origin: https://rs999.in');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
});
```

---

## Part 7: Post-Deployment Testing

### Checklist:

- [ ] Homepage loads: https://rs999.in
- [ ] Blog listing works: https://rs999.in/blog
- [ ] Individual posts load: https://rs999.in/blog/test-post
- [ ] Navigation works (all links)
- [ ] Mobile responsive (test on phone)
- [ ] Forms submit correctly
- [ ] Images load properly
- [ ] SEO metadata appears (view source)
- [ ] Google Analytics tracking (check GA dashboard)
- [ ] SSL certificate valid (https working)

### Performance Testing:

1. **Lighthouse Test:**
   - Open Chrome DevTools
   - Go to Lighthouse tab
   - Run audit
   - Target: 95-100 score

2. **PageSpeed Insights:**
   - Visit https://pagespeed.web.dev
   - Enter: https://rs999.in
   - Check mobile + desktop scores

3. **GTmetrix:**
   - Visit https://gtmetrix.com
   - Test your site
   - Aim for A grade

---

## Part 8: Continuous Deployment

### Automatic Deployments:

Every time you push to GitHub:
```bash
git add .
git commit -m "Update homepage content"
git push origin main
```

Vercel automatically:
1. Detects the push
2. Builds the project
3. Deploys to production
4. Sends deployment notification

### Preview Deployments:

For testing changes:
```bash
git checkout -b feature/new-section
# Make changes
git add .
git commit -m "Add new testimonials section"
git push origin feature/new-section
```

Vercel creates a preview URL for the branch.

---

## Part 9: Monitoring & Maintenance

### Vercel Dashboard:

Monitor in real-time:
- **Analytics:** Page views, unique visitors
- **Web Vitals:** LCP, FID, CLS scores
- **Logs:** Build logs, function logs
- **Deployments:** History of all deployments

### WordPress Updates:

When you publish new content in WordPress:
1. Content appears in API immediately
2. Vercel serves cached version for up to 1 hour
3. After 1 hour, next visitor triggers regeneration
4. Fresh content appears automatically

**Force Immediate Update:**
- Go to Vercel Dashboard
- Deployments → Latest
- Click "Redeploy"

---

## Part 10: Troubleshooting

### Issue: Build Fails

**Solution:**
```bash
# Test locally first
npm run build

# Check build logs in Vercel dashboard
# Fix errors in code
git add .
git commit -m "Fix build error"
git push origin main
```

### Issue: Environment Variables Not Working

**Solution:**
1. Check variable names (case-sensitive)
2. Verify `NEXT_PUBLIC_` prefix for client-side vars
3. Redeploy after changing environment variables

### Issue: WordPress API Not Accessible

**Solution:**
1. Verify WordPress URL in environment variables
2. Test API manually: `curl https://rs999.in/wp-json/wp/v2/posts`
3. Check WordPress REST API is enabled
4. Verify CORS settings

### Issue: Slow Page Load

**Solution:**
1. Check ISR is working (should see fast loads after first visit)
2. Optimize images (use Next.js Image component)
3. Reduce API calls
4. Check WordPress server response time

### Issue: Domain Not Working

**Solution:**
1. Wait 24 hours for full DNS propagation
2. Verify DNS records are correct
3. Check domain nameservers point to registrar
4. Try www version if root domain not working

---

## Part 11: Optimization Tips

### 1. Image Optimization

Replace `<img>` tags with Next.js Image:

```typescript
import Image from 'next/image';

<Image 
  src="/images/logo.png"
  alt="Rs999 Logo"
  width={200}
  height={50}
  priority
/>
```

### 2. Metadata Optimization

Each page already has metadata. To customize:

```typescript
export const metadata: Metadata = {
  title: 'Your Custom Title',
  description: 'Your custom description',
  // ... more metadata
};
```

### 3. Analytics Setup

Google Analytics is already configured. To verify:
1. Visit https://analytics.google.com
2. Check Real-Time reports
3. Visit your site to see yourself

### 4. Sitemap Generation

Create `app/sitemap.ts`:

```typescript
import { getAllUrls } from '@/lib/wordpress';

export default async function sitemap() {
  const urls = await getAllUrls();
  
  return urls.map(url => ({
    url: `https://rs999.in${url}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));
}
```

---

## Part 12: Cost Analysis

### Vercel Free Tier Includes:

✅ **100GB Bandwidth/month**
- Typical usage: 5-10GB for 10,000 visitors
- More than enough for most websites

✅ **Unlimited Deployments**
- Deploy as many times as you want
- Preview deployments included

✅ **SSL Certificate**
- Auto-renewed Let's Encrypt
- No manual configuration

✅ **Global CDN**
- 100+ edge locations
- Fastest delivery worldwide

✅ **Analytics**
- Web Vitals tracking
- Visitor insights

### When to Upgrade:

Upgrade to Pro ($20/month) if you need:
- More than 100GB bandwidth
- Advanced analytics
- Password protection
- Custom redirects
- Team collaboration

---

## Summary: Deployment Checklist

### Pre-Deployment:
- [x] Code complete and tested locally
- [ ] Environment variables configured
- [ ] Git repository created
- [ ] GitHub repository created and pushed

### Deployment:
- [ ] Vercel account created
- [ ] Project imported to Vercel
- [ ] Environment variables added in Vercel
- [ ] First deployment successful
- [ ] Preview URL verified

### Domain Configuration:
- [ ] Custom domain added in Vercel
- [ ] DNS records updated
- [ ] SSL certificate issued
- [ ] Domain verified and live

### WordPress:
- [ ] REST API enabled
- [ ] Yoast SEO installed
- [ ] Test content published
- [ ] API accessible from Vercel

### Testing:
- [ ] All pages load correctly
- [ ] Navigation works
- [ ] Mobile responsive
- [ ] SEO metadata present
- [ ] Forms functional
- [ ] Analytics tracking

---

## 🎉 Congratulations!

Your Rs999 website is now:
- ✅ **Live** on Vercel's global CDN
- ✅ **Fast** with ISR caching
- ✅ **SEO-optimized** with server-side rendering
- ✅ **Secure** with automatic SSL
- ✅ **Scalable** with serverless architecture

**Next steps:**
1. Add more WordPress content
2. Monitor analytics in Vercel dashboard
3. Run Lighthouse tests monthly
4. Keep WordPress and plugins updated

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- WordPress API: https://developer.wordpress.org/rest-api/

**Support:**
- GitHub Issues: Create issue in your repository
- Vercel Support: support@vercel.com (Pro plan)
- WordPress Forums: https://wordpress.org/support/

---

**Deployment Date:** October 16, 2025  
**Status:** Ready to Deploy ✅  
**Estimated Time:** 30-45 minutes

🚀 **Let's go live!**
