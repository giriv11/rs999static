/**
 * Rs999 Enhanced Admin Panel JavaScript
 * Handles all admin functionality including posts, categories, tags, and profile management
 */

// Configuration
const ADMIN_PASSWORD = 'Rs999Admin@2025';
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3001/api'
  : 'https://rs999-static-app-vc4qz.ondigitalocean.app/api';

// Global state
let currentTags = [];
let allCategories = [];
let allTags = [];
let allPosts = [];
let editingPost = null;

// ============================================================================
// AUTHENTICATION
// ============================================================================

document.getElementById('passwordForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const password = document.getElementById('passwordInput').value;
  
  if (password === ADMIN_PASSWORD) {
    document.getElementById('passwordGate').classList.add('hidden');
    document.getElementById('adminPanel').classList.remove('hidden');
    loadDashboard();
  } else {
    document.getElementById('errorMessage').classList.remove('hidden');
    document.getElementById('passwordInput').value = '';
  }
});

function logout() {
  if (confirm('Are you sure you want to logout?')) {
    document.getElementById('passwordGate').classList.remove('hidden');
    document.getElementById('adminPanel').classList.add('hidden');
    document.getElementById('passwordInput').value = '';
    document.getElementById('errorMessage').classList.add('hidden');
  }
}

// ============================================================================
// TAB NAVIGATION
// ============================================================================

function showTab(tabName) {
  // Hide all tabs
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Remove active class from all buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('bg-primary-50', 'text-primary-700');
    btn.classList.add('text-gray-700');
  });
  
  // Show selected tab
  document.getElementById(tabName + '-tab').classList.add('active');
  
  // Highlight active button - find by onclick attribute
  const activeBtn = Array.from(document.querySelectorAll('.tab-btn')).find(
    btn => btn.getAttribute('onclick') === `showTab('${tabName}')`
  );
  if (activeBtn) {
    activeBtn.classList.add('bg-primary-50', 'text-primary-700');
    activeBtn.classList.remove('text-gray-700');
  }
  
  // Load data for specific tabs
  switch(tabName) {
    case 'dashboard':
      loadDashboard();
      break;
    case 'all-posts':
      loadAllPosts();
      break;
    case 'categories':
      loadCategories();
      break;
    case 'tags':
      loadTags();
      break;
  }
}

// ============================================================================
// DASHBOARD
// ============================================================================

async function loadDashboard() {
  try {
    // Load all posts
    const response = await fetch(`${API_URL}/posts`);
    const posts = await response.json();
    
    // Load categories
    const categoriesRes = await fetch(`${API_URL}/categories`).catch(() => ({ json: () => [] }));
    const categories = await categoriesRes.json?.() || [];
    
    // Load tags
    const tagsRes = await fetch(`${API_URL}/tags`).catch(() => ({ json: () => [] }));
    const tags = await tagsRes.json?.() || [];
    
    // Update stats
    document.getElementById('stat-posts').textContent = posts.length;
    document.getElementById('stat-categories').textContent = categories.length || 4;
    document.getElementById('stat-tags').textContent = tags.length || 0;
    
    // Count this month's posts
    const thisMonth = new Date().getMonth();
    const thisMonthPosts = posts.filter(post => {
      const postMonth = new Date(post.date).getMonth();
      return postMonth === thisMonth;
    });
    document.getElementById('stat-month').textContent = thisMonthPosts.length;
    
    // Show recent posts
    const recentPostsHtml = posts.slice(0, 5).map(post => `
      <div class="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
        <div class="flex-1">
          <h4 class="font-semibold text-gray-900 text-sm">${post.title}</h4>
          <p class="text-xs text-gray-500 mt-1">
            <i class="far fa-calendar mr-1"></i>${new Date(post.date).toLocaleDateString()}
            <span class="mx-2">•</span>
            <i class="far fa-folder mr-1"></i>${post.category}
          </p>
        </div>
        <button onclick="editPost('${post.slug}')" 
          class="text-primary-600 hover:text-primary-700 text-sm font-semibold">
          Edit
        </button>
      </div>
    `).join('');
    
    document.getElementById('recent-posts').innerHTML = recentPostsHtml || 
      '<p class="text-gray-500 text-center py-8">No posts yet</p>';
    
  } catch (error) {
    console.error('Error loading dashboard:', error);
  }
}

