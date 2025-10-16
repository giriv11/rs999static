# Perfex CRM Integration - Quick Configuration

## ⚡ Immediate Action Required

### 1. Get Your API Key

Go to: **https://www.jikut.com/core/admin/profile**

Navigate to: **API** tab

Copy your API key (example format: `abc123def456ghi789jkl012mno345pqr678`)

### 2. Update Configuration

Edit: `/assets/js/perfex-crm.js`

Find line 6 and replace:
```javascript
apiKey: 'YOUR_PERFEX_API_KEY_HERE',  // ← Change this!
```

With:
```javascript
apiKey: 'abc123def456ghi789jkl012mno345pqr678',  // ← Your actual key
```

### 3. Optional: Update IDs

You may need to update these IDs based on your Perfex CRM setup:

```javascript
source: 1,    // Lead source ID (1 = Website)
status: 1,    // Lead status ID (1 = New)
assigned: 1,  // Your staff/user ID
```

To find the correct IDs, use these curl commands:

**Get Lead Sources:**
```bash
curl -X GET "https://www.jikut.com/core/api/lead_sources" \
  -H "authtoken: YOUR_API_KEY"
```

**Get Lead Statuses:**
```bash
curl -X GET "https://www.jikut.com/core/api/lead_statuses" \
  -H "authtoken: YOUR_API_KEY"
```

### 4. Enable CORS (Important!)

In Perfex CRM:
1. Go to: **Setup → Settings → API**
2. Enable "Allow CORS"
3. Add allowed origins:
   ```
   https://rs999static.web.app
   https://www.rs999.in
   ```
4. Save

### 5. Test

1. Go to: https://rs999static.web.app/page/contact
2. Fill and submit the form
3. Check Perfex CRM → Leads for new entry

### 6. Deploy After Configuration

After updating the API key:
```bash
cd /home/ubuntu/2025/Rs999Static
firebase deploy --only hosting
```

---

## 📋 Form Submission Flow

```
User fills form
    ↓
JavaScript validates input
    ↓
Sends data to Perfex CRM API
    ↓
Creates new lead in CRM
    ↓
Shows success message to user
    ↓
You receive lead in Perfex CRM
```

---

## ✅ What's Configured

- ✅ Perfex CRM JavaScript integration created
- ✅ Contact form connected
- ✅ Hero quote form connected
- ✅ Form validation added
- ✅ Error handling implemented
- ✅ Success notifications configured
- ✅ Google Analytics tracking added
- ⏳ **Awaiting:** API key configuration

---

## 📁 Files Modified

1. **NEW:** `/assets/js/perfex-crm.js` - CRM integration code
2. **NEW:** `/PERFEX_CRM_SETUP.md` - Full documentation
3. **NEW:** `/PERFEX_CRM_QUICKSTART.md` - This file
4. **UPDATED:** `/page/contact.html` - Added script tag
5. **UPDATED:** `/index.html` - Added script tag

---

## 🔍 Troubleshooting

### Form not submitting to CRM?

1. Check browser console (F12) for errors
2. Verify API key is correct in `/assets/js/perfex-crm.js`
3. Ensure CORS is enabled in Perfex CRM
4. Test API manually with curl

### CORS Error?

Add your domain to Perfex:
- Setup → Settings → API → CORS Allowed Origins

### Lead not appearing?

1. Check if API endpoint is enabled in Perfex
2. Verify lead source and status IDs are correct
3. Check Perfex logs for errors

---

## 📞 Support

- **Full Docs:** See `PERFEX_CRM_SETUP.md`
- **Perfex API:** https://perfexcrm.themesic.com/apiguide/index.html
- **Test API:** Use curl or Postman

---

**Next Step:** Add your API key to `/assets/js/perfex-crm.js` and redeploy! 🚀
