'use client';

import Link from 'next/link';
import { getPageBySlug, getRecentPosts } from '@/lib/wordpress';

export default async function HomePage() {
  // Fetch homepage content from WordPress (optional - can be static for now)
  // const homeContent = await getPageBySlug('home');
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Floating shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-primary-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-8 animate-fade-in-up">
              <i className="fas fa-star text-yellow-300"></i>
              <span>Trusted by 500+ Businesses</span>
            </div>

            {/* Main heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-up font-poppins" style={{animationDelay: '0.1s'}}>
              Professional Website Design
              <span className="block mt-2 text-yellow-300">Starting at ₹999/month</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Transform your business with stunning websites, powerful web apps, and effective digital marketing solutions
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
                <i className="fas fa-check-circle text-green-300"></i>
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
                <i className="fas fa-check-circle text-green-300"></i>
                <span>SEO Optimized</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
                <i className="fas fa-check-circle text-green-300"></i>
                <span>Mobile Responsive</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
                <i className="fas fa-check-circle text-green-300"></i>
                <span>24/7 Support</span>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <button 
                onClick={() => (window as any).QuoteForm?.open()}
                className="btn-primary text-lg px-8 py-4 bg-white text-primary-600 hover:bg-gray-50 shadow-2xl"
              >
                <i className="fas fa-rocket mr-2"></i>
                Get Started Now
              </button>
              <Link 
                href="/portfolio" 
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-lg hover:bg-white/20 transition-all duration-300"
              >
                <i className="fas fa-briefcase mr-2"></i>
                View Portfolio
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/80 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
              <div className="flex items-center gap-2">
                <i className="fas fa-shield-alt text-green-300"></i>
                <span className="text-sm">100% Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-clock text-blue-300"></i>
                <span className="text-sm">Quick Turnaround</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-headset text-purple-300"></i>
                <span className="text-sm">Dedicated Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <i className="fas fa-chevron-down text-white text-2xl"></i>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2 font-poppins">500+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2 font-poppins">1000+</div>
              <div className="text-gray-600">Projects Done</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2 font-poppins">50+</div>
              <div className="text-gray-600">Team Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2 font-poppins">7+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-primary-50 text-primary-600 rounded-full text-sm font-semibold mb-4">
              Our Services
            </div>
            <h2 className="section-heading">What We Offer</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-4">
              Comprehensive digital solutions to grow your business online
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Service 1 */}
            <div className="card group">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-laptop-code text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 font-poppins">Website Design</h3>
              <p className="text-gray-600 mb-4">
                Stunning, responsive websites that convert visitors into customers. Mobile-first design with perfect SEO.
              </p>
              <Link href="/services/website-design" className="inline-flex items-center text-primary-600 font-semibold hover:gap-2 transition-all">
                Learn More <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>

            {/* Service 2 */}
            <div className="card group">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-code text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 font-poppins">Web Applications</h3>
              <p className="text-gray-600 mb-4">
                Custom web apps built with modern technologies. Scalable, secure, and user-friendly solutions.
              </p>
              <Link href="/services/web-app" className="inline-flex items-center text-primary-600 font-semibold hover:gap-2 transition-all">
                Learn More <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>

            {/* Service 3 */}
            <div className="card group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-mobile-alt text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 font-poppins">Mobile Apps</h3>
              <p className="text-gray-600 mb-4">
                Native and cross-platform mobile apps for iOS & Android. Smooth performance and great UX.
              </p>
              <Link href="/services/mobile-app" className="inline-flex items-center text-primary-600 font-semibold hover:gap-2 transition-all">
                Learn More <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>

            {/* Service 4 */}
            <div className="card group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-bullhorn text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 font-poppins">Digital Marketing</h3>
              <p className="text-gray-600 mb-4">
                SEO, social media marketing, and paid ads to boost your online presence and drive traffic.
              </p>
              <Link href="/services/digital-marketing" className="inline-flex items-center text-primary-600 font-semibold hover:gap-2 transition-all">
                Learn More <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>

            {/* Service 5 */}
            <div className="card group">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-palette text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 font-poppins">Graphic Design</h3>
              <p className="text-gray-600 mb-4">
                Professional logos, branding, and marketing materials that make your business stand out.
              </p>
              <Link href="/services/graphic-design" className="inline-flex items-center text-primary-600 font-semibold hover:gap-2 transition-all">
                Learn More <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>

            {/* Service 6 */}
            <div className="card group">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-tools text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 font-poppins">Maintenance</h3>
              <p className="text-gray-600 mb-4">
                Regular updates, security patches, and technical support to keep your website running smoothly.
              </p>
              <Link href="/services/maintenance" className="inline-flex items-center text-primary-600 font-semibold hover:gap-2 transition-all">
                Learn More <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-primary-50 text-primary-600 rounded-full text-sm font-semibold mb-4">
              Why Choose Us
            </div>
            <h2 className="section-heading">Why Rs999 is Different</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-4">
              We combine affordability with quality to deliver exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <i className="fas fa-dollar-sign text-3xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-poppins">Affordable Pricing</h3>
              <p className="text-gray-600">Premium services starting at just ₹999/month</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <i className="fas fa-rocket text-3xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-poppins">Fast Delivery</h3>
              <p className="text-gray-600">Quick turnaround without compromising quality</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <i className="fas fa-users text-3xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-poppins">Expert Team</h3>
              <p className="text-gray-600">50+ skilled professionals at your service</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <i className="fas fa-headset text-3xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-poppins">24/7 Support</h3>
              <p className="text-gray-600">Always here to help with your needs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-primary-50 text-primary-600 rounded-full text-sm font-semibold mb-4">
              Our Process
            </div>
            <h2 className="section-heading">How We Work</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-4">
              Simple, transparent, and effective process from start to finish
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { step: '01', icon: 'comments', title: 'Consultation', desc: 'Discuss your requirements and goals' },
              { step: '02', icon: 'pencil-ruler', title: 'Planning', desc: 'Create detailed project roadmap' },
              { step: '03', icon: 'code', title: 'Development', desc: 'Build your solution with best practices' },
              { step: '04', icon: 'check-circle', title: 'Delivery', desc: 'Launch and provide ongoing support' }
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="text-center">
                  <div className="relative inline-block mb-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-full flex items-center justify-center shadow-xl">
                      <i className={`fas fa-${item.icon} text-3xl text-white`}></i>
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-gray-900 shadow-lg">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-poppins">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary-300 to-secondary-300 -translate-x-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-primary-600 text-white rounded-full text-sm font-semibold mb-4">
              Testimonials
            </div>
            <h2 className="section-heading">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-4">
              Don&apos;t just take our word for it - hear from our satisfied clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: 'Rajesh Kumar',
                role: 'Business Owner',
                text: 'Rs999 transformed our online presence. The website is beautiful and our sales have increased by 200%!',
                rating: 5
              },
              {
                name: 'Priya Sharma',
                role: 'Startup Founder',
                text: 'Excellent service and very affordable. They delivered our mobile app ahead of schedule with amazing quality.',
                rating: 5
              },
              {
                name: 'Amit Patel',
                role: 'Marketing Manager',
                text: 'Professional team, great communication, and outstanding results. Highly recommended for digital marketing!',
                rating: 5
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="card bg-white">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <i key={i} className="fas fa-star text-yellow-400"></i>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">&quot;{testimonial.text}&quot;</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cta-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-pattern)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-poppins">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Get started today with our affordable web solutions. No hidden fees, no long-term contracts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => (window as any).QuoteForm?.open()}
                className="btn-primary text-lg px-8 py-4 bg-white text-primary-600 hover:bg-gray-50 shadow-2xl"
              >
                <i className="fas fa-paper-plane mr-2"></i>
                Get Free Quote
              </button>
              <a 
                href="tel:+918888589767"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-lg hover:bg-white/20 transition-all duration-300"
              >
                <i className="fas fa-phone mr-2"></i>
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
