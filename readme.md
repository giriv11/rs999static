Complete Migration Plan: rs999.in to HTML + Tailwind + Static JSON Blogs (Start to End)
This end-to-end plan incorporates security mitigations (e.g., auth for admin, sanitization for content) and gets your site live in 3-5 days (part-time, ~8-10 hours total). It targets 95+ PageSpeed scores and improved SEO via static delivery. Stack: HTML + Tailwind for structure/styling, vanilla JS for JSON fetches, per-post JSON for 200 blogs (scalable, fast). Use GitHub for version control/local dev, 20i Git for hosting/deploys (instant pulls). Tools: VS Code, Node.js (migration), Git. Backup everything first—cost: $0 extra.
Phase 1: Preparation & Security Setup (Day 1, 1-2 Hours)

Backup Current Site:

My20i dashboard > Manage Hosting > Backups > Create full site backup (files + DB). Download ZIP to local.
WP Admin > Tools > Export > All content > Download XML (for blogs).


Enable 20i Git & Security Basics:

My20i > Manage Hosting > Options > Manage > Web Files > Git Version Control > Sign in with GitHub or add name/email > Enable.
Security: My20i > Security > Firewall > Enable all rules. SSL > Force HTTPS (auto-renew).
If private repo later: My20i > SSH Access > Generate/add key.


Local Dev Environment:

Install/update: VS Code, Node.js (v18+), Git.
GitHub: New repo rs999-static-site (public) > Clone: Terminal > git clone https://github.com/yourusername/rs999-static-site.git > cd rs999-static-site.
Tailwind: npm init -y && npm i -D tailwindcss > npx tailwindcss init. Add to package.json: "build-css": "tailwindcss -i ./input.css -o ./output.css --minify".
input.css: @tailwind base; @tailwind components; @tailwind utilities;.
Security: Create .gitignore: Add node_modules/, *.env, wp-export.xml.
Enable 2FA: GitHub settings > Security > Enable.


Initial Structure:

Files/folders:
text/
├── index.html          # Homepage (hero, services, recent blogs)
├── blog.html           # Blog index
├── admin.html          # Upload form (protected)
├── post-[slug].html    # Single post templates (generated)
├── input.css           # Tailwind
├── output.css          # Built CSS
├── posts/              # JSONs
│   └── index.json      # Blog list array
├── images/             # Optimized assets
└── .htaccess           # Security/caching/redirects

Basic index.html stub (add Tailwind classes for responsive hero/services).
Commit: git add . && git commit -m "Init with security setup" && git push.



Phase 2: Content Migration with Sanitization (Day 1-2, 2-3 Hours)

Static Content Migration:

Manual: Copy WP text/images from homepage/services/portfolio/testimonials to index.html (e.g., services grid: <div class="grid md:grid-cols-3 gap-8"> <div class="bg-white p-6 rounded shadow">...</div> </div>).
Images: Compress via TinyPNG > Save to /images/.


Blog Migration (200 Posts):

Place wp-export.xml in root.
Create migrate.js (sanitizes content):
jsconst fs = require('fs');
const xml2js = require('xml2js');
const path = require('path');

fs.mkdirSync('./posts', { recursive: true });

