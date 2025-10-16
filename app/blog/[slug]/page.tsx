import Link from 'next/link';
export const dynamic = 'force-dynamic';
import { notFound } from 'next/navigation';
import { getPostBySlug, getPosts, formatDate, getReadingTime } from '@/lib/wordpress';
import type { Metadata } from 'next';

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const yoast = post.yoast_head_json;
  
  return {
    title: yoast?.title || post.title.rendered,
    description: yoast?.description || post.excerpt?.rendered?.replace(/<[^>]*>/g, ''),
    openGraph: {
      title: yoast?.og_title || post.title.rendered,
      description: yoast?.og_description || post.excerpt?.rendered?.replace(/<[^>]*>/g, ''),
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: [post._embedded?.author?.[0]?.name || 'Rs999'],
      images: yoast?.og_image ? [{ url: yoast.og_image[0].url }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: yoast?.twitter_title || post.title.rendered,
      description: yoast?.twitter_description || post.excerpt?.rendered?.replace(/<[^>]*>/g, ''),
      images: yoast?.twitter_image || yoast?.og_image?.[0]?.url,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const categories = post._embedded?.['wp:term']?.[0] || [];
  const author = post._embedded?.author?.[0];

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="relative py-20 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
        {/* Featured Image Background */}
        {featuredImage && (
          <div className="absolute inset-0 opacity-20">
            <img
              src={featuredImage}
              alt={post.title.rendered}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
          </div>
        )}

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <i className="fas fa-chevron-right text-xs"></i>
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <i className="fas fa-chevron-right text-xs"></i>
              <span className="text-white">Current Post</span>
            </nav>

            {/* Categories */}
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((category: any) => (
                  <Link
                    key={category.id}
                    href={`/blog/category/${category.slug}`}
                    className="px-3 py-1 bg-primary-600 text-white rounded-full text-sm font-semibold hover:bg-primary-700 transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-poppins">
              {post.title.rendered}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-gray-300">
              {author && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-full flex items-center justify-center text-white font-bold">
                    {author.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{author.name}</div>
                    <div className="text-sm text-gray-400">Author</div>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2">
                <i className="fas fa-calendar-alt"></i>
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-clock"></i>
                <span>{getReadingTime(post.content.rendered)} min read</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Post Content */}
          <div
            className="wp-content prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />

          {/* Tags */}
          {(post._embedded?.['wp:term']?.[1]?.length ?? 0) > 0 && (
            <div className="mt-12 pt-8 border-t">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {post._embedded?.['wp:term']?.[1]?.map((tag: any) => (
                  <span
                    key={tag.id}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Back to Blog */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center text-primary-600 font-semibold hover:gap-3 transition-all"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Blog
          </Link>
        </div>
      </div>
    </article>
  );
}
