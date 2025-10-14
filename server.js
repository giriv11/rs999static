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
 * API Endpoint: Upload image to GitHub
 * POST /api/upload-image
 * Expects: { filename: string, base64Data: string }
 * Returns: { url: string }
 */
app.post('/api/upload-image', verifyPassword, async (req, res) => {
  try {
    const { filename, base64Data } = req.body;

    if (!filename || !base64Data) {
      return res.status(400).json({ error: 'Missing filename or base64Data' });
    }

    // Clean filename - remove any path components and spaces
    const cleanFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
    const timestamp = Date.now();
    const uniqueFilename = `${timestamp}_${cleanFilename}`;
    const imagePath = `images/${uniqueFilename}`;

    // Remove data URL prefix if present (data:image/png;base64,...)
    const base64Content = base64Data.replace(/^data:image\/\w+;base64,/, '');

    if (!GITHUB_TOKEN) {
      return res.status(500).json({ error: 'GITHUB_TOKEN not configured' });
    }

    // Upload to GitHub
    const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${imagePath}`;
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: `Upload image: ${uniqueFilename}`,
        content: base64Content,
        branch: GITHUB_BRANCH
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('GitHub API error:', errorData);
      return res.status(response.status).json({ 
        error: 'Failed to upload image to GitHub',
        details: errorData.message 
      });
    }

    const data = await response.json();
    
    // Return the raw GitHub content URL
    const imageUrl = data.content.download_url;

    console.log(`✅ Image uploaded: ${imagePath}`);
    res.json({ 
      success: true, 
      url: imageUrl,
      filename: uniqueFilename,
      path: imagePath
    });

  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ 
      error: 'Failed to upload image',
      details: error.message 
    });
  }
});

/**
 * API Endpoint: Trigger DigitalOcean deployment
 * POST /api/trigger-deploy
 * Call this after any content changes to refresh the static site
 */
app.post('/api/trigger-deploy', verifyPassword, async (req, res) => {
  try {
    // DigitalOcean automatically detects GitHub pushes
    // This endpoint is for manual triggers or webhook confirmation
    
    console.log('🚀 Deployment trigger requested');
    
    res.json({ 
      success: true, 
      message: 'Deployment will refresh automatically from GitHub in 30-60 seconds',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error triggering deployment:', error);
    res.status(500).json({ 
      error: 'Failed to trigger deployment',
      details: error.message 
    });
  }
});

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
 * API Endpoint: Update existing post
 * PUT /api/posts/:slug
 */
app.put('/api/posts/:slug', verifyPassword, async (req, res) => {
  try {
    const { slug: oldSlug } = req.params;
    const { title, slug, date, image, excerpt, content, category, tags, seo } = req.body;

    // Create post JSON with enhanced fields
    const postData = {
      title,
      slug,
      excerpt,
      content,
      date,
      image: image || '',
      category: category || 'Uncategorized',
      tags: tags || [],
      seo: seo || {
        metaTitle: title,
        metaDescription: excerpt,
        focusKeyword: '',
        canonicalUrl: `https://rs999.in/post/${slug}`
      }
    };

    console.log(`📝 Updating post: ${oldSlug} → ${slug}`);

    // Get current index.json from GitHub
    let indexData = [];
    try {
      const indexContent = await githubGetFile('posts/index.json');
      if (indexContent) {
        indexData = JSON.parse(indexContent);
      }
    } catch (error) {
      console.log('📄 Index not found');
    }

    // Remove old entry
    indexData = indexData.filter(post => post.slug !== oldSlug);

    // Add updated entry
    const indexEntry = {
      slug,
      title,
      date,
      excerpt,
      image: image || '',
      category: category || 'Uncategorized',
      tags: tags || []
    };
    indexData.unshift(indexEntry);

    // Push to GitHub using API
    try {
      // 1. Update/create the blog post file
      console.log(`📤 Uploading ${slug}.json to GitHub...`);
      await githubUpdateFile(
        `posts/${slug}.json`,
        JSON.stringify(postData, null, 2),
        `Update blog post: ${title}`
      );
      console.log(`✅ Uploaded ${slug}.json`);

      // 2. Delete old file if slug changed
      if (oldSlug !== slug) {
        console.log(`🗑️ Deleting old file: ${oldSlug}.json`);
        try {
          const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/posts/${oldSlug}.json`;
          const getResponse = await fetch(url, {
            headers: {
              'Authorization': `token ${GITHUB_TOKEN}`,
              'Accept': 'application/vnd.github.v3+json'
            }
          });
          
          if (getResponse.ok) {
            const oldFile = await getResponse.json();
            await fetch(url, {
              method: 'DELETE',
              headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
              },
              body: JSON.stringify({
                message: `Delete old blog post: ${oldSlug}`,
                sha: oldFile.sha,
                branch: GITHUB_BRANCH
              })
            });
          }
        } catch (deleteError) {
          console.log('⚠️ Could not delete old file:', deleteError.message);
        }
      }

      // 3. Update index.json
      console.log(`📤 Updating index.json on GitHub...`);
      await githubUpdateFile(
        'posts/index.json',
        JSON.stringify(indexData, null, 2),
        `Update index.json: ${title}`
      );
      console.log(`✅ Updated index.json on GitHub`);

      res.json({
        success: true,
        message: 'Post updated successfully!',
        post: postData,
        indexEntry
      });

    } catch (githubError) {
      console.error('❌ GitHub API error:', githubError.message);
      res.status(500).json({ 
        error: 'Failed to update on GitHub: ' + githubError.message 
      });
    }

  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * API Endpoint: Delete post
 * DELETE /api/posts/:slug
 */
app.delete('/api/posts/:slug', verifyPassword, async (req, res) => {
  try {
    const { slug } = req.params;

    console.log(`🗑️ Deleting post: ${slug}`);

    // Get current index.json from GitHub
    let indexData = [];
    try {
      const indexContent = await githubGetFile('posts/index.json');
      if (indexContent) {
        indexData = JSON.parse(indexContent);
      }
    } catch (error) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Remove from index
    indexData = indexData.filter(post => post.slug !== slug);

    try {
      // 1. Delete post file
      const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/posts/${slug}.json`;
      const getResponse = await fetch(url, {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      
      if (!getResponse.ok) {
        return res.status(404).json({ error: 'Post not found' });
      }

      const fileData = await getResponse.json();
      
      await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: `Delete blog post: ${slug}`,
          sha: fileData.sha,
          branch: GITHUB_BRANCH
        })
      });
      
      console.log(`✅ Deleted ${slug}.json`);

      // 2. Update index.json
      await githubUpdateFile(
        'posts/index.json',
        JSON.stringify(indexData, null, 2),
        `Update index after deleting: ${slug}`
      );
      console.log(`✅ Updated index.json`);

      res.json({ success: true, message: 'Post deleted successfully' });

    } catch (githubError) {
      console.error('❌ GitHub API error:', githubError.message);
      res.status(500).json({ error: 'Failed to delete from GitHub' });
    }

  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: error.message });
  }
});

