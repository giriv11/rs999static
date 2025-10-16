# Perfex CRM Integration Setup Guide

**Date**: October 16, 2025  
**CRM URL**: https://www.jikut.com/core  
**Integration Type**: Lead Creation via API  
**Status**: ✅ Ready for Configuration

---

## 📋 Overview

This integration connects your Rs999 Static website forms to Perfex CRM, automatically creating leads when users submit:
1. **Hero Quote Form** (Homepage)
2. **Contact Form** (Contact page)

---

## 🔑 Step 1: Get Your Perfex CRM API Key

### In Perfex CRM Admin Panel:

1. **Login to Perfex CRM**:
   - URL: https://www.jikut.com/core/admin
   - Login with your admin credentials

2. **Navigate to API Settings**:
   ```
   Setup (⚙️) → Settings → API
   ```

3. **Enable API** (if not already enabled):
   - Check "Enable API"
   - Save settings

4. **Get/Create API Key**:
   ```
   Setup → Staff → Click on your name → API
   ```
   - Or go to: https://www.jikut.com/core/admin/profile
   - Find "API" tab
   - Copy your API key (looks like: `abc123def456ghi789jkl012mno345pqr678`)

5. **Enable Required API Endpoints**:
   Make sure these endpoints are enabled:
   - ✅ POST /api/leads (Create lead)
   - ✅ GET /api/lead_sources (Get sources)
   - ✅ GET /api/lead_statuses (Get statuses)

---

## ⚙️ Step 2: Configure the Integration

### Edit the API Configuration File:

Open `/assets/js/perfex-crm.js` and update the configuration:

```javascript
const PERFEX_CONFIG = {
  baseUrl: 'https://www.jikut.com/core/api',
  apiKey: 'YOUR_ACTUAL_API_KEY_HERE', // ← Replace this!
  source: 1, // Lead source ID (1 = Website)
  status: 1, // Lead status ID (1 = New/Not Contacted)
  assigned: 1, // Staff ID to assign leads to (your user ID)
  defaultCountry: 'IN'
};
```

### Find Correct IDs:

#### Get Lead Source ID:
```bash
curl -X GET "https://www.jikut.com/core/api/lead_sources" \
  -H "authtoken: YOUR_API_KEY"
```
Response example:
```json
[
  {"id": "1", "name": "Website"},
  {"id": "2", "name": "Facebook"},
  {"id": "3", "name": "Google"}
]
```
Use the ID for "Website" (usually 1)

#### Get Lead Status ID:
```bash
curl -X GET "https://www.jikut.com/core/api/lead_statuses" \
  -H "authtoken: YOUR_API_KEY"
```
Response example:
```json
[
  {"id": "1", "name": "New", "color": "#28a745"},
  {"id": "2", "name": "Contacted", "color": "#ffc107"},
  {"id": "3", "name": "Qualified", "color": "#17a2b8"}
]
```
Use the ID for "New" or "Not Contacted" (usually 1)

#### Get Staff ID:
```bash
curl -X GET "https://www.jikut.com/core/api/staff" \
  -H "authtoken: YOUR_API_KEY"
```
Use your staff member ID (usually 1 for admin)

---

## 🔄 Step 3: Update HTML Files

### Add Script to Contact Page:

Edit `/page/contact.html` - add before closing `</body>` tag:

```html
<!-- Perfex CRM Integration -->
<script src="../assets/js/perfex-crm.js"></script>
```

### Add Script to Homepage:

Edit `/index.html` - add before closing `</body>` tag:

```html
<!-- Perfex CRM Integration -->
<script src="assets/js/perfex-crm.js"></script>
```

---

## 📝 Step 4: Form Field Mapping

### Contact Form Fields → Perfex CRM:

| Form Field | CRM Field | Required |
|------------|-----------|----------|
| name | name | ✅ Yes |
| email | email | ✅ Yes |
| mobile | phonenumber | No |
| city | city | No |
| message | description | ✅ Yes |

### Hero Quote Form Fields → Perfex CRM:

| Form Field | CRM Field | Required |
|------------|-----------|----------|
| name | name | ✅ Yes |
| email | email | ✅ Yes |
| mobile | phonenumber | No |
| service | title/description | No |
| requirement | description | No |

