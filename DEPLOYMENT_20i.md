# Deployment Guide for 20i Hosting

## ✅ Site is Ready for Live Deployment on www.rs999.in

### 📁 New Folder Structure
```
/
├── index.html              # Homepage
├── page/                   # All website pages (renamed from 'pages')
│   ├── about.html
│   ├── blog.html          # Blog listing page
│   ├── contact.html
│   ├── portfolio.html
│   └── services.html
├── blog/                   # Blog posts (renamed from 'posts')
│   ├── index.json         # Blog posts index
│   └── essential-web-design-trends-2025.html
├── assets/                 # CSS, JS, images
│   ├── css/
│   ├── js/
│   └── images/
└── .htaccess              # Apache configuration
```

### 🌐 Live URLs
- **Homepage:** https://www.rs999.in/
- **About:** https://www.rs999.in/page/about.html
- **Services:** https://www.rs999.in/page/services.html
- **Portfolio:** https://www.rs999.in/page/portfolio.html
- **Blog:** https://www.rs999.in/page/blog.html
- **Contact:** https://www.rs999.in/page/contact.html
- **Blog Post:** https://www.rs999.in/blog/essential-web-design-trends-2025.html

---

## 🚀 Deployment Steps for 20i

### Option 1: Deploy from GitHub (Recommended)

1. **Log in to 20i Control Panel**
   - Go to your 20i dashboard

2. **Set up Git Deployment**
   - Navigate to your website settings
   - Find "Git Deploy" or "Deploy from Git" option
   - Connect your GitHub repository: `giriv11/rs999static`
   - Branch: `main`
   - Deploy path: `/public_html` or `/htdocs`

3. **Configure Domain**
   - Point `www.rs999.in` to your 20i hosting
   - Ensure DNS is configured correctly
   - Add both `rs999.in` and `www.rs999.in`
   - Set `www.rs999.in` as primary

4. **Enable SSL/HTTPS**
   - 20i provides free SSL certificates
   - Enable "Force HTTPS" in 20i dashboard (NOT in .htaccess)
   - The .htaccess redirect is disabled to prevent loops

### Option 2: Manual FTP/SFTP Upload

1. **Connect via FTP/SFTP**
   - Host: Your 20i FTP server
   - Username: Your 20i username
   - Password: Your 20i password

2. **Upload Files**
   - Upload ALL files from your local repo to `/public_html/` or `/htdocs/`
   - Ensure folder structure is maintained:
     ```
     /public_html/
     ├── index.html
     ├── page/
     ├── blog/
     ├── assets/
     ├── .htaccess
     └── site-config.js
     ```

3. **Set Permissions**
   - Files: 644
   - Folders: 755
   - .htaccess: 644

### Option 3: File Manager Upload

1. Log in to 20i Control Panel
2. Open File Manager
3. Navigate to `/public_html/`
4. Upload all files maintaining the folder structure
5. Extract if uploaded as ZIP

---

## 🔧 Post-Deployment Checklist

### Immediate Tests
- [ ] Homepage loads: https://www.rs999.in/
- [ ] All pages load correctly
- [ ] Blog listing works: https://www.rs999.in/page/blog.html
- [ ] Blog post loads: https://www.rs999.in/blog/essential-web-design-trends-2025.html
- [ ] Navigation menu works
- [ ] Contact form works (if you have backend)
- [ ] Mobile responsive design works
- [ ] Images load properly

### SEO Verification
- [ ] View page source - all meta tags are visible
- [ ] Canonical URLs point to www.rs999.in
- [ ] Open Graph tags are correct
- [ ] Schema.org structured data is present
- [ ] Test with Google Rich Results Test
- [ ] Submit sitemap to Google Search Console

### Performance
- [ ] Test page load speed (aim for < 3 seconds)
- [ ] Check Lighthouse score (aim for 90+)
- [ ] Verify CSS/JS files are minified
- [ ] Images are optimized
- [ ] HTTPS is working
- [ ] GZIP compression is enabled (check .htaccess)

### Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

---

## 🔒 Security Settings in .htaccess

Your `.htaccess` file includes:
- ✅ PHP execution blocked (security)
- ✅ GZIP compression enabled
- ✅ Static asset caching (1 hour)
- ✅ Directory browsing disabled
- ✅ Sensitive files blocked
- ⚠️ HTTPS redirect disabled (handled by 20i)

**Note:** Enable "Force HTTPS" in 20i dashboard, NOT in .htaccess!

---

## 📊 Analytics & Monitoring

### Recommended Tools
1. **Google Analytics** - Track visitors
2. **Google Search Console** - Monitor SEO
3. **Google Tag Manager** - Manage tracking codes
4. **Cloudflare** (optional) - CDN and DDoS protection

### Add to site-config.js
```javascript
analytics: {
  googleAnalyticsId: "G-XXXXXXXXXX",
  googleTagManagerId: "GTM-XXXXXXX"
}
```

---

## 🆘 Troubleshooting

### Issue: 404 Errors
- **Check:** File paths are case-sensitive on Linux servers
- **Fix:** Ensure all links use lowercase (page/, blog/)

### Issue: Redirect Loops
- **Check:** .htaccess HTTPS redirect is disabled
- **Fix:** Use 20i dashboard to force HTTPS instead

### Issue: Blog Posts Not Loading
- **Check:** `blog/index.json` file exists and is valid JSON
- **Fix:** Validate JSON syntax online

### Issue: Images Not Loading
- **Check:** Image paths in HTML/CSS
- **Fix:** Use relative paths or update site-config.js

### Issue: Slow Loading
- **Check:** CSS is minified (output.css)
- **Fix:** Run `npm run build-css` before deploying

---

## 🗑️ Drop DigitalOcean

Once 20i deployment is confirmed working:

1. **Test everything on www.rs999.in first**
2. **Update DNS to point to 20i only**
3. **Wait 48 hours for DNS propagation**
4. **Delete DigitalOcean app:**
   - Go to DigitalOcean dashboard
   - Apps → rs999-static-app
   - Settings → Destroy App
5. **Cancel DigitalOcean subscription**

---

## 📝 Important Notes

- **Domain:** All URLs updated to www.rs999.in
- **Folder Names:** pages → page, posts → blog
- **Hosting:** Moving from DigitalOcean to 20i
- **SSL:** Handled by 20i (free Let's Encrypt)
- **Deployment:** Can use Git deploy or manual FTP

---

## 🎯 Next Steps for Content

### Add More Blog Posts
1. Copy `blog/essential-web-design-trends-2025.html`
2. Rename and edit content
3. Add entry to `blog/index.json`
4. Push to GitHub or upload via FTP

### Update Contact Info
Edit `site-config.js`:
```javascript
contact: {
  phone: "+91 YOUR_NUMBER",
  email: "your@email.com",
  address: "Your Address"
}
```

---

## 🚀 Your Site is Ready to Go Live!

All files are updated, paths are correct, and the site is optimized for SEO.
Just deploy to 20i and you're live on www.rs999.in! 🎉