// ============================================================================
// CATEGORIES API
// ============================================================================

/**
 * Get all categories
 */
app.get('/api/categories', async (req, res) => {
  try {
    const content = await githubGetFile('categories.json');
    const categories = content ? JSON.parse(content) : [];
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.json([]);
  }
});

/**
 * Create new category
 */
app.post('/api/categories', verifyPassword, async (req, res) => {
  try {
    const { name, slug } = req.body;

    // Get existing categories
    let categories = [];
    try {
      const content = await githubGetFile('categories.json');
      categories = content ? JSON.parse(content) : [];
    } catch (error) {
      console.log('Creating new categories.json');
    }

    // Check if exists
    if (categories.some(cat => cat.slug === slug)) {
      return res.status(409).json({ error: 'Category already exists' });
    }

    // Add new category
    const newCategory = {
      id: categories.length + 1,
      name,
      slug,
      count: 0
    };
    categories.push(newCategory);

    // Save to GitHub
    await githubUpdateFile(
      'categories.json',
      JSON.stringify(categories, null, 2),
      `Add category: ${name}`
    );

    res.json({ success: true, category: newCategory });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Delete category
 */
app.delete('/api/categories/:slug', verifyPassword, async (req, res) => {
  try {
    const { slug } = req.params;

    // Get existing categories
    let categories = [];
    try {
      const content = await githubGetFile('categories.json');
      categories = content ? JSON.parse(content) : [];
    } catch (error) {
      return res.status(404).json({ error: 'Categories not found' });
    }

    // Remove category
    categories = categories.filter(cat => cat.slug !== slug);

    // Save to GitHub
    await githubUpdateFile(
      'categories.json',
      JSON.stringify(categories, null, 2),
      `Delete category: ${slug}`
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: error.message });
  }
});

// ============================================================================
// TAGS API
// ============================================================================

/**
 * Get all tags
 */
app.get('/api/tags', async (req, res) => {
  try {
    const content = await githubGetFile('tags.json');
    const tags = content ? JSON.parse(content) : [];
    res.json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.json([]);
  }
});

/**
 * Delete tag
 */
app.delete('/api/tags/:name', verifyPassword, async (req, res) => {
  try {
    const { name } = req.params;

    // Get existing tags
    let tags = [];
    try {
      const content = await githubGetFile('tags.json');
      tags = content ? JSON.parse(content) : [];
    } catch (error) {
      return res.status(404).json({ error: 'Tags not found' });
    }

    // Remove tag
    tags = tags.filter(tag => tag.name !== name);

    // Save to GitHub
    await githubUpdateFile(
      'tags.json',
      JSON.stringify(tags, null, 2),
      `Delete tag: ${name}`
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting tag:', error);
    res.status(500).json({ error: error.message });
  }
});

// ============================================================================
// PROFILE API
// ============================================================================

/**
 * Get profile
 */
app.get('/api/profile', async (req, res) => {
  try {
    const content = await githubGetFile('profile.json');
    const profile = content ? JSON.parse(content) : {};
    res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.json({});
  }
});

/**
 * Update profile
 */
app.put('/api/profile', verifyPassword, async (req, res) => {
  try {
    const { name, email, bio, password } = req.body;

    // Get existing profile
    let profile = {};
    try {
      const content = await githubGetFile('profile.json');
      profile = content ? JSON.parse(content) : {};
    } catch (error) {
      console.log('Creating new profile.json');
    }

    // Update profile
    profile.name = name;
    profile.email = email;
    profile.bio = bio;

    // Note: Password change would require updating environment variable
    // For now, just save profile data

    // Save to GitHub
    await githubUpdateFile(
      'profile.json',
      JSON.stringify(profile, null, 2),
      'Update admin profile'
    );

    res.json({ success: true, profile });
  } catch (error) {
    console.error('Error updating profile:', error);
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