---

## 🧪 Step 5: Test the Integration

### Test 1: Check API Connection

Open browser console (F12) and run:

```javascript
// Test API connection
fetch('https://www.jikut.com/core/api/lead_sources', {
  headers: { 'authtoken': 'YOUR_API_KEY' }
})
.then(r => r.json())
.then(d => console.log('✅ API Connected:', d))
.catch(e => console.error('❌ API Error:', e));
```

### Test 2: Submit Test Form

1. Go to: https://rs999static.web.app/page/contact
2. Fill in the contact form:
   - Name: Test User
   - Email: test@example.com
   - Mobile: 9876543210
   - City: Test City
   - Message: This is a test submission
3. Click "Submit"
4. Check browser console for logs
5. Check Perfex CRM for new lead

### Test 3: Verify Lead in CRM

1. Login to Perfex CRM
2. Go to: **Leads** module
3. Look for recent lead with:
   - Name: Test User
   - Email: test@example.com
   - Source: Website
   - Status: New

---

## 🔍 Troubleshooting

### Issue 1: "Failed to create lead in CRM"

**Cause**: Invalid API key or API disabled

**Solution**:
1. Verify API key is correct
2. Check API is enabled in Setup → Settings → API
3. Check API endpoints are allowed
4. Verify CORS is enabled for your domain

### Issue 2: "CORS error" in console

**Cause**: Perfex CRM blocking cross-origin requests

**Solution** (in Perfex CRM):
1. Go to: `Setup → Settings → API`
2. Add your domain to allowed origins:
   ```
   https://rs999static.web.app
   https://www.rs999.in
   ```
3. Save settings

### Issue 3: Lead created but fields empty

**Cause**: Field mapping mismatch

**Solution**:
1. Check Perfex CRM custom fields
2. Update `perfex-crm.js` field mappings
3. Verify form field `name` attributes match

### Issue 4: "authtoken" header not working

**Cause**: Perfex version difference

**Solution** - Try alternative header:
```javascript
headers: {
  'Authorization': 'Bearer YOUR_API_KEY'
}
```

---

## 📊 What Gets Created in Perfex CRM

### Lead Details:

```
Lead Information:
├── Name: [User's name]
├── Title: "Contact Form Submission" or "Quick Quote Request"
├── Email: [User's email]
├── Phone: [User's mobile]
├── City: [User's city]
├── Country: India
├── Source: Website
├── Status: New
├── Assigned To: [Staff member]
└── Description:
    Contact Form Submission
    
    Name: John Doe
    Email: john@example.com
    Mobile: 9876543210
    City: Mumbai
    Message: I need a website for my business
    
    Submitted from: https://rs999static.web.app/page/contact
    Date: 16/10/2025, 1:30:00 PM
```

---

## 🎯 Advanced Configuration

### Add Custom Fields:

If you have custom fields in Perfex CRM, add them in `perfex-crm.js`:

```javascript
custom_fields: {
  leads: {
    1: formData.budget, // Custom field ID 1 = Budget
    2: formData.timeline, // Custom field ID 2 = Timeline
    3: formData.company // Custom field ID 3 = Company
  }
}
```

### Add Tags:

```javascript
tags: 'website-inquiry,high-priority,quick-response'
```

### Change Lead Source:

Create new source in Perfex:
1. Setup → Leads → Sources
2. Add "Website - Quick Quote"
3. Get ID and update in config

### Email Notifications:

Enable in Perfex CRM:
1. Setup → Settings → Email
2. Enable "Lead Created" notification
3. Configure recipient staff members

---

## 📱 User Experience

### Before Submission:
```
[Contact Form]
Name: _______
Email: _______
Mobile: _______
Message: _______
[Submit Button]
```

### During Submission:
```
[Contact Form - Disabled]
Name: John Doe
Email: john@example.com
Mobile: 9876543210
Message: Need website
[🔄 Submitting...]
```

### After Success:
```
✅ Thank you! Your inquiry has been submitted
   successfully. We will contact you soon.

[Empty Form - Ready for next submission]
```

