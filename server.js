/**
 * Admin Backend Server for Rs999 Blog Management
 * Handles file operations and git automation
 * Run: node server.js
 */

const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

const app = express();
const PORT = process.env.PORT || 3001;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Rs999Admin@2025'; // Must match admin.html password
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || 'giriv11/rs999static';
const GITHUB_BRANCH = 'main';

/**
 * GitHub API Helper: Create or update a file
 */
async function githubUpdateFile(filePath, content, message) {
  if (!GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN not configured');
  }

  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`;
  
  try {
    // Get current file SHA (needed for updates)
    const getResponse = await fetch(url, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    let sha = null;
    if (getResponse.ok) {
      const data = await getResponse.json();
      sha = data.sha;
    }
    
    // Create/update file
    const body = {
      message,
      content: Buffer.from(content).toString('base64'),
      branch: GITHUB_BRANCH
    };
    
    if (sha) {
      body.sha = sha; // Required for updates
    }
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`GitHub API error: ${error.message}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('GitHub API error:', error);
    throw error;
  }
}

/**
 * GitHub API Helper: Get file content
 */
async function githubGetFile(filePath) {
  if (!GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN not configured');
  }

  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`;
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  });
  
  if (!response.ok) {
    if (response.status === 404) {
      return null; // File doesn't exist
    }
    throw new Error(`GitHub API error: ${response.statusText}`);
  }
  
  const data = await response.json();
  return Buffer.from(data.content, 'base64').toString('utf8');
}

// Middleware
app.use(express.json());
app.use(express.static('.')); // Serve static files

// CORS for local development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

/**
 * Health Check Endpoint for DigitalOcean
 * GET /api/health
 */
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    service: 'rs999-admin-api',
    timestamp: new Date().toISOString()
  });
});

// Password verification middleware
const verifyPassword = (req, res, next) => {
  const password = req.headers.authorization?.replace('Bearer ', '');
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

/**
 * API Endpoint: Create new blog post
 * POST /api/posts
 */
app.post('/api/posts', verifyPassword, async (req, res) => {
  try {
    const { title, slug, date, image, excerpt, content, category } = req.body;

    // Validate required fields
    if (!title || !slug || !date || !excerpt || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create post JSON
    const postData = {
      title,
      slug,
      excerpt,
      content,
      date,
      image: image || '',
      category: category || 'Uncategorized'
    };

    // Create index entry
    const indexEntry = {
      slug,
      title,
      date,
      excerpt,
      image: image || '',
      category: category || 'Uncategorized'
    };

    console.log(`📝 Creating post: ${slug}`);

    // Get current index.json from GitHub
    let indexData = [];
    try {
      const indexContent = await githubGetFile('posts/index.json');
      if (indexContent) {
        indexData = JSON.parse(indexContent);
      }
    } catch (error) {
      console.log('📄 Creating new index.json');
    }

    // Check if post already exists
    if (indexData.some(post => post.slug === slug)) {
      return res.status(409).json({ error: 'Post with this slug already exists' });
    }

    // Add new post to beginning of array
    indexData.unshift(indexEntry);

    // Push to GitHub using API
    try {
      // 1. Create/update the blog post file
      console.log(`📤 Uploading ${slug}.json to GitHub...`);
      await githubUpdateFile(
        `posts/${slug}.json`,
        JSON.stringify(postData, null, 2),
        `Add new blog post: ${title}`
      );
      console.log(`✅ Uploaded ${slug}.json`);

      // 2. Update index.json
      console.log(`📤 Updating index.json on GitHub...`);
      await githubUpdateFile(
        'posts/index.json',
        JSON.stringify(indexData, null, 2),
        `Update index.json with: ${title}`
      );
      console.log(`✅ Updated index.json on GitHub`);

      res.json({
        success: true,
        message: 'Post created and pushed to GitHub successfully! Site will update in 30-60 seconds.',
        post: postData,
        indexEntry
      });

    } catch (githubError) {
      console.error('❌ GitHub API error:', githubError.message);
      res.status(500).json({ 
        error: 'Failed to push to GitHub: ' + githubError.message,
        details: 'Make sure GITHUB_TOKEN is configured correctly'
      });
    }

  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * API Endpoint: Get all posts
 * GET /api/posts
 */
app.get('/api/posts', async (req, res) => {
  try {
    // Try GitHub API first, fallback to local
    let indexContent;
    if (GITHUB_TOKEN) {
      indexContent = await githubGetFile('posts/index.json');
    } else {
      const indexFilePath = path.join(__dirname, 'posts', 'index.json');
      indexContent = await fs.readFile(indexFilePath, 'utf8');
    }
    const posts = JSON.parse(indexContent);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * API Endpoint: Get single post
 * GET /api/posts/:slug
 */
app.get('/api/posts/:slug', async (req, res) => {
  try {
    const postFilePath = path.join(__dirname, 'posts', `${req.params.slug}.json`);
    const postContent = await fs.readFile(postFilePath, 'utf8');
    const post = JSON.parse(postContent);
    res.json(post);
  } catch (error) {
    res.status(404).json({ error: 'Post not found' });
  }
});

/**
 * API Endpoint: Delete post
 * DELETE /api/posts/:slug
 */
app.delete('/api/posts/:slug', verifyPassword, async (req, res) => {
  try {
    const { slug } = req.params;
    const postFilePath = path.join(__dirname, 'posts', `${slug}.json`);
    const indexFilePath = path.join(__dirname, 'posts', 'index.json');

    // Delete post file
    await fs.unlink(postFilePath);

    // Update index
    const indexContent = await fs.readFile(indexFilePath, 'utf8');
    let indexData = JSON.parse(indexContent);
    indexData = indexData.filter(post => post.slug !== slug);
    await fs.writeFile(indexFilePath, JSON.stringify(indexData, null, 2));

    // Git operations
    await execPromise('git add posts/');
    await execPromise(`git commit -m "Delete blog post: ${slug}"`);
    await execPromise('git push origin main');

    res.json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Health check
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Admin server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║  🚀 Rs999 Admin Server Running                             ║
║                                                            ║
║  📡 Server:    http://localhost:${PORT}                        ║
║  🔐 Admin:     http://localhost:${PORT}/admin.html             ║
║  📊 API:       http://localhost:${PORT}/api/posts              ║
║                                                            ║
║  💡 Tip: Keep this server running while using admin panel  ║
╚════════════════════════════════════════════════════════════╝
  `);
});
