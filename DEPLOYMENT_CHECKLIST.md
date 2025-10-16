# Vercel Deployment Checklist ✅

## Pre-Deployment (Completed ✅)
- [x] Production build successful
- [x] Code pushed to GitHub (nextjs branch)
- [x] Environment variables documented
- [x] Deployment guides created

## Vercel Setup (Do Now 👇)

### 1. Sign in to Vercel
- [ ] Go to https://vercel.com
- [ ] Sign in with GitHub account

### 2. Import Project
- [ ] Click "Add New..." → "Project"
- [ ] Find repository: `giriv11/rs999static`
- [ ] Select branch: `nextjs`
- [ ] Click "Import"

### 3. Add Environment Variables
Copy and paste these into Vercel:

```bash
WORDPRESS_API_URL=https://rs999.in/wp-json
NEXT_PUBLIC_WORDPRESS_API_URL=https://rs999.in/wp-json
NEXT_PUBLIC_SITE_URL=https://rs999.in
NEXT_PUBLIC_GA_ID=G-PKX2SEY7ZL
REVALIDATE_TIME=3600
```

If using Perfex CRM, also add:
```bash
PERFEX_API_KEY=your_actual_api_key
PERFEX_API_URL=https://your-perfex-url.com/api
```

- [ ] Added to Production environment
- [ ] Added to Preview environment
- [ ] Added to Development environment

### 4. Deploy
- [ ] Click "Deploy" button
- [ ] Wait for build to complete
- [ ] Note the deployment URL: `________________.vercel.app`
- [ ] Test the site loads

### 5. Configure Custom Domain
- [ ] Go to Settings → Domains
- [ ] Add domain: `rs999.in`
- [ ] Add domain: `www.rs999.in`
- [ ] Update DNS records:

#### Option A: A Record + CNAME
```
Type: A, Name: @, Value: 76.76.21.21
Type: CNAME, Name: www, Value: cname.vercel-dns.com
```

#### Option B: CNAME Only (if supported)
```
Type: CNAME, Name: @, Value: cname.vercel-dns.com
Type: CNAME, Name: www, Value: cname.vercel-dns.com
```

- [ ] DNS records added
- [ ] Wait for DNS propagation (5-60 minutes)
- [ ] SSL certificate auto-provisioned by Vercel

## Post-Deployment Testing

### Functionality Tests
- [ ] Homepage loads at https://rs999.in
- [ ] Navigation menu works
- [ ] Blog listing loads: https://rs999.in/blog
- [ ] Individual blog post loads: https://rs999.in/blog/[any-post-slug]
- [ ] Quote form opens
- [ ] Quote form submits successfully
- [ ] Contact information displays correctly
- [ ] Social media links work

### SEO & Performance
- [ ] Run Lighthouse test (target score: 90+)
- [ ] Check meta tags in HTML source (Yoast data)
- [ ] Verify Open Graph tags for social sharing
- [ ] Test Google Analytics tracking
- [ ] Check Core Web Vitals in Vercel Analytics

### Mobile & Browser Testing
- [ ] Test on mobile device (iOS)
- [ ] Test on mobile device (Android)
- [ ] Test on Chrome desktop
- [ ] Test on Safari
- [ ] Test on Firefox

### WordPress Integration
- [ ] Blog posts load from WordPress API
- [ ] Featured images display correctly
- [ ] Categories and tags show up
- [ ] Post content renders properly (HTML from WordPress)
- [ ] SEO metadata from Yoast appears

## Troubleshooting

### If Build Fails:
1. Check Vercel build logs
2. Verify environment variables
3. Test WordPress API accessibility: `curl https://rs999.in/wp-json/wp/v2/posts`

### If WordPress API Errors:
1. Check SSL certificate on rs999.in
2. Verify CORS is enabled on WordPress
3. Test API endpoint manually
4. Consider using subdomain for WordPress

### If Forms Don't Work:
1. Check Perfex CRM credentials
2. Verify API endpoint is accessible
3. Check browser console for errors
4. Test form submission in dev tools

## Monitoring & Maintenance

### Set Up Monitoring
- [ ] Enable Vercel Analytics
- [ ] Set up error tracking (optional: Sentry)
- [ ] Configure uptime monitoring
- [ ] Set up email notifications for failed deployments

### Regular Tasks
- [ ] Monitor Vercel Analytics weekly
- [ ] Check WordPress API health
- [ ] Review Core Web Vitals
- [ ] Update dependencies monthly
- [ ] Review and optimize images

## Success Criteria ✨

Your deployment is successful when:
- ✅ Site loads at https://rs999.in
- ✅ All pages render correctly
- ✅ Forms submit successfully
- ✅ Lighthouse score > 90
- ✅ Mobile responsive
- ✅ SEO metadata present
- ✅ Analytics tracking works

## Quick Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub Repo**: https://github.com/giriv11/rs999static/tree/nextjs
- **Deploy Guide**: See DEPLOY_TO_VERCEL.md
- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs

---

## 🎉 Ready to Deploy?

1. Go to: https://vercel.com/new
2. Import: `giriv11/rs999static` (nextjs branch)
3. Add environment variables
4. Click Deploy!

**Estimated Time**: 10-15 minutes for complete setup
**Expected Build Time**: 2-3 minutes
**DNS Propagation**: 5-60 minutes

---

**Need Help?** All detailed instructions are in `DEPLOY_TO_VERCEL.md`