### After Error:
```
❌ Sorry, there was an error submitting your
   request. Please try WhatsApp or call us directly.
```

---

## 🔐 Security Best Practices

### 1. Protect API Key:
```javascript
// ❌ DON'T: Commit API key to public repo
apiKey: 'abc123def456...'

// ✅ DO: Use environment variables or server-side proxy
apiKey: process.env.PERFEX_API_KEY
```

### 2. Rate Limiting:
Add rate limiting to prevent spam:
```javascript
const RATE_LIMIT = {
  maxSubmissions: 5,
  timeWindow: 3600000 // 1 hour
};
```

### 3. Input Validation:
Already implemented in `perfex-crm.js`:
- Email format validation
- Phone number validation
- Name length validation
- Message length validation

### 4. HTTPS Only:
- Always use HTTPS for API calls
- Already configured: `https://www.jikut.com/core/api`

---

## 📈 Analytics & Tracking

### Google Analytics Events:

Already integrated in `perfex-crm.js`:

```javascript
gtag('event', 'form_submission', {
  event_category: 'Contact',
  event_label: 'Contact Form',
  value: 1
});
```

### Track in Google Analytics:
1. Go to: Conversions → Events
2. Look for `form_submission` events
3. Category: Contact or Lead
4. Label: Contact Form or Hero Quote Form

---

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] API key configured in `perfex-crm.js`
- [ ] Lead source ID set correctly
- [ ] Lead status ID set correctly
- [ ] Staff assignment ID set
- [ ] Script added to `contact.html`
- [ ] Script added to `index.html`
- [ ] CORS configured in Perfex CRM
- [ ] Test form submission successful
- [ ] Lead appears in Perfex CRM
- [ ] Email notifications working
- [ ] Google Analytics tracking verified
- [ ] Error handling tested
- [ ] Mobile testing completed

---

## 📞 API Endpoints Used

### POST /api/leads
Creates a new lead in Perfex CRM

**Request**:
```bash
curl -X POST "https://www.jikut.com/core/api/leads" \
  -H "Content-Type: application/json" \
  -H "authtoken: YOUR_API_KEY" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phonenumber": "9876543210",
    "city": "Mumbai",
    "description": "Need website",
    "source": 1,
    "status": 1,
    "assigned": 1
  }'
```

**Response**:
```json
{
  "id": "123",
  "name": "John Doe",
  "email": "john@example.com",
  "status": "success"
}
```

### GET /api/lead_sources
Get all lead sources

### GET /api/lead_statuses
Get all lead statuses

### GET /api/staff
Get all staff members

---

## 📄 File Structure

```
Rs999Static/
├── assets/
│   └── js/
│       ├── perfex-crm.js ← NEW: CRM integration
│       ├── main.js (existing)
│       ├── header.js (existing)
│       └── footer.js (existing)
├── page/
│   └── contact.html ← UPDATE: Add script tag
├── index.html ← UPDATE: Add script tag
└── PERFEX_CRM_SETUP.md ← This file
```

---

## ✅ Quick Start (TL;DR)

1. **Get API Key** from Perfex CRM (Setup → Profile → API)
2. **Edit** `/assets/js/perfex-crm.js`:
   ```javascript
   apiKey: 'YOUR_ACTUAL_API_KEY_HERE'
   ```
3. **Add to contact.html** (before `</body>`):
   ```html
   <script src="../assets/js/perfex-crm.js"></script>
   ```
4. **Add to index.html** (before `</body>`):
   ```html
   <script src="assets/js/perfex-crm.js"></script>
   ```
5. **Deploy**: `firebase deploy --only hosting`
6. **Test**: Submit a form and check Perfex CRM for new lead

---

## 🆘 Support

### Perfex CRM Documentation:
- API Guide: https://perfexcrm.themesic.com/apiguide/index.html
- Main Docs: https://docs.perfexcrm.com

### Need Help?
- Check browser console for error messages
- Verify API key is active in Perfex
- Ensure CORS is configured
- Test API endpoints with curl/Postman

---

**Status**: 🟡 **AWAITING API KEY CONFIGURATION**  
**Next Step**: Add your Perfex CRM API key to `perfex-crm.js`  
**Date**: October 16, 2025