// ============================================================================
// FORM HANDLING
// ============================================================================

// Auto-generate slug from title
document.getElementById('title').addEventListener('input', function(e) {
  const slug = e.target.value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  document.getElementById('slug').value = slug;
});

// Excerpt character counter
document.getElementById('excerpt').addEventListener('input', function(e) {
  document.getElementById('excerptCount').textContent = e.target.value.length;
});

// Meta title counter
document.getElementById('metaTitle').addEventListener('input', function(e) {
  document.getElementById('metaTitleCount').textContent = e.target.value.length;
});

// Meta description counter
document.getElementById('metaDescription').addEventListener('input', function(e) {
  document.getElementById('metaDescCount').textContent = e.target.value.length;
});

// Set today's date by default
document.getElementById('date').valueAsDate = new Date();

// ============================================================================
// TAGS HANDLING
// ============================================================================

document.getElementById('tag-input').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    const tag = e.target.value.trim().toLowerCase();
    
    if (tag && !currentTags.includes(tag)) {
      currentTags.push(tag);
      renderTags();
      e.target.value = '';
    }
  }
});

function renderTags() {
  const container = document.getElementById('tags-container');
  container.innerHTML = currentTags.map(tag => `
    <span class="tag-badge">
      ${tag}
      <button type="button" onclick="removeTag('${tag}')" aria-label="Remove tag">×</button>
    </span>
  `).join('');
}

function removeTag(tag) {
  currentTags = currentTags.filter(t => t !== tag);
  renderTags();
}

// ============================================================================
// IMAGE UPLOAD
// ============================================================================

