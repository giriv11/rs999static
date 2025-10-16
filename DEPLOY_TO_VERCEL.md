# Deploy Rs999 Next.js to Vercel

## ✅ Completed Steps

1. **Production Build**: Successfully compiled with all TypeScript errors resolved
2. **Git Repository**: Code pushed to `https://github.com/giriv11/rs999static` (nextjs branch)
3. **Configuration Files**: All deployment files ready (.gitignore, vercel.json, .env.local.example)

## 🚀 Vercel Deployment Steps

### Step 1: Sign in to Vercel
Visit [vercel.com](https://vercel.com) and sign in with your GitHub account.

### Step 2: Import Project
1. Click **"Add New..."** → **"Project"**
2. Select **"Import Git Repository"**
3. Find and select: `giriv11/rs999static`
4. Select the **`nextjs`** branch
5. Click **"Import"**

### Step 3: Configure Project
Vercel will automatically detect Next.js. Verify these settings:

- **Framework Preset**: Next.js
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### Step 4: Add Environment Variables
Click **"Environment Variables"** and add these:

```bash
# WordPress API
WORDPRESS_API_URL=https://rs999.in/wp-json
NEXT_PUBLIC_WORDPRESS_API_URL=https://rs999.in/wp-json

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://rs999.in

# Google Analytics
NEXT_PUBLIC_GA_ID=G-PKX2SEY7ZL

# ISR Revalidation (optional - defaults to 3600)
REVALIDATE_TIME=3600

# Perfex CRM (if using)
PERFEX_API_KEY=your_actual_api_key_here
PERFEX_API_URL=https://your-perfex-url.com/api
```

**Important Notes:**
- Add variables to **Production**, **Preview**, and **Development** environments
- For `PERFEX_API_KEY`, replace with your actual API key from Perfex CRM
- The WordPress API URL should be accessible (check SSL certificate)

### Step 5: Deploy
1. Click **"Deploy"**
2. Wait for the build to complete (~2-3 minutes)
3. Vercel will provide a URL like: `https://rs999static-xxx.vercel.app`

### Step 6: Configure Custom Domain
1. Go to **"Settings"** → **"Domains"**
2. Add your domain: `rs999.in`
3. Also add: `www.rs999.in`
4. Follow Vercel's DNS configuration instructions:

#### DNS Records to Add:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Or use CNAME (if supported by DNS provider):**
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

### Step 7: SSL Certificate
Vercel automatically provisions SSL certificates via Let's Encrypt. This typically takes 1-2 minutes after DNS propagation.

## 🔧 Post-Deployment Configuration

### WordPress API SSL Issue
If you see errors about SSL certificates during build, this is because `rs999.in` might be pointing to Firebase. You have two options:

1. **Update DNS First** (Recommended)
   - Point `rs999.in` to your WordPress server before deploying
   - Then redeploy on Vercel

2. **Use Subdomain**
   - Keep WordPress on `wp.rs999.in` or `blog.rs999.in`
   - Update environment variables with new URL
   - Update `WORDPRESS_API_URL` in Vercel

### Verify Deployment
Check these after deployment:
- ✅ Homepage loads correctly
- ✅ Blog listing page works (`/blog`)
- ✅ Individual blog posts load (`/blog/[slug]`)
- ✅ SEO metadata from Yoast appears in HTML source
- ✅ Quote form opens and submits
- ✅ Mobile responsiveness
- ✅ Performance score (Lighthouse)

## 🐛 Troubleshooting

### Build Fails on Vercel
- Check environment variables are set correctly
- Verify WordPress API is accessible from Vercel's servers
- Check build logs for specific errors

### WordPress API Errors
- Ensure CORS is enabled on WordPress
- Verify REST API is enabled
- Check SSL certificate is valid

### Forms Not Working
- Verify Perfex CRM API credentials
- Check network tab for API errors
- Ensure CORS headers allow Vercel domain

### Images Not Loading
- Check WordPress media URLs are correct
- Verify images are accessible publicly
- Update Next.js image domains in `next.config.mjs` if needed

## 📊 Performance Optimization

After deployment, consider these optimizations:

1. **Image Optimization**
   - Next.js automatically optimizes images
   - Ensure WordPress serves WebP format

2. **Caching Strategy**
   - ISR is set to 1 hour (3600s)
   - Adjust `REVALIDATE_TIME` if needed

3. **Analytics**
   - Google Analytics is configured
   - Monitor Core Web Vitals in Vercel Analytics

4. **CDN**
   - Vercel's Edge Network provides global CDN
   - No additional configuration needed

## 🔄 Continuous Deployment

Every push to the `nextjs` branch will automatically:
1. Trigger a new build on Vercel
2. Run tests and type checks
3. Deploy to production if successful
4. Rollback automatically if deployment fails

### Manual Redeployment
To redeploy without code changes:
1. Go to Vercel Dashboard
2. Select your project
3. Click **"Deployments"**
4. Click **"⋯"** on latest deployment
5. Select **"Redeploy"**

## 📞 Support Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **WordPress REST API**: https://developer.wordpress.org/rest-api/
- **Project Repository**: https://github.com/giriv11/rs999static/tree/nextjs

---

## Quick Reference

**GitHub Repository**: `https://github.com/giriv11/rs999static`  
**Branch**: `nextjs`  
**Framework**: Next.js 15.5.5  
**Build Command**: `npm run build`  
**Deploy Platform**: Vercel  

**Key Features**:
- ✅ WordPress Headless CMS
- ✅ Server-Side Rendering (SSR)
- ✅ Incremental Static Regeneration (ISR)
- ✅ SEO Optimized (Yoast integration)
- ✅ Mobile Responsive
- ✅ Production Ready

---

**Next Step**: Go to [vercel.com/new](https://vercel.com/new) and import the project!
