# Vercel Deployment Guide

1. Create a GitHub repository and push this project.
2. Sign in to https://vercel.com and import the GitHub repository.
3. In Vercel's project settings -> Environment Variables, add values from `.env.local`:
   - WORDPRESS_API_URL
   - NEXT_PUBLIC_WORDPRESS_API_URL
   - PERFEX_API_KEY
   - PERFEX_API_URL
   - NEXT_PUBLIC_SITE_URL
   - NEXT_PUBLIC_GA_ID
4. Set the root build command (Vercel usually detects Next.js):
   - Framework Preset: Next.js
5. Deploy
6. Configure custom domain `rs999.in` and point DNS to Vercel (CNAME/ALIAS as guided).

Notes:
- ISR is configured in the app code (revalidate seconds). No extra setup needed.
- For preview deployments Vercel will create unique URLs.

