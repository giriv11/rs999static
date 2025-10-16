// WordPress API Response Types

export interface WPRendered {
  rendered: string;
  protected?: boolean;
}

export interface WPImage {
  id: number;
  url: string;
  alt: string;
  width: number;
  height: number;
  mime_type: string;
  source_url: string;
}

export interface YoastHeadJSON {
  title: string;
  description: string;
  robots?: {
    index: string;
    follow: string;
    'max-snippet': string;
    'max-image-preview': string;
    'max-video-preview': string;
  };
  canonical?: string;
  og_locale?: string;
  og_type?: string;
  og_title?: string;
  og_description?: string;
  og_url?: string;
  og_site_name?: string;
  og_image?: Array<{
    url: string;
    width: number;
    height: number;
    type: string;
  }>;
  twitter_card?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  twitter_site?: string;
  schema?: Record<string, unknown>;
}

export interface WPPage {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: WPRendered;
  content: WPRendered;
  excerpt: WPRendered;
  author: number;
  featured_media: number;
  parent: number;
  menu_order: number;
  comment_status: string;
  ping_status: string;
  template: string;
  meta: Record<string, unknown>;
  yoast_head?: string;
  yoast_head_json?: YoastHeadJSON;
  acf?: Record<string, unknown>;
  _embedded?: {
    'wp:featuredmedia'?: WPMedia[];
    author?: Array<{
      id: number;
      name: string;
      url: string;
      description: string;
      avatar_urls: Record<string, string>;
    }>;
      'wp:term'?: unknown[][];
  };
}

export interface WPPost extends WPPage {
  categories: number[];
  tags: number[];
  sticky: boolean;
  format: string;
}

export interface WPCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
  meta: Record<string, any>;
}

export interface WPTag {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  meta: Record<string, any>;
}

export interface WPMedia {
  id: number;
  date: string;
  slug: string;
  type: string;
  link: string;
  title: WPRendered;
  author: number;
  caption: WPRendered;
  alt_text: string;
  media_type: string;
  mime_type: string;
  source_url: string;
  media_details: {
    width: number;
    height: number;
    file: string;
    sizes: Record<string, {
      file: string;
      width: number;
      height: number;
      mime_type: string;
      source_url: string;
    }>;
  };
}

// Custom Post Types (add as needed)
export interface WPService extends WPPage {
  // Add service-specific fields from ACF
  acf?: {
    price?: string;
    features?: string[];
    icon?: string;
    duration?: string;
  };
}

export interface WPTestimonial extends WPPage {
  acf?: {
    client_name?: string;
    client_company?: string;
    client_image?: string;
    rating?: number;
  };
}

// API Response wrapper
export interface WPAPIResponse<T> {
  data: T[];
  total: number;
  totalPages: number;
}

// Perfex CRM Types
export interface PerfexLead {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  title?: string;
  description?: string;
  source?: string;
  status?: number;
  assigned?: number;
}

export interface PerfexResponse {
  success: boolean;
  message?: string;
  id?: number;
}
