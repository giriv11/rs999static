# Rs999 Web Services - Next.js + WordPress Headless

🚀 **Modern web stack with 3-5x faster performance and perfect SEO**

## 📋 Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend**: WordPress (Headless CMS)
- **Hosting**: Vercel (Frontend) + 20i UK (WordPress)
- **CRM**: Perfex CRM Integration

## 🎯 Performance Goals

- Page Load: 0.4-0.7s (vs 2.5s current)
- Lighthouse Score: 95-100 (vs 65-75 current)
- SEO: Full HTML in source (vs JavaScript-injected)

## 📁 Project Structure

```
rs999-nextjs/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx             # Homepage
│   ├── about-us/
│   │   └── page.tsx         # About page
│   ├── services/
│   │   ├── page.tsx         # Services listing
│   │   └── [slug]/
│   │       └── page.tsx     # Individual service page
│   ├── blog/
│   │   ├── page.tsx         # Blog listing
│   │   └── [slug]/
│   │       └── page.tsx     # Blog post page
│   ├── contact/
│   │   └── page.tsx         # Contact page
│   └── api/
│       └── perfex/
│           └── route.ts     # Perfex CRM API route
├── components/
│   ├── Header.tsx           # Site header navigation
│   ├── Footer.tsx           # Site footer
│   ├── QuoteForm.tsx        # Quote form component
│   ├── QuoteFormPopup.tsx   # Popup quote form
│   └── ui/                  # Reusable UI components
├── lib/
│   ├── wordpress.ts         # WordPress API functions
│   ├── types.ts             # TypeScript types
│   └── utils.ts             # Utility functions
├── public/
│   ├── fonts/               # Local fonts (Poppins)
│   └── images/              # Static images
└── styles/
    └── globals.css          # Global styles + Tailwind

```

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create `.env.local`:

```env
# WordPress API
WORDPRESS_API_URL=https://rs999.in/wp-json
NEXT_PUBLIC_WORDPRESS_API_URL=https://rs999.in/wp-json

# Perfex CRM
PERFEX_API_KEY=your_api_key_here
PERFEX_API_URL=https://your-perfex-url.com/api

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://rs999.in
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Build for Production

```bash
npm run build
npm start
```

## 🌐 WordPress Setup Requirements

### Required Plugins:

1. **Yoast SEO** or **RankMath**
   - Automatic SEO metadata in API responses
   - Schema markup included

2. **Advanced Custom Fields (ACF)**
   - Custom fields for flexible page layouts
   - Exposed via REST API

3. **WP REST API Extensions** (optional)
   - Better API responses
   - Featured images in API

### WordPress Configuration:

```
Settings → Permalinks: Post name
Settings → Reading: Uncheck "Discourage search engines"
Verify REST API: https://rs999.in/wp-json/wp/v2/posts
```

## 📝 Key Features

### ✅ WordPress Integration
- Fetches pages, posts, custom post types via REST API
- Yoast SEO metadata automatically included
- ACF custom fields accessible
- Media library images optimized by Next.js

### ✅ SEO Optimized
- Server-side rendering (SSR)
- Full HTML in source code
- Automatic meta tags from Yoast
- Schema markup included
- Open Graph + Twitter Cards

### ✅ Performance
- Global CDN (Vercel Edge Network)
- Image optimization (WebP, lazy load)
- Code splitting
- ISR (Incremental Static Regeneration)

### ✅ Forms
- Quote form with Perfex CRM integration
- Contact forms
- Lead management

## 🚀 Deployment

### Deploy to Vercel (Recommended):

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
# Configure custom domain: rs999.in
```

### Automatic Deployments:
- Push to `main` branch → Auto-deploy to production
- Pull requests → Preview deployments

## 📊 WordPress API Usage

### Fetch Pages:
```typescript
const res = await fetch(`${process.env.WORDPRESS_API_URL}/wp/v2/pages?slug=about-us`);
const pages = await res.json();
const page = pages[0];
```

### Fetch Posts:
```typescript
const res = await fetch(`${process.env.WORDPRESS_API_URL}/wp/v2/posts`);
const posts = await res.json();
```

### Fetch Custom Post Types:
```typescript
const res = await fetch(`${process.env.WORDPRESS_API_URL}/wp/v2/services`);
const services = await res.json();
```

## 🎨 Design System

### Colors:
- **Primary**: Green (#059669) - CTAs, highlights
- **Secondary**: Blue (#2563eb) - Accents, links

### Fonts:
- **Display**: Poppins (headings)
- **Body**: Inter (content)

### Components:
- All components maintain exact Tailwind design from current site
- Responsive breakpoints: sm, md, lg, xl, 2xl

## 📚 Documentation

- Full WordPress Headless Guide: `/WORDPRESS_HEADLESS_GUIDE.md`
- Original static site backup: `/home/ubuntu/2025/Rs999Static_backup_*.tar.gz`

## 🐛 Troubleshooting

### WordPress API not working:
```bash
# Test API endpoint
curl https://rs999.in/wp-json/wp/v2/posts

# Should return JSON, not 404
```

### Images not loading:
- Check WordPress media library URLs
- Verify Next.js Image component configuration

### Build errors:
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

## 📞 Support

- Next.js Docs: https://nextjs.org/docs
- WordPress REST API: https://developer.wordpress.org/rest-api/
- Vercel Docs: https://vercel.com/docs

---

**Last Updated**: October 16, 2025
**Version**: 1.0.0
**Status**: In Development
