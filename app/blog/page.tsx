import Link from 'next/link';
export const dynamic = 'force-dynamic';
import { getPosts, getCategories } from '@/lib/wordpress';
import { formatDate, getReadingTime } from '@/lib/wordpress';

export const metadata = {
  title: 'Blog - Latest Articles & Insights | Rs999',
  description: 'Read our latest articles about web design, development, digital marketing, and technology trends. Expert insights from Rs999 team.',
};

export default async function BlogPage() {
  const posts = await getPosts({ per_page: 12 });
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-6">
              <i className="fas fa-blog mr-2"></i>
              Our Blog
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-poppins">
              Latest Articles & Insights
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Stay updated with the latest trends in web design, development, and digital marketing
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              <Link 
                href="/blog"
                className="px-4 py-2 bg-primary-600 text-white rounded-full text-sm font-medium hover:bg-primary-700 transition-colors"
              >
                All Posts
              </Link>
              {categories.slice(0, 6).map((category) => (
                <Link
                  key={category.id}
                  href={`/blog/category/${category.slug}`}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-primary-50 hover:text-primary-600 transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <i className="fas fa-inbox text-6xl text-gray-300 mb-4"></i>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No posts yet</h3>
              <p className="text-gray-600">Check back soon for new content!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {posts.map((post) => (
                <article key={post.id} className="card group">
                  {/* Featured Image */}
                  {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                    <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-xl">
                      <img
                        src={post._embedded['wp:featuredmedia'][0].source_url}
                        alt={post.title.rendered}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                  )}

                  {/* Categories */}
                  {post._embedded?.['wp:term']?.[0] && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post._embedded?.['wp:term']?.[0]?.slice(0, 2).map((category: any) => (
                        <span
                          key={category.id}
                          className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-xs font-semibold"
                        >
                          {category.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-900 mb-3 font-poppins group-hover:text-primary-600 transition-colors line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title.rendered}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  {post.excerpt?.rendered && (
                    <div
                      className="text-gray-600 mb-4 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    />
                  )}

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <i className="fas fa-calendar-alt"></i>
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fas fa-clock"></i>
                      <span>{getReadingTime(post.content.rendered)} min read</span>
                    </div>
                  </div>

                  {/* Read More */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-primary-600 font-semibold mt-4 hover:gap-2 transition-all"
                  >
                    Read More <i className="fas fa-arrow-right ml-2"></i>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-poppins">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Get a free consultation and quote for your next web project
            </p>
            <button
              onClick={() => (window as any).QuoteForm?.open()}
              className="btn-primary text-lg px-8 py-4"
            >
              <i className="fas fa-paper-plane mr-2"></i>
              Get Free Quote
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
