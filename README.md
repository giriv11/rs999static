# Rs999 Web Services - Static Website

A modern, interactive static website built with **Tailwind CSS** featuring universal header and footer components, automated blog management, and **automatic deployment** to DigitalOcean App Platform.

## 🚀 Features

- ✅ **Pure Tailwind CSS** - No other CSS frameworks
- ✅ **Universal Header & Footer** - Single source of truth for all pages
- ✅ **Fully Responsive** - Mobile-first design
- ✅ **Interactive Components** - FAQ accordion, mobile menu, smooth scrolling
- ✅ **Modern Design** - Beautiful gradients, animations, and hover effects
- ✅ **SEO Friendly** - Optimized meta tags and semantic HTML
- ✅ **Fast Loading** - Minified CSS and optimized assets
- ✅ **Automated Blog Management** - Admin panel with JSON-based blog system
- ✅ **Auto-Deployment** - Push to GitHub → Live in 60 seconds via DigitalOcean

## 📁 Project Structure

```
Rs999Static/
├── index.html              # Homepage
├── pages/
│   ├── about.html         # About page
│   ├── services.html      # Services page
│   ├── portfolio.html     # Portfolio page
│   ├── blog.html          # Blog listing page
│   └── contact.html       # Contact page
├── assets/
│   ├── css/
│   │   └── output.css     # Compiled Tailwind CSS
│   └── js/
│       ├── header.js      # Universal header component
│       ├── footer.js      # Universal footer component
│       └── main.js        # Interactive features
├── src/
│   └── input.css          # Tailwind source file
├── package.json
├── tailwind.config.js
└── readme.md
```

## � Quick Deploy to DigitalOcean (Recommended)

**Deploy in 5 minutes with automatic updates!** Every time you push to GitHub, your site updates automatically.

📘 **[5-Minute Quick Start Guide](./QUICK_DEPLOY.md)** - Get started now  
📖 **[Complete Deployment Guide](./DIGITALOCEAN_DEPLOYMENT.md)** - Detailed instructions

### Why DigitalOcean App Platform?
- ✅ **Free Tier Available** - Host 3 static sites free
- ✅ **Auto-Deploy** - Push to GitHub → Live in 60 seconds
- ✅ **Custom Domains** - Free SSL certificates included
- ✅ **Zero Configuration** - Works out of the box
- ✅ **Global CDN** - Fast loading worldwide

## �🛠️ Installation & Setup (Local Development)

### 1. Install Dependencies

```bash
npm install
```

### 2. Build CSS

```bash
npm run build-css
```

### 3. Development Mode (Watch for changes)

```bash
npm run dev
```

This will watch for changes and automatically rebuild the CSS.

### 4. Run Admin Server (For Blog Management)

```bash
npm run server
```

This starts the backend server on port 3001 for automated blog management.

## 🌐 Opening the Website

### Option 1: Using VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 2: Simple HTTP Server

```bash
# Python 3
python -m http.server 8000

# Node.js (install http-server globally first)
npx http-server -p 8000
```

Then open http://localhost:8000 in your browser.

## 📄 Pages Overview

### Homepage (index.html)
- Hero section with CTA
- Statistics counter
- Package showcase
- Services overview
- Recent projects
- About section
- Client testimonials
- Blog preview
- FAQ accordion

### Services Page
- Detailed service descriptions
- Pricing packages
- Interactive service cards

### Portfolio Page
- Filterable project grid
- Project categories
- Live project links

### Blog Page
- Blog listing with sidebar
- Categories and tags
- Search functionality
- Recent posts widget

### Contact Page
- Contact form
- Location map
- Quick contact options
- Business information

### About Page
- Company overview
- Mission & vision
- Team members
- Why choose us section

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to change the primary color:

```javascript
colors: {
  primary: {
    // Change these values
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
  }
}
```

Then rebuild CSS: `npm run build-css`

### Header & Footer
Edit universal components in:
- `assets/js/header.js` - Navigation and top bar
- `assets/js/footer.js` - Footer content and links

Changes automatically apply to all pages!

## 🔧 Interactive Features

### FAQ Accordion
Automatically initialized on any page with `.faq-question` and `.faq-answer` classes.

### Mobile Menu
Toggle navigation on mobile devices - handled by header.js

### Smooth Scrolling
All anchor links scroll smoothly to sections

### Form Validation
Contact form includes built-in validation

### Portfolio Filter
Filter projects by category on portfolio page

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1023px
- **Desktop**: ≥ 1024px

## � Blog Management

### Admin Panel
Access the password-protected admin panel at `/admin.html` to manage blog posts.

- **Password**: `Rs999Admin@2025` (change in admin.html)
- Create, edit, and publish blog posts
- Automatic JSON file generation
- Auto-commit and push to GitHub

### Automated Workflow
1. Create post in admin panel
2. Click "Publish Post to GitHub"
3. Server saves JSON files
4. Auto-commits and pushes to GitHub
5. DigitalOcean auto-deploys (live in 60 seconds)

📖 **[Admin Panel Guide](./ADMIN_GUIDE.md)** - Complete usage instructions

## 🚀 Deployment

### ✨ Recommended: DigitalOcean App Platform
**Automatic deployment with zero configuration!**

- 📘 **[5-Minute Quick Start](./QUICK_DEPLOY.md)** - Get started now
- 📖 **[Complete Guide](./DIGITALOCEAN_DEPLOYMENT.md)** - Detailed setup

**What happens automatically:**
1. You push code to GitHub
2. DigitalOcean detects the push
3. Builds CSS (`npm run build-css`)
4. Deploys to global CDN
5. **Live in 60 seconds** ⚡

**Benefits:**
- ✅ Free tier for 3 static sites
- ✅ Custom domain + free SSL
- ✅ Global CDN included
- ✅ Zero maintenance

### Alternative Options

**GitHub Pages** (Manual updates)
1. Push to GitHub
2. Enable GitHub Pages in repository settings
3. Select main branch

**Netlify** (Auto-deploy alternative)
1. Connect repository
2. Build command: `npm run build-css`
3. Publish directory: `/`

## 📞 Contact Information

- **Phone**: +91 8888 589767
- **Email**: sales@jikut.com
- **Location**: Manjari BK, Pune, Maharashtra, India
- **Hours**: Mon-Sat, 10:00 AM - 06:00 PM

## 📝 License

© 2025 Rs999 Web Services - All Rights Reserved

## 🤝 Support

For support, email sales@jikut.com or call +91 8888 589767

---

**Built with ❤️ using Tailwind CSS**
