# 🚀 Getting Started with Rs999 Next.js Project

## ✅ What's Been Set Up

### 1. Project Created
- ✅ Next.js 14 with App Router
- ✅ TypeScript configured
- ✅ Tailwind CSS with your exact color scheme
- ✅ ESLint for code quality
- ✅ Git repository initialized

### 2. Configuration Files
- ✅ `tailwind.config.ts` - Your custom colors (primary green, secondary blue)
- ✅ `.env.example` - Environment variables template
- ✅ `PROJECT_README.md` - Complete project documentation
- ✅ Todo list created with 10 tasks

### 3. Backup Created
- ✅ Original static site backed up: `Rs999Static_backup_20251016_*.tar.gz` (7.6MB)

## 📋 Next Steps

### Immediate (Today):
1. **Create WordPress API utilities** (`lib/wordpress.ts`)
2. **Build components** (Header, Footer, QuoteForm)
3. **Create homepage** with WordPress integration
4. **Set up dynamic routes** for blog/pages

### This Week:
5. **Deploy to Vercel** (15 minutes)
6. **Configure custom domain** (rs999.in)
7. **Test WordPress API integration**
8. **Optimize performance** (Lighthouse 95+)

## 🔧 Development Workflow

### Start Development:
```bash
cd /home/ubuntu/2025/rs999-nextjs
npm run dev
# Opens http://localhost:3000
```

### Make Changes:
1. Edit files in `app/`, `components/`, or `lib/`
2. Save - Hot reload automatic
3. Test in browser

### Commit Changes:
```bash
git add .
git commit -m "Your message"
git push origin main
```

### Deploy (once Vercel is connected):
- Just push to GitHub - auto-deploys!

## 📁 Key Directories

```
rs999-nextjs/
├── app/                    # Pages & layouts (Next.js App Router)
│   ├── layout.tsx          # Root layout (add fonts here)
│   ├── page.tsx            # Homepage
│   └── api/                # API routes (for Perfex CRM)
│
├── components/             # React components (to be created)
│   ├── Header.tsx          # Site navigation
│   ├── Footer.tsx          # Site footer
│   └── QuoteForm.tsx       # Lead capture form
│
├── lib/                    # Utility functions (to be created)
│   ├── wordpress.ts        # WordPress API calls
│   └── types.ts            # TypeScript interfaces
│
├── public/                 # Static assets
│   ├── fonts/              # Poppins font files (to be copied)
│   └── images/             # Images (to be copied)
│
└── styles/                 # Not created yet (will add globals.css)
```

## 🎯 WordPress Integration

### Required WordPress Setup:
1. Install **Yoast SEO** or **RankMath** plugin
2. Install **ACF** (Advanced Custom Fields) plugin
3. Verify REST API works: `https://rs999.in/wp-json/wp/v2/posts`

### Fetching Data in Next.js:
```typescript
// Example: Fetch WordPress pages
export async function getPage(slug: string) {
  const res = await fetch(
    `https://rs999.in/wp-json/wp/v2/pages?slug=${slug}`,
    { next: { revalidate: 3600 } } // Cache for 1 hour
  );
  const pages = await res.json();
  return pages[0];
}

// Use in page component
export default async function AboutPage() {
  const page = await getPage('about-us');
  
  return (
    <div>
      <h1>{page.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
    </div>
  );
}
```

## 🎨 Design System

### Colors (Already Configured):
- **Primary**: `bg-primary-600` (Green #059669)
- **Secondary**: `bg-secondary-600` (Blue #2563eb)
- **Gradients**: `bg-gradient-to-r from-primary-600 to-secondary-600`

### Components Classes (Already Configured):
- **Buttons**: `btn-primary`, `btn-secondary`
- **Cards**: `card` (with hover effects)
- **Animations**: `animate-float`, `animate-fade-in-up`

### Example Usage:
```tsx
<button className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-4 rounded-xl font-bold hover:from-primary-700 hover:to-secondary-700 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-105">
  Get Quote
</button>
```

## 📦 Dependencies to Add (Next Phase)

### WordPress Integration:
```bash
# For better WordPress API handling (optional)
npm install @wordpress/api-fetch
```

### Forms:
```bash
# Already have Perfex CRM integration from current site
# Will port JavaScript code to TypeScript
```

### Google Fonts (Poppins):
```bash
# Next.js has built-in font optimization
# Will use next/font/google
```

## 🐛 Common Issues & Solutions

### Port 3000 already in use:
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
# Or use different port
npm run dev -- -p 3001
```

### TypeScript errors:
```bash
# Most will resolve as we add components
# Check tsconfig.json is correct
```

### Tailwind not working:
```bash
# Rebuild Tailwind
npm run build
# Or restart dev server
```

## 📚 Documentation References

- **WordPress Headless Guide**: See `WORDPRESS_HEADLESS_GUIDE.md` (comprehensive!)
- **Project README**: See `PROJECT_README.md` (project-specific)
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind Docs**: https://tailwindcss.com/docs

## ⏱️ Estimated Timeline

| Task | Time | Status |
|------|------|--------|
| ✅ Project setup | 30 min | DONE |
| ✅ Tailwind config | 15 min | DONE |
| ✅ Documentation | 20 min | DONE |
| 🔄 WordPress API utils | 1 hour | TODO |
| 🔄 Components (Header/Footer) | 2 hours | TODO |
| 🔄 Homepage | 1.5 hours | TODO |
| 🔄 Dynamic routes | 1 hour | TODO |
| 🔄 Forms + Perfex | 1 hour | TODO |
| 🔄 Deploy to Vercel | 30 min | TODO |
| 🔄 Testing | 1 hour | TODO |
| **Total** | **~9 hours** | **10% done** |

## 🎉 You're Ready!

The foundation is set. Next up:
1. Create WordPress API utilities
2. Build Header & Footer components
3. Create homepage

**Want to continue? I'm ready to build the components!** 🚀

---

**Created**: October 16, 2025  
**Location**: `/home/ubuntu/2025/rs999-nextjs/`  
**Backup**: `/home/ubuntu/2025/Rs999Static_backup_20251016_132752.tar.gz`
