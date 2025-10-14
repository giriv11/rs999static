# Admin Panel Fixes - October 14, 2025

## Issues Fixed

### 1. ✅ Autocomplete Attributes Missing
**Problem:** Browser console showed warnings about missing autocomplete attributes on password inputs.

**Fix:** Added appropriate autocomplete attributes:
- Login password: `autocomplete="current-password"`
- Current password (profile): `autocomplete="current-password"`
- New password: `autocomplete="new-password"`
- Confirm password: `autocomplete="new-password"`

**Files Changed:** `admin-new.html`

---

### 2. ✅ showTab Function Error
**Problem:** `Uncaught TypeError: Cannot read properties of undefined (reading 'target')`

**Root Cause:** The `showTab()` function was trying to access `event.target` but the `event` object wasn't defined when called programmatically (e.g., from `editPost()`).

**Fix:** Changed the function to find the active button by matching the `onclick` attribute instead of relying on the event object:
```javascript
const activeBtn = Array.from(document.querySelectorAll('.tab-btn')).find(
  btn => btn.getAttribute('onclick') === `showTab('${tabName}')`
);
```

**Files Changed:** `assets/js/admin-enhanced.js`

---

### 3. ✅ Image Upload 413 Error
**Problem:** `POST https://rs999-static-app-vc4qz.ondigitalocean.app/api/upload-image 413 (Content Too Large)`

**Root Cause:** The GitHub API has a limit on file size (around 1MB for base64 encoded content). The previous 5MB limit was too large.

**Fix:** 
- Reduced file size limit from 5MB to 1MB
- Added clearer error message: "Image size must be less than 1MB. Please compress or resize your image, or use an external image URL."
- Added `e.target.value = ''` to clear the file input after showing error

**Files Changed:** `assets/js/admin-enhanced.js`

**Workaround for Users:** If you have images larger than 1MB:
1. Use an external image hosting service (Imgur, Cloudinary, etc.)
2. Compress your images using tools like TinyPNG or ImageOptim
3. Paste the image URL directly in the "Image URL" field

---

## Deployment

**Commit:** `3d2afe6`  
**Status:** ✅ Live on production  
**URL:** https://rs999-static-app-vc4qz.ondigitalocean.app/admin-new.html

---

## Testing Checklist

- [x] Login form - no more autocomplete warnings
- [x] Profile password change - no more autocomplete warnings
- [x] Tab switching works when clicking sidebar buttons
- [x] Tab switching works when called from `editPost()` function
- [x] Image upload validates file size before attempting upload
- [x] Clear error message when file is too large
- [x] File input clears after size error

---

## Notes

- All console warnings have been resolved
- The admin panel should now work smoothly without JavaScript errors
- Image uploads are limited to 1MB due to GitHub API constraints
- For larger images, users should use external hosting or compress images first
