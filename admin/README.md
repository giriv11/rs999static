# Admin Panel - Secure Setup Guide

## Overview
This folder contains the secured admin interface for managing blog posts. It uses Basic HTTP Authentication for enhanced security.

## Security Features
1. **Password Gate**: JavaScript-based password protection in `admin.html`
2. **Basic Auth**: Apache .htaccess protection (double security layer)
3. **Session Management**: Prevents repeated password prompts during session

## Setup Instructions

### Option 1: Simple Password Protection (Current)
The `admin.html` file in the root directory uses JavaScript password protection.

**Default Password**: `Rs999Admin@2025`

⚠️ **IMPORTANT**: Change this password!
- Open `/admin.html`
- Find line: `const ADMIN_PASSWORD = 'Rs999Admin@2025';`
- Replace with your secure password

### Option 2: Enhanced Security with Basic Auth (Recommended for Production)

1. **Generate .htpasswd credentials**
   
   Online method (easiest):
   - Visit: https://hostingcanada.org/htpasswd-generator/
   - Username: `admin` (or your choice)
   - Password: Create a strong password
   - Copy the generated line (e.g., `admin:$apr1$xxx...`)
   - Paste it into `admin/.htpasswd` file

2. **Move admin.html to admin folder**
   ```bash
   mv admin.html admin/index.html
   ```

3. **Update .htaccess path**
   - Edit `admin/.htaccess`
   - Update `AuthUserFile` path to match your server path
   - On My20i, use absolute path like: `/home/username/public_html/admin/.htpasswd`

4. **Access admin panel**
   - Navigate to: `https://yourdomain.com/admin/`
   - Enter Basic Auth credentials (username/password)
   - Then enter JavaScript password gate

### On My20i Hosting

My20i provides a built-in tool for password protection:

1. Log into My20i Control Panel
2. Go to: **Manage Hosting** > **Options** > **Password Protected Directories**
3. Select the `admin` directory
4. Set username and password
5. My20i will generate .htpasswd automatically

## Usage Workflow

1. **Access Admin Panel**
   - Go to `/admin.html` (or `/admin/` if using Basic Auth)
   - Enter password(s)

2. **Create New Blog Post**
   - Fill in all required fields
   - Click "Generate & Download JSON Files"
   - Two files will download:
     - `{slug}.json` - Full post data
     - `index-update-{slug}.json` - Index entry

3. **Deploy New Post**
   ```bash
   # Save downloaded files to posts/ folder
   cp ~/Downloads/{slug}.json posts/
   
   # Update posts/index.json (manually add the new entry at the top)
   # or run a merge script
   
   # Commit and push
   git add posts/
   git commit -m "Add new blog post: {title}"
   git push origin main
   
   # Deploy on My20i
   # My20i > Git > Pull Latest > Deploy HEAD Commit
   ```

## Security Best Practices

1. **Change default password** immediately
2. **Use strong passwords** (12+ characters, mixed case, numbers, symbols)
3. **Enable 2FA** on your GitHub account
4. **Keep .htpasswd** in .gitignore (already configured)
5. **Regularly update** passwords
6. **Monitor access logs** on My20i
7. **Use HTTPS** only (force in .htaccess)

## File Structure

```
admin/
├── .htaccess          # Basic Auth configuration
├── .htpasswd          # Encrypted credentials (DO NOT commit real passwords)
├── README.md          # This file
└── index.html         # Admin panel (optional, if moved from root)
```

## Troubleshooting

**Problem**: 500 Internal Server Error
- Check .htaccess `AuthUserFile` path is correct
- Ensure .htpasswd file exists and has proper permissions

**Problem**: Password not working
- Clear browser cache and cookies
- Verify password in JavaScript matches
- For Basic Auth, regenerate .htpasswd

**Problem**: Downloads not working
- Check browser popup blocker settings
- Allow downloads from your domain

## Support

For issues or questions:
- Check My20i documentation: https://www.20i.com/support
- Review Apache .htaccess guide
- Contact hosting support if needed

---

**Last Updated**: October 14, 2025
**Security Level**: Medium (JavaScript) / High (Basic Auth)
