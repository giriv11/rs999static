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
const PORT = 3001;
const ADMIN_PASSWORD = 'Rs999Admin@2025'; // Must match admin.html password

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

    const postsDir = path.join(__dirname, 'posts');
    const postFilePath = path.join(postsDir, `${slug}.json`);
    const indexFilePath = path.join(postsDir, 'index.json');

    // Check if post already exists
    try {
      await fs.access(postFilePath);
      return res.status(409).json({ error: 'Post with this slug already exists' });
    } catch {
      // Post doesn't exist, continue
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

    // Save post file
    await fs.writeFile(postFilePath, JSON.stringify(postData, null, 2));
    console.log(`✅ Created post file: ${slug}.json`);

    // Update index.json
    let indexData = [];
    try {
      const indexContent = await fs.readFile(indexFilePath, 'utf8');
      indexData = JSON.parse(indexContent);
    } catch (error) {
      console.log('Creating new index.json');
    }

    // Add new post to beginning of array
    const indexEntry = {
      slug,
      title,
      date,
      excerpt,
      image: image || '',
      category: category || 'Uncategorized'
    };

    indexData.unshift(indexEntry);

    // Save updated index
    await fs.writeFile(indexFilePath, JSON.stringify(indexData, null, 2));
    console.log(`✅ Updated index.json`);

    // Git operations
    try {
      await execPromise('git add posts/');
      console.log('✅ Git add completed');

      await execPromise(`git commit -m "Add new blog post: ${title}"`);
      console.log('✅ Git commit completed');

      await execPromise('git push origin main');
      console.log('✅ Git push completed');
    } catch (gitError) {
      console.error('⚠️ Git operation warning:', gitError.message);
      // Continue even if git fails
    }

    res.json({
      success: true,
      message: 'Post created and pushed to GitHub successfully',
      post: postData,
      indexEntry
    });

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
    const indexFilePath = path.join(__dirname, 'posts', 'index.json');
    const indexContent = await fs.readFile(indexFilePath, 'utf8');
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