document.getElementById('image-upload').addEventListener('change', async function(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  // Validate file type
  if (!file.type.startsWith('image/')) {
    showNotification('Please select an image file', 'error');
    return;
  }
  
  // Validate file size (max 1MB for GitHub API)
  if (file.size > 1 * 1024 * 1024) {
    showNotification('Image size must be less than 1MB. Please compress or resize your image, or use an external image URL.', 'error');
    e.target.value = ''; // Clear the file input
    return;
  }
  
  showNotification('Uploading image...', 'info');
  
  // Read file as base64
  const reader = new FileReader();
  reader.onload = async function(event) {
    const base64Data = event.target.result;
    
    // Show preview
    const preview = document.getElementById('image-preview');
    preview.querySelector('img').src = base64Data;
    preview.classList.remove('hidden');
    
    // Upload to GitHub
    try {
      const response = await fetch(`${API_URL}/upload-image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${ADMIN_PASSWORD}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          filename: file.name,
          base64Data: base64Data
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        document.getElementById('image').value = data.url;
        showNotification('Image uploaded successfully!', 'success');
      } else {
        const error = await response.json();
        throw new Error(error.details || 'Upload failed');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      showNotification(`Image upload failed: ${error.message}. You can still paste a URL.`, 'error');
    }
  };
  
  reader.readAsDataURL(file);
});

// Image URL preview
document.getElementById('image').addEventListener('input', function(e) {
  if (e.target.value) {
    const preview = document.getElementById('image-preview');
    preview.querySelector('img').src = e.target.value;
    preview.classList.remove('hidden');
  }
});

// ============================================================================
// POST SUBMISSION
// ============================================================================

document.getElementById('blogForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const submitButton = e.target.querySelector('button[type="submit"]');
  const originalText = submitButton.innerHTML;
  
  submitButton.disabled = true;
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Publishing...';
  
  const formData = {
    title: document.getElementById('title').value.trim(),
    slug: document.getElementById('slug').value.trim(),
    date: document.getElementById('date').value,
    category: document.getElementById('category').value,
    tags: currentTags,
    excerpt: document.getElementById('excerpt').value.trim(),
    content: document.getElementById('content').value.trim(),
    image: document.getElementById('image').value.trim() || '',
    seo: {
      metaTitle: document.getElementById('metaTitle').value.trim() || document.getElementById('title').value.trim(),
      metaDescription: document.getElementById('metaDescription').value.trim() || document.getElementById('excerpt').value.trim(),
      focusKeyword: document.getElementById('focusKeyword').value.trim(),
      canonicalUrl: document.getElementById('canonicalUrl').value.trim() || `https://rs999.in/post/${document.getElementById('slug').value}`
    }
  };
  
  try {
    const url = editingPost ? `${API_URL}/posts/${editingPost}` : `${API_URL}/posts`;
    const method = editingPost ? 'PUT' : 'POST';
    
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_PASSWORD}`
      },
      body: JSON.stringify(formData)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to save post');
    }
    
    const result = await response.json();
    
    showNotification(
      editingPost ? 'Post updated successfully! Changes will appear on live site in 30-60 seconds.' : 'Post published successfully! It will appear on live site in 30-60 seconds.',
      'success'
    );
    
    resetForm();
    editingPost = null;
    
    // Refresh dashboard
    setTimeout(() => {
      showTab('all-posts');
      loadAllPosts();
    }, 1000);
    
  } catch (error) {
    console.error('Error saving post:', error);
    showNotification(error.message, 'error');
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = originalText;
  }
});

function resetForm() {
  document.getElementById('blogForm').reset();
  document.getElementById('date').valueAsDate = new Date();
  currentTags = [];
  renderTags();
  document.getElementById('image-preview').classList.add('hidden');
  document.getElementById('excerptCount').textContent = '0';
  document.getElementById('metaTitleCount').textContent = '0';
  document.getElementById('metaDescCount').textContent = '0';
  editingPost = null;
}

// ============================================================================
// POSTS LISTING
// ============================================================================

async function loadAllPosts() {
  try {
    const response = await fetch(`${API_URL}/posts`);
    allPosts = await response.json();
    
    renderPostsTable(allPosts);
  } catch (error) {
    console.error('Error loading posts:', error);
    document.getElementById('posts-table-body').innerHTML = 
      '<tr><td colspan="4" class="px-6 py-8 text-center text-red-600">Error loading posts</td></tr>';
  }
}

function renderPostsTable(posts) {
  const tbody = document.getElementById('posts-table-body');
  
  if (posts.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" class="px-6 py-8 text-center text-gray-500">No posts found</td></tr>';
    return;
  }
  
  tbody.innerHTML = posts.map(post => `
    <tr class="hover:bg-gray-50 transition-colors">
      <td class="px-6 py-4">
        <div class="font-semibold text-gray-900">${post.title}</div>
        <div class="text-sm text-gray-500 mt-1">${post.slug}</div>
      </td>
      <td class="px-6 py-4">
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
          ${post.category}
        </span>
      </td>
      <td class="px-6 py-4 text-sm text-gray-600">
        ${new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
      </td>
      <td class="px-6 py-4 text-right space-x-2">
        <button onclick="viewPost('${post.slug}')" 
          class="text-blue-600 hover:text-blue-700 font-semibold text-sm"
          title="View post">
          <i class="fas fa-eye"></i>
        </button>
        <button onclick="editPost('${post.slug}')" 
          class="text-green-600 hover:text-green-700 font-semibold text-sm"
          title="Edit post">
          <i class="fas fa-edit"></i>
        </button>
        <button onclick="deletePost('${post.slug}')" 
          class="text-red-600 hover:text-red-700 font-semibold text-sm"
          title="Delete post">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

// Search posts
document.getElementById('search-posts').addEventListener('input', function(e) {
  const searchTerm = e.target.value.toLowerCase();
  const filtered = allPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.category.toLowerCase().includes(searchTerm) ||
    post.slug.toLowerCase().includes(searchTerm)
  );
  renderPostsTable(filtered);
});

function viewPost(slug) {
  window.open(`/post.html?slug=${slug}`, '_blank');
}

async function editPost(slug) {
  try {
    const response = await fetch(`${API_URL}/posts/${slug}`);
    const post = await response.json();
    
    // Populate form
    document.getElementById('title').value = post.title;
    document.getElementById('slug').value = post.slug;
    document.getElementById('date').value = post.date;
    document.getElementById('category').value = post.category;
    document.getElementById('excerpt').value = post.excerpt;
    document.getElementById('content').value = post.content;
    document.getElementById('image').value = post.image || '';
    
    // SEO fields
    if (post.seo) {
      document.getElementById('metaTitle').value = post.seo.metaTitle || '';
      document.getElementById('metaDescription').value = post.seo.metaDescription || '';
      document.getElementById('focusKeyword').value = post.seo.focusKeyword || '';
      document.getElementById('canonicalUrl').value = post.seo.canonicalUrl || '';
    }
    
    // Tags
    currentTags = post.tags || [];
    renderTags();
    
    // Image preview
    if (post.image) {
      const preview = document.getElementById('image-preview');
      preview.querySelector('img').src = post.image;
      preview.classList.remove('hidden');
    }
    
    // Update character counters
    document.getElementById('excerptCount').textContent = post.excerpt.length;
    document.getElementById('metaTitleCount').textContent = (post.seo?.metaTitle || '').length;
    document.getElementById('metaDescCount').textContent = (post.seo?.metaDescription || '').length;
    
    // Set editing mode
    editingPost = slug;
    
    // Switch to add-post tab
    showTab('add-post');
    
    // Update button text
    const submitButton = document.querySelector('#blogForm button[type="submit"]');
    submitButton.innerHTML = '<i class="fas fa-save mr-2"></i> Update Post';
    
    showNotification('Editing post: ' + post.title, 'info');
    
  } catch (error) {
    console.error('Error loading post:', error);
    showNotification('Error loading post for editing', 'error');
  }
}

async function deletePost(slug) {
  if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
    return;
  }
  
  try {
    const response = await fetch(`${API_URL}/posts/${slug}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${ADMIN_PASSWORD}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete post');
    }
    
    showNotification('Post deleted successfully! Changes will appear on live site in 30-60 seconds.', 'success');
    loadAllPosts();
    
  } catch (error) {
    console.error('Error deleting post:', error);
    showNotification('Error deleting post', 'error');
  }
}

// ============================================================================
// CATEGORIES MANAGEMENT
// ============================================================================

async function loadCategories() {
  try {
    const response = await fetch(`${API_URL}/categories`);
    allCategories = await response.json();
    
    renderCategoriesList();
    updateCategoryDropdown();
  } catch (error) {
    console.error('Error loading categories:', error);
    // Use default categories if API fails
    allCategories = [
      { id: 1, name: 'Web Design', slug: 'web-design' },
      { id: 2, name: 'eCommerce', slug: 'ecommerce' },
      { id: 3, name: 'SEO', slug: 'seo' },
      { id: 4, name: 'Digital Marketing', slug: 'digital-marketing' }
    ];
    renderCategoriesList();
    updateCategoryDropdown();
  }
}

function renderCategoriesList() {
  const container = document.getElementById('categories-list');
  
  if (allCategories.length === 0) {
    container.innerHTML = '<p class="text-gray-500 text-center py-8">No categories yet</p>';
    return;
  }
  
  container.innerHTML = allCategories.map(cat => `
    <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div>
        <div class="font-semibold text-gray-900">${cat.name}</div>
        <div class="text-xs text-gray-500">${cat.slug}</div>
      </div>
      <button onclick="deleteCategory('${cat.slug}')" 
        class="text-red-600 hover:text-red-700"
        title="Delete category">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `).join('');
}

function updateCategoryDropdown() {
  const select = document.getElementById('category');
  const currentValue = select.value;
  
  select.innerHTML = '<option value="">Select category...</option>' +
    allCategories.map(cat => 
      `<option value="${cat.name}">${cat.name}</option>`
    ).join('');
  
  if (currentValue) {
    select.value = currentValue;
  }
}

// Category name to slug
document.getElementById('category-name').addEventListener('input', function(e) {
  const slug = e.target.value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  document.getElementById('category-slug').value = slug;
});

document.getElementById('categoryForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const name = document.getElementById('category-name').value.trim();
  const slug = document.getElementById('category-slug').value.trim();
  
  try {
    const response = await fetch(`${API_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_PASSWORD}`
      },
      body: JSON.stringify({ name, slug })
    });
    
    if (!response.ok) {
      throw new Error('Failed to create category');
    }
    
    showNotification('Category created successfully!', 'success');
    document.getElementById('categoryForm').reset();
    loadCategories();
    
  } catch (error) {
    console.error('Error creating category:', error);
    showNotification('Error creating category', 'error');
  }
});

async function deleteCategory(slug) {
  if (!confirm('Delete this category? Posts using it will become uncategorized.')) {
    return;
  }
  
  try {
    const response = await fetch(`${API_URL}/categories/${slug}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${ADMIN_PASSWORD}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete category');
    }
    
    showNotification('Category deleted successfully', 'success');
    loadCategories();
    
  } catch (error) {
    console.error('Error deleting category:', error);
    showNotification('Error deleting category', 'error');
  }
}

// ============================================================================
// TAGS MANAGEMENT
// ============================================================================

async function loadTags() {
  try {
    const response = await fetch(`${API_URL}/tags`);
    allTags = await response.json();
    
    renderTagsList();
  } catch (error) {
    console.error('Error loading tags:', error);
    allTags = [];
    renderTagsList();
  }
}

function renderTagsList() {
  const container = document.getElementById('tags-list');
  
  if (allTags.length === 0) {
    container.innerHTML = '<p class="text-gray-500 text-center py-8 w-full">No tags yet. Tags are created when you add them to posts.</p>';
    return;
  }
  
  container.innerHTML = allTags.map(tag => `
    <span class="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors">
      ${tag.name}
      <button onclick="deleteTag('${tag.name}')" 
        class="text-gray-600 hover:text-red-600 font-bold"
        title="Delete tag">×</button>
      <span class="text-xs text-gray-500">(${tag.count || 0})</span>
    </span>
  `).join('');
}

async function deleteTag(tagName) {
  if (!confirm(`Delete tag "${tagName}"? It will be removed from all posts.`)) {
    return;
  }
  
  try {
    const response = await fetch(`${API_URL}/tags/${tagName}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${ADMIN_PASSWORD}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete tag');
    }
    
    showNotification('Tag deleted successfully', 'success');
    loadTags();
    
  } catch (error) {
    console.error('Error deleting tag:', error);
    showNotification('Error deleting tag', 'error');
  }
}

// ============================================================================
// PROFILE MANAGEMENT
// ============================================================================

document.getElementById('profileForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const currentPassword = document.getElementById('current-password').value;
  const newPassword = document.getElementById('new-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  
  // Validate password change if fields are filled
  if (newPassword || confirmPassword) {
    if (currentPassword !== ADMIN_PASSWORD) {
      showNotification('Current password is incorrect', 'error');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      showNotification('New passwords do not match', 'error');
      return;
    }
    
    if (newPassword.length < 8) {
      showNotification('Password must be at least 8 characters', 'error');
      return;
    }
  }
  
  const profileData = {
    name: document.getElementById('profile-name').value,
    email: document.getElementById('profile-email').value,
    bio: document.getElementById('profile-bio').value
  };
  
  if (newPassword) {
    profileData.password = newPassword;
  }
  
  try {
    const response = await fetch(`${API_URL}/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_PASSWORD}`
      },
      body: JSON.stringify(profileData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update profile');
    }
    
    showNotification('Profile updated successfully!', 'success');
    
    // Clear password fields
    document.getElementById('current-password').value = '';
    document.getElementById('new-password').value = '';
    document.getElementById('confirm-password').value = '';
    
  } catch (error) {
    console.error('Error updating profile:', error);
    showNotification('Error updating profile', 'error');
  }
});

// ============================================================================
// NOTIFICATIONS
// ============================================================================

function showNotification(message, type = 'info') {
  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500'
  };
  
  const icons = {
    success: 'fa-check-circle',
    error: 'fa-exclamation-circle',
    info: 'fa-info-circle',
    warning: 'fa-exclamation-triangle'
  };
  
  const notification = document.createElement('div');
  notification.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-3 z-50 animate-slide-in`;
  notification.innerHTML = `
    <i class="fas ${icons[type]}"></i>
    <span>${message}</span>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slide-out 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slide-in {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slide-out {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
  .animate-slide-in { animation: slide-in 0.3s ease-out; }
`;
document.head.appendChild(style);

// ============================================================================
// INITIALIZATION
// ============================================================================

// Load categories on page load for the form
loadCategories();
