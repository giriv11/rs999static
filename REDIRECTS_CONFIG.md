# URL Redirects Configuration

**Last Updated**: October 16, 2025  
**Status**: ✅ Active

---

## Current Redirects:

### 1. About Us Page
```
Source: /about-us or /about-us/
Destination: /page/about
Type: 301 (Permanent)
Status: ✅ Active
```

**Test:**
- https://rs999static.web.app/about-us → redirects to → /page/about ✅
- https://www.rs999.in/about-us → will redirect to → /page/about ✅

---

## How Redirects Work:

### Firebase Configuration:
```json
{
  "hosting": {
    "redirects": [
      {
        "source": "/about-us",
        "destination": "/page/about",
        "type": 301
      },
      {
        "source": "/about-us/",
        "destination": "/page/about",
        "type": 301
      }
    ]
  }
}
```

### Redirect Types:

| Code | Type | Use Case |
|------|------|----------|
| 301 | Permanent | SEO value transfers, page moved permanently |
| 302 | Temporary | Short-term redirect, SEO value stays at original URL |

---

## Common Use Cases:

### 1. Old URL to New URL
```json
{
  "source": "/old-page",
  "destination": "/new-page",
  "type": 301
}
```

### 2. Multiple Old URLs to One New URL
```json
{
  "source": "/contact-us",
  "destination": "/page/contact",
  "type": 301
},
{
  "source": "/contact-form",
  "destination": "/page/contact",
  "type": 301
}
```

### 3. Redirect to External URL
```json
{
  "source": "/facebook",
  "destination": "https://www.facebook.com/rs999india/",
  "type": 302
}
```

### 4. Pattern Matching with Wildcards
```json
{
  "source": "/old-blog/**",
  "destination": "/blog/:splat",
  "type": 301
}
```

---

## Adding More Redirects:

### Step 1: Edit firebase.json
Add to the `"redirects"` array:

```json
"redirects": [
  {
    "source": "/about-us",
    "destination": "/page/about",
    "type": 301
  },
  {
    "source": "/about-us/",
    "destination": "/page/about",
    "type": 301
  },
  // Add new redirect here:
  {
    "source": "/your-old-url",
    "destination": "/your-new-url",
    "type": 301
  }
],
```

### Step 2: Deploy
```bash
firebase deploy --only hosting
```

### Step 3: Test
```bash
curl -I https://rs999static.web.app/your-old-url
# Should show: HTTP/2 301 and location: /your-new-url
```

---

## Best Practices:

### ✅ DO:
- Use 301 for permanent page moves (preserves SEO)
- Handle both with and without trailing slashes
- Test redirects before announcing changes
- Document all redirects
- Keep redirect chains short (A→B, not A→B→C)

### ❌ DON'T:
- Create redirect loops (A→B→A)
- Use 302 for permanent moves (loses SEO value)
- Redirect to non-existent pages
- Create long redirect chains
- Forget to deploy after adding redirects

---

## SEO Impact:

### 301 Permanent Redirect:
- ✅ Passes ~90-99% of link equity (PageRank)
- ✅ Tells search engines page moved permanently
- ✅ Search engines update their index
- ✅ Users automatically sent to new URL

### 302 Temporary Redirect:
- ⚠️ Passes less link equity
- ⚠️ Search engines keep indexing old URL
- ⚠️ Use only for temporary situations

---

## Testing Redirects:

### Command Line:
```bash
# Test redirect
curl -I https://rs999static.web.app/about-us

# Expected output:
# HTTP/2 301 
# location: /page/about
```

### Browser:
1. Open: https://rs999static.web.app/about-us
2. Browser automatically redirects to /page/about
3. Check URL bar shows final destination

### Tools:
- **Redirect Checker**: https://httpstatus.io
- **Google Search Console**: Check "Coverage" for redirect status

---

## Common Redirects to Consider:

### Old WordPress URLs:
```json
{
  "source": "/about-us",
  "destination": "/page/about",
  "type": 301
},
{
  "source": "/contact-us",
  "destination": "/page/contact",
  "type": 301
},
{
  "source": "/services",
  "destination": "/page/services",
  "type": 301
}
```

