# Custom Domain Setup: www.rs999.in

## Overview
Setting up `www.rs999.in` as the primary domain for your Firebase Hosted website instead of `rs999static.web.app`.

---

## Step 1: Add Custom Domain to Firebase (CLI Method)

### Option A: Using Firebase Console (Recommended)
1. Go to [Firebase Console](https://console.firebase.google.com/project/rs999static/hosting/sites)
2. Click on your site: **rs999static**
3. Click **"Add custom domain"**
4. Enter: `www.rs999.in`
5. Click **"Continue"**
6. Firebase will provide DNS records to add

### Option B: Using Firebase CLI
```bash
cd /home/ubuntu/2025/Rs999Static
firebase hosting:sites:get rs999static
```

---

## Step 2: Get DNS Records from Firebase

After adding the custom domain, Firebase will provide DNS records. You'll typically need to add:

### A Records (for root domain rs999.in):
```
Type: A
Name: @
Value: Firebase IP addresses (provided by Firebase)
```

### CNAME Record (for www subdomain):
```
Type: CNAME
Name: www
Value: rs999static.web.app
TTL: 3600 (or Auto)
```

**Note**: Firebase will provide the exact values. These are examples.

---

## Step 3: Configure DNS at Your Domain Registrar

### Where to Configure:
- Go to your domain registrar (GoDaddy, Namecheap, Google Domains, etc.)
- Find DNS Management / DNS Settings
- Add the records provided by Firebase

### DNS Records to Add:

#### For www.rs999.in (Primary):
1. **Delete existing www record** (if any)
2. **Add new CNAME record**:
   - Type: `CNAME`
   - Host/Name: `www`
   - Points to: `rs999static.web.app`
   - TTL: `3600` (1 hour) or Auto

#### For rs999.in (Root/Apex):
1. **Check if your registrar supports ANAME/ALIAS**:
   - If YES: Create ANAME pointing to `rs999static.web.app`
   - If NO: Use A records with Firebase IPs

2. **Firebase will provide specific instructions** for your setup

---

## Step 4: Verify Domain Ownership

Firebase needs to verify you own the domain:

### Method 1: TXT Record (Recommended)
```
Type: TXT
Name: @ (or leave blank)
Value: [Firebase verification code]
```

### Method 2: File Upload
- Download verification file from Firebase
- Upload to your website root
- Verify in Firebase Console

---

## Step 5: Enable SSL Certificate

1. After DNS records propagate (wait 24-48 hours)
2. Firebase will automatically provision SSL certificate
3. Your site will be available at:
   - ✅ https://www.rs999.in
   - ✅ https://rs999.in (if configured)
   - ✅ https://rs999static.web.app (fallback)

---

## Step 6: Set www.rs999.in as Default

### Update Internal Links:
Search and replace in your code:
```bash
# Find all references to old domain
grep -r "rs999static.web.app" .

# Update canonical URLs, Open Graph tags, etc.
```

### Update Meta Tags:
```html
<!-- Update in index.html and all pages -->
<link rel="canonical" href="https://www.rs999.in/" />
<meta property="og:url" content="https://www.rs999.in/" />
```

---

## Expected DNS Configuration

### Example DNS Records:

```dns
# Root domain (rs999.in)
Type: A
Name: @
Value: 151.101.1.195
TTL: 3600

Type: A
Name: @
Value: 151.101.65.195
TTL: 3600

# WWW subdomain (www.rs999.in)
Type: CNAME
Name: www
Value: rs999static.web.app
TTL: 3600

# Domain verification (temporary)
Type: TXT
Name: @
Value: firebase=rs999static
TTL: 3600
```

**Note**: Actual IP addresses will be provided by Firebase.

---

## Timeline

| Step | Time Required |
|------|---------------|
| Add domain to Firebase | Instant |
| Configure DNS records | 5-10 minutes |
| DNS propagation | 1-24 hours (usually 2-4 hours) |
| SSL certificate provisioning | 15 minutes - 2 hours after DNS |
| Full global availability | 24-48 hours |

---

## Verification Checklist

### Before DNS Changes:
- [ ] Added custom domain in Firebase Console
- [ ] Copied DNS records provided by Firebase
- [ ] Access to domain registrar DNS settings

### During DNS Configuration:
- [ ] Added CNAME record for www
- [ ] Added A records for root (if applicable)
- [ ] Added TXT record for verification
- [ ] Saved DNS changes

### After DNS Changes:
- [ ] Wait 1-2 hours
- [ ] Check DNS propagation: https://dnschecker.org
- [ ] Verify domain in Firebase Console
- [ ] Wait for SSL certificate (green lock icon)
- [ ] Test https://www.rs999.in
- [ ] Test https://rs999.in

---

## Testing DNS Propagation

### Using dnschecker.org:
1. Go to https://dnschecker.org
2. Enter: `www.rs999.in`
3. Select: CNAME
4. Check if it resolves to `rs999static.web.app`

### Using Command Line:
```bash
# Check CNAME record
dig www.rs999.in CNAME +short
# Expected: rs999static.web.app

# Check A records for root
dig rs999.in A +short
# Expected: Firebase IP addresses

# Check from specific DNS server
nslookup www.rs999.in 8.8.8.8
```

---

## Troubleshooting

### Domain not working after 24 hours:
1. **Check DNS records**:
   ```bash
   dig www.rs999.in CNAME +short
   ```
   Should return: `rs999static.web.app`

2. **Verify in Firebase Console**:
   - Status should be "Connected"
   - SSL should be "Active"

3. **Check DNS propagation**:
   - Use https://dnschecker.org
   - Check multiple locations

### SSL Certificate not provisioning:
1. **Ensure DNS is correct**: CNAME must point to `rs999static.web.app`
2. **Wait longer**: Can take up to 24 hours
3. **Remove and re-add domain**: If stuck after 24 hours

### "Site can't be reached" error:
1. **DNS not propagated yet**: Wait longer (up to 48 hours)
2. **Wrong DNS records**: Double-check CNAME value
3. **Clear browser cache**: Try incognito mode

### Mixed content warnings:
1. **Update all HTTP links to HTTPS**
2. **Check external resources** (images, scripts)
3. **Update canonical URLs**

---

## Firebase CLI Commands

### Check current domains:
```bash
firebase hosting:sites:list
```

### Deploy to production:
```bash
firebase deploy --only hosting
```

### Check deployment status:
```bash
firebase hosting:channel:list
```

---

## Post-Setup Updates Needed

### 1. Update index.html:
```html
<!-- Change canonical URL -->
<link rel="canonical" href="https://www.rs999.in/" />

<!-- Update Open Graph -->
<meta property="og:url" content="https://www.rs999.in/" />

<!-- Update Twitter Card -->
<meta name="twitter:url" content="https://www.rs999.in/" />
```

### 2. Update all page/*.html files:
- Canonical URLs
- Navigation links
- Social media links

### 3. Update sitemap.xml (if exists):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.rs999.in/</loc>
    <lastmod>2025-10-16</lastmod>
  </url>
</urlset>
```

### 4. Update robots.txt (if exists):
```
User-agent: *
Allow: /

Sitemap: https://www.rs999.in/sitemap.xml
```

### 5. Update Google Search Console:
- Add www.rs999.in as new property
- Verify ownership
- Submit sitemap
- Set preferred domain

### 6. Update Google Analytics (if configured):
- Update default URL in property settings

---

## Security Considerations

### Force HTTPS:
Firebase automatically redirects HTTP → HTTPS

### HSTS (HTTP Strict Transport Security):
Add to firebase.json:
```json
{
  "hosting": {
    "headers": [
      {
        "source": "**",
        "headers": [
          {
            "key": "Strict-Transport-Security",
            "value": "max-age=31536000; includeSubDomains; preload"
          }
        ]
      }
    ]
  }
}
```

---

## Redirect Configuration

### Redirect rs999.in → www.rs999.in:
Firebase handles this automatically after you configure both domains.

### Redirect rs999static.web.app → www.rs999.in:
Firebase keeps the `.web.app` domain active as a fallback. You can't disable it, but you can update internal links.

---

## Summary Steps (Quick Reference)

1. **Firebase Console** → Add custom domain `www.rs999.in`
2. **Copy DNS records** provided by Firebase
3. **Domain Registrar** → Add DNS records (CNAME, A, TXT)
4. **Wait** 2-24 hours for DNS propagation
5. **Firebase** → Verify domain ownership
6. **Wait** 15min-2hrs for SSL certificate
7. **Update code** → Change canonical URLs to www.rs999.in
8. **Deploy** → `firebase deploy --only hosting`
9. **Test** → Visit https://www.rs999.in

---

## Next Steps

After DNS is configured and domain is live:

1. **Update all HTML files** with new canonical URLs
2. **Update sitemap.xml** with new domain
3. **Submit to Google Search Console**
4. **Update social media links**
5. **Update business listings** (Google My Business, etc.)
6. **Notify users** of new domain (if applicable)

---

## Support Resources

- **Firebase Hosting Docs**: https://firebase.google.com/docs/hosting/custom-domain
- **DNS Checker**: https://dnschecker.org
- **SSL Checker**: https://www.ssllabs.com/ssltest/
- **Firebase Console**: https://console.firebase.google.com/project/rs999static/hosting

---

**Status**: 📋 **AWAITING DNS CONFIGURATION**  
**Next Action**: Add custom domain in Firebase Console  
**Timeline**: 24-48 hours for full setup  
**Date**: October 16, 2025
