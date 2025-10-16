import { WPPage, WPPost, WPCategory, WPTag, WPMedia } from './types';

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://rs999.in/wp-json';

/**
 * Generic fetch function with error handling and caching
 */
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${WORDPRESS_API_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    // Cache for 1 hour by default (ISR)
    next: { revalidate: 3600 },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
      throw new Error(
        `WordPress API error: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching from WordPress API: ${url}`, error);
    throw error;
  }
}

// ======================
// PAGES
// ======================

/**
 * Get all pages
 */
export async function getPages(params: {
  per_page?: number;
  page?: number;
  orderby?: string;
  order?: 'asc' | 'desc';
} = {}): Promise<WPPage[]> {
  const queryParams = new URLSearchParams({
    _embed: 'true',
    per_page: String(params.per_page || 100),
    page: String(params.page || 1),
    orderby: params.orderby || 'date',
    order: params.order || 'desc',
  });

  return fetchAPI<WPPage[]>(`/wp/v2/pages?${queryParams}`);
}

/**
 * Get a single page by slug
 */
export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  const pages = await fetchAPI<WPPage[]>(`/wp/v2/pages?slug=${slug}&_embed=true`);
  return pages[0] || null;
}

/**
 * Get a single page by ID
 */
export async function getPageById(id: number): Promise<WPPage> {
  return fetchAPI<WPPage>(`/wp/v2/pages/${id}?_embed=true`);
}

// ======================
// POSTS
// ======================

/**
 * Get all posts
 */
export async function getPosts(params: {
  per_page?: number;
  page?: number;
  categories?: number[];
  tags?: number[];
  orderby?: string;
  order?: 'asc' | 'desc';
  search?: string;
} = {}): Promise<WPPost[]> {
  const queryParams = new URLSearchParams({
    _embed: 'true',
    per_page: String(params.per_page || 10),
    page: String(params.page || 1),
    orderby: params.orderby || 'date',
    order: params.order || 'desc',
  });

  if (params.categories) {
    queryParams.append('categories', params.categories.join(','));
  }
  if (params.tags) {
    queryParams.append('tags', params.tags.join(','));
  }
  if (params.search) {
    queryParams.append('search', params.search);
  }

  return fetchAPI<WPPost[]>(`/wp/v2/posts?${queryParams}`);
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const posts = await fetchAPI<WPPost[]>(`/wp/v2/posts?slug=${slug}&_embed=true`);
  return posts[0] || null;
}

/**
 * Get a single post by ID
 */
export async function getPostById(id: number): Promise<WPPost> {
  return fetchAPI<WPPost>(`/wp/v2/posts/${id}?_embed=true`);
}

/**
 * Get recent posts
 */
export async function getRecentPosts(limit: number = 5): Promise<WPPost[]> {
  return getPosts({ per_page: limit, orderby: 'date', order: 'desc' });
}

// ======================
// CATEGORIES
// ======================

/**
 * Get all categories
 */
export async function getCategories(): Promise<WPCategory[]> {
  return fetchAPI<WPCategory[]>('/wp/v2/categories?per_page=100');
}

/**
 * Get a single category by slug
 */
export async function getCategoryBySlug(slug: string): Promise<WPCategory | null> {
  const categories = await fetchAPI<WPCategory[]>(`/wp/v2/categories?slug=${slug}`);
  return categories[0] || null;
}

// ======================
// TAGS
// ======================

/**
 * Get all tags
 */
export async function getTags(): Promise<WPTag[]> {
  return fetchAPI<WPTag[]>('/wp/v2/tags?per_page=100');
}

/**
 * Get a single tag by slug
 */
export async function getTagBySlug(slug: string): Promise<WPTag | null> {
  const tags = await fetchAPI<WPTag[]>(`/wp/v2/tags?slug=${slug}`);
  return tags[0] || null;
}

// ======================
// MEDIA
// ======================

/**
 * Get media by ID
 */
export async function getMediaById(id: number): Promise<WPMedia> {
  return fetchAPI<WPMedia>(`/wp/v2/media/${id}`);
}

/**
 * Get featured image URL from post/page
 */
export function getFeaturedImageUrl(item: WPPage | WPPost, size: 'thumbnail' | 'medium' | 'large' | 'full' = 'large'): string | null {
  if (!item._embedded?.['wp:featuredmedia']?.[0]) {
    return null;
  }

  const media = item._embedded['wp:featuredmedia'][0];
  
  if (size === 'full') {
    return media.source_url;
  }

  return media.media_details?.sizes?.[size]?.source_url || media.source_url;
}

// ======================
// CUSTOM POST TYPES
// ======================

/**
 * Get custom post type items (generic)
 */
export async function getCustomPostType<T>(
  postType: string,
  params: {
    per_page?: number;
    page?: number;
    orderby?: string;
    order?: 'asc' | 'desc';
  } = {}
): Promise<T[]> {
  const queryParams = new URLSearchParams({
    _embed: 'true',
    per_page: String(params.per_page || 100),
    page: String(params.page || 1),
    orderby: params.orderby || 'date',
    order: params.order || 'desc',
  });

  return fetchAPI<T[]>(`/wp/v2/${postType}?${queryParams}`);
}

/**
 * Get custom post type item by slug
 */
export async function getCustomPostTypeBySlug<T>(
  postType: string,
  slug: string
): Promise<T | null> {
  const items = await fetchAPI<T[]>(`/wp/v2/${postType}?slug=${slug}&_embed=true`);
  return items[0] || null;
}

// ======================
// HELPER FUNCTIONS
// ======================

/**
 * Strip HTML tags from content
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

/**
 * Get excerpt from content
 */
export function getExcerpt(content: string, length: number = 160): string {
  const stripped = stripHtml(content);
  return stripped.length > length
    ? stripped.substring(0, length).trim() + '...'
    : stripped;
}

/**
 * Format date
 */
export function formatDate(dateString: string, locale: string = 'en-US'): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Get reading time (words per minute)
 */
export function getReadingTime(content: string, wpm: number = 200): number {
  const words = stripHtml(content).split(/\s+/).length;
  return Math.ceil(words / wpm);
}

// ======================
// SEARCH
// ======================

/**
 * Search across posts and pages
 */
export async function search(query: string, params: {
  per_page?: number;
  type?: 'post' | 'page' | 'any';
} = {}): Promise<(WPPost | WPPage)[]> {
  const queryParams = new URLSearchParams({
    search: query,
    _embed: 'true',
    per_page: String(params.per_page || 10),
  });

  if (params.type && params.type !== 'any') {
    queryParams.append('type', params.type);
  }

  return fetchAPI<(WPPost | WPPage)[]>(`/wp/v2/search?${queryParams}`);
}

// ======================
// SITEMAP HELPERS
// ======================

/**
 * Get all URLs for sitemap generation
 */
export async function getAllUrls(): Promise<{ loc: string; lastmod: string }[]> {
  const [pages, posts] = await Promise.all([
    getPages(),
    getPosts({ per_page: 100 }),
  ]);

  return [
    ...pages.map((page) => ({
      loc: `/${page.slug}`,
      lastmod: page.modified,
    })),
    ...posts.map((post) => ({
      loc: `/blog/${post.slug}`,
      lastmod: post.modified,
    })),
  ];
}