### Social Media Shortcuts:
```json
{
  "source": "/fb",
  "destination": "https://www.facebook.com/rs999india/",
  "type": 302
},
{
  "source": "/twitter",
  "destination": "https://twitter.com/Rs999india",
  "type": 302
}
```

### Legacy Blog URLs:
```json
{
  "source": "/blog/:year/:month/:slug",
  "destination": "/blog/:slug",
  "type": 301
}
```

---

## Current Firebase Configuration:

### Complete firebase.json:
```json
{
  "hosting": {
    "public": ".",
    "ignore": [...],
    "redirects": [
      {
        "source": "/about-us",
        "destination": "/page/about",
        "type": 301
      },
      {
        "source": "/about-us/",
        "destination": "/page/about",
        "type": 301
      }
    ],
    "headers": [...],
    "cleanUrls": true,
    "trailingSlash": false
  }
}
```

---

## Monitoring Redirects:

### Google Search Console:
1. Go to: https://search.google.com/search-console
2. Coverage → Excluded
3. Look for "Redirect" status
4. Verify redirects are working

### Analytics:
- Monitor traffic to old URLs (should drop to zero)
- Monitor traffic to new URLs (should increase)
- Check bounce rate on new pages

---

## Troubleshooting:

### Redirect Not Working:
1. Check firebase.json syntax (valid JSON)
2. Verify deployment completed successfully
3. Clear browser cache (Ctrl+F5)
4. Test in incognito mode
5. Check CDN cache (may take 1-5 minutes)

### Wrong Destination:
1. Check destination URL spelling
2. Verify destination page exists
3. Test destination URL works independently

### Redirect Loop:
1. Check for circular redirects (A→B→A)
2. Check cleanUrls + redirects interaction
3. Review all redirect rules

---

## Examples by Scenario:

### Scenario 1: Migrating from WordPress
Old WordPress structure → New Firebase structure
```json
{
  "source": "/about",
  "destination": "/page/about",
  "type": 301
},
{
  "source": "/contact",
  "destination": "/page/contact",
  "type": 301
}
```

### Scenario 2: Rebranding URLs
Old brand name → New brand name
```json
{
  "source": "/old-brand/**",
  "destination": "/new-brand/:splat",
  "type": 301
}
```

### Scenario 3: Consolidating Pages
Multiple pages → One page
```json
{
  "source": "/web-design",
  "destination": "/page/services",
  "type": 301
},
{
  "source": "/web-development",
  "destination": "/page/services",
  "type": 301
}
```

---

## Wildcard Patterns:

### Basic Wildcard:
```json
{
  "source": "/old/**",
  "destination": "/new/:splat",
  "type": 301
}
```
Result: `/old/any/path` → `/new/any/path`

### Capture Groups:
```json
{
  "source": "/products/:category/:product",
  "destination": "/shop/:category/:product",
  "type": 301
}
```
Result: `/products/shoes/sneakers` → `/shop/shoes/sneakers`

---

## Performance Impact:

### Redirects are Fast:
- ⚡ Processed at CDN edge (Varnish)
- ⚡ No server processing needed
- ⚡ Cached by browsers
- ⚡ Minimal latency (<50ms)

### Best Practices:
- Keep redirect rules under 100
- Avoid complex regex patterns
- Use simple string matching when possible

---

## Documentation:

**Firebase Hosting Redirects**: https://firebase.google.com/docs/hosting/full-config#redirects

---

## Summary:

✅ **Redirect Active**: /about-us → /page/about (301)  
✅ **Deployed**: 716 files with redirect configuration  
✅ **Works On**: Both rs999static.web.app and www.rs999.in  
✅ **SEO**: 301 permanent redirect preserves search ranking  
✅ **Tested**: Both /about-us and /about-us/ redirect correctly  

**Add more redirects by editing firebase.json and deploying!**

---

**Last Deploy**: October 16, 2025 08:01 UTC  
**Commit**: 494e562  
**Files**: 716 deployed