fs.readFile('wp-export.xml', 'utf8', (err, xml) => {
  if (err) throw err;
  xml2js.parseString(xml, (err, result) => {
    if (err) throw err;
    const items = result.rss.channel[0].item.filter(item => item['wp:post_type'][0] === 'post');
    const index = [];
    items.forEach(post => {
      const slug = post['wp:post_name'][0];
      let content = post['content:encoded'][0].trim();
      // Basic sanitization: Strip <script> tags
      content = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
      const data = {
        title: post.title[0],
        slug,
        excerpt: post['excerpt:encoded'][0].trim() || '',
        content,
        date: post['wp:post_date'][0].split(' ')[0],
        image: '' // Add thumbnail extraction if needed
      };
      fs.writeFileSync(path.join('./posts', `${slug}.json`), JSON.stringify(data, null, 2));
      index.push({ slug, title: data.title, date: data.date, excerpt: data.excerpt.substring(0, 150) });
    });
    fs.writeFileSync('./posts/index.json', JSON.stringify(index.sort((a, b) => new Date(b.date) - new Date(a.date)), null, 2));
    // Generate static post HTMLs (with sanitization hook)
    index.forEach(post => {
      const html = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${post.title} | Rs999</title>
        <link href="../output.css" rel="stylesheet">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.1.7/purify.min.js"></script>
        <meta name="description" content="${post.excerpt}">
      </head>
      <body class="bg-gray-50">
        <nav class="bg-blue-600 text-white p-4"><a href="/" class="mr-4">Home</a><a href="/blog.html">Blog</a></nav>
        <section class="py-16">
          <div class="container mx-auto px-4 max-w-2xl">
            <article id="post-content" class="bg-white p-8 rounded-lg shadow-md prose"></article>
          </div>
        </section>
        <script>
          const slug = '${post.slug}';
          fetch('../posts/' + slug + '.json').then(r => r.json()).then(p => {
            const cleanContent = DOMPurify.sanitize(p.content);
            document.getElementById('post-content').innerHTML = \`
              <h1 class="text-4xl font-bold mb-4">\${p.title}</h1>
              <small class="text-gray-500 mb-6">\${p.date}</small>
              \${p.image ? '<img src="\\${p.image}" alt="\${p.title}" class="w-full h-64 object-cover rounded mb-6" loading="lazy">' : ''}
              <div class="text-lg">\${cleanContent}</div>
            \`;
          });
        </script>
      </body>
      </html>`;
      fs.writeFileSync(`post-${post.slug}.html`, html);
    });
    console.log(`${items.length} posts migrated & sanitized!`);
  });
});

Install dep: npm i xml2js.
Run: node migrate.js.
Commit: git add . && git commit -m "Migrate & sanitize 200 blogs" && git push.



Phase 3: Build Features & Security Layers (Day 2-3, 3-4 Hours)

Homepage & Static Pages:

Flesh out index.html: Add Tailwind sections (hero, services, testimonials). Embed recent 3 blogs: Copy blog list script, slice(0,3).
Build CSS: npm run build-css > Link <link href="output.css" rel="stylesheet"> in all HTML.


Blog Frontend:

blog.html: Fetch/render index.json (10 recent, Tailwind grid—snippet from prior).
Include DOMPurify CDN in <head> for sanitization.


Admin Upload Form (Protected):

admin.html: Form + JS download (post.json + index-update.json). Add password gate:
html<script>
  const PASS = 'your-strong-password'; // Change; store securely
  if (prompt('Enter Admin Password:') !== PASS) { document.body.innerHTML = '<h1>Access Denied</h1>'; return; }
  // Form code...
</script>

For stronger: Create /admin subfolder > .htaccess: AuthType Basic\nAuthName "Admin"\nAuthUserFile ../.htpasswd\nRequire valid-user (generate .htpasswd in My20i).


Forms (Quotes):

In index.html: <form action="https://formspree.io/f/your-form-id" method="POST"> (sign up free, add hCaptcha: <div class="hcaptcha" data-sitekey="your-key"></div><script src="https://js.hcaptcha.com/1/api.js"></script>).


Test Locally:

VS Code Live Server > Check: Loads, responsiveness, sanitization (paste script in content > see stripped), forms submit.
Security scan: Browser console > No errors; try unauthorized admin access.



Phase 4: Deploy & Launch (Day 3, 1 Hour)

20i Deploy:

My20i Git > Clone URL: https://github.com/yourusername/rs999-static-site.git > Path: / > Create repo.
Development > Pull latest > Deploy HEAD Commit. Site live.


Cutover & Redirects:

.htaccess (upload via Git):
text# Security: Deny PHP
<Files *.php> Order allow,deny Deny from all </Files>
# Cache static
<FilesMatch "\.(html|css|js|json|jpg|png)"> Header set Cache-Control "max-age=3600, public" </FilesMatch>
# Redirects
Redirect 301 /wp-blog /blog.html
Redirect 301 /old-post /post-[slug].html  # Pattern for blogs

WP cleanup: Delete WP files post-backup (keep DB if needed).


SEO/Launch:

Generate sitemap.xml (manual/script: List all post URLs) > Submit to Google Search Console.
Request indexing: GSC > URL Inspection > 200+ posts.
Test live: PageSpeed (mobile/desktop), forms, admin lock.



Phase 5: Maintenance & Monitoring (Ongoing, 15-30 mins/month)

Routine Workflow:

New blog: admin.html > Download JSONs > Local add/update > git commit -m "Add post" && git push > My20i Pull + Deploy.
Updates: Edit HTML/JSON > Commit > Deploy.


Security & Perf:

Monthly: Update CDNs (e.g., DOMPurify), scan Sucuri.net, check GSC security.
Alerts: UptimeRobot.com (free) for downtime.
Backups: My20i auto + GitHub.