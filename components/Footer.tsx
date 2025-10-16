'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <>
      {/* Call to Action Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-r from-primary-600 to-secondary-600">
        {/* Geometric Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cta-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="white"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-pattern)"/>
          </svg>
        </div>
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-secondary-700/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-primary-700/30 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block bg-white/20 backdrop-blur-lg px-6 py-2 rounded-full mb-6 border border-white/30">
            <span className="text-white font-bold uppercase text-sm tracking-wider">Ready to Start?</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Get Your Website Designed<br className="hidden sm:block"/>by <span className="bg-white text-primary-600 px-4 rounded-xl inline-block">Experts</span>
          </h2>
          <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-3xl mx-auto">
            Start your online journey today with affordable web solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).QuoteForm) {
                  (window as any).QuoteForm.open();
                }
              }}
              className="group relative bg-white text-primary-600 px-10 py-5 rounded-2xl font-black text-lg hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-3 transform hover:scale-105"
            >
              <i className="fas fa-paper-plane"></i>
              Request A Quote
              <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </button>
            <a
              href="tel:+918888589767"
              className="group bg-white/10 backdrop-blur-lg border-2 border-white text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-primary-600 transition-all duration-300 inline-flex items-center gap-3 transform hover:scale-105"
            >
              <i className="fas fa-phone-alt"></i>
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300">
        {/* Decorative Top Border */}
        <div className="h-1 bg-gradient-to-r from-primary-500 via-green-400 to-secondary-500"></div>
        
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg relative">
                  <i className="fas fa-code text-white text-xl relative z-10"></i>
                </div>
                <h3 className="text-2xl font-black text-white">Rs999</h3>
              </div>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                Rs999 is subsidiary of Jikut Technologies Pvt. & leading affordable website design company in India. 
                We provide Ecommerce Website, SEO, Digital Marketing, Android App, Domain & Web Hosting services starting from Rs.999.
              </p>
              <div className="flex space-x-3 mt-6">
                <a href="https://www.facebook.com/rs999india/" target="_blank" rel="noopener noreferrer" aria-label="Visit Rs999 on Facebook" className="group relative w-11 h-11 bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl flex items-center justify-center hover:from-primary-600 hover:to-primary-700 transition-all duration-300 transform hover:scale-110 shadow-lg">
                  <i className="fab fa-facebook-f text-gray-300 group-hover:text-white transition-colors relative z-10"></i>
                </a>
                <a href="https://twitter.com/Rs999india" target="_blank" rel="noopener noreferrer" aria-label="Visit Rs999 on Twitter" className="group relative w-11 h-11 bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl flex items-center justify-center hover:from-secondary-600 hover:to-secondary-700 transition-all duration-300 transform hover:scale-110 shadow-lg">
                  <i className="fab fa-twitter text-gray-300 group-hover:text-white transition-colors relative z-10"></i>
                </a>
                <a href="https://instagram.com/rs999india" target="_blank" rel="noopener noreferrer" aria-label="Visit Rs999 on Instagram" className="group relative w-11 h-11 bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl flex items-center justify-center hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-110 shadow-lg">
                  <i className="fab fa-instagram text-gray-300 group-hover:text-white transition-colors relative z-10"></i>
                </a>
                <a href="https://www.youtube.com/channel/UC-VnPbq_hHDqmygf2uen6Zw" target="_blank" rel="noopener noreferrer" aria-label="Visit Rs999 on YouTube" className="group relative w-11 h-11 bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl flex items-center justify-center hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-110 shadow-lg">
                  <i className="fab fa-youtube text-gray-300 group-hover:text-white transition-colors relative z-10"></i>
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white text-lg font-bold mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full"></div>
                Services
              </h4>
              <ul className="space-y-3">
                <li><Link href="/services" className="group flex items-center gap-2 hover:text-primary-400 transition-all duration-300">
                  <i className="fas fa-chevron-right text-xs text-primary-500 group-hover:translate-x-1 transition-transform"></i>
                  Website Designing
                </Link></li>
                <li><Link href="/services" className="group flex items-center gap-2 hover:text-primary-400 transition-all duration-300">
                  <i className="fas fa-chevron-right text-xs text-primary-500 group-hover:translate-x-1 transition-transform"></i>
                  Web App Development
                </Link></li>
                <li><Link href="/services" className="group flex items-center gap-2 hover:text-primary-400 transition-all duration-300">
                  <i className="fas fa-chevron-right text-xs text-primary-500 group-hover:translate-x-1 transition-transform"></i>
                  Mobile App Development
                </Link></li>
                <li><Link href="/services" className="group flex items-center gap-2 hover:text-primary-400 transition-all duration-300">
                  <i className="fas fa-chevron-right text-xs text-primary-500 group-hover:translate-x-1 transition-transform"></i>
                  Digital Marketing
                </Link></li>
                <li><Link href="/services" className="group flex items-center gap-2 hover:text-primary-400 transition-all duration-300">
                  <i className="fas fa-chevron-right text-xs text-primary-500 group-hover:translate-x-1 transition-transform"></i>
                  Graphic Design
                </Link></li>
                <li><Link href="/services" className="group flex items-center gap-2 hover:text-primary-400 transition-all duration-300">
                  <i className="fas fa-chevron-right text-xs text-primary-500 group-hover:translate-x-1 transition-transform"></i>
                  Maintenance Services
                </Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white text-lg font-bold mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full"></div>
                Contact
              </h4>
              <ul className="space-y-4 text-sm">
                <li className="group flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:from-primary-500 group-hover:to-secondary-500 transition-all duration-300 relative">
                    <i className="fas fa-map-marker-alt text-primary-400 group-hover:text-white relative z-10"></i>
                  </div>
                  <a href="https://maps.app.goo.gl/y6E3dtE9enwjxPpQ8" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors pt-2">
                    Manjari BK, Pune, MH India
                  </a>
                </li>
                <li className="group flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:from-primary-500 group-hover:to-secondary-500 transition-all duration-300 relative">
                    <i className="fas fa-envelope text-primary-400 group-hover:text-white relative z-10"></i>
                  </div>
                  <a href="mailto:sales@jikut.com" className="hover:text-primary-400 transition-colors">sales@jikut.com</a>
                </li>
                <li className="group flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:from-primary-500 group-hover:to-secondary-500 transition-all duration-300 relative">
                    <i className="fas fa-phone-alt text-primary-400 group-hover:text-white relative z-10"></i>
                  </div>
                  <a href="tel:+918888589767" className="hover:text-primary-400 transition-colors">+91 8888 589767</a>
                </li>
                <li className="group flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:from-primary-500 group-hover:to-secondary-500 transition-all duration-300 relative">
                    <i className="fas fa-clock text-primary-400 group-hover:text-white relative z-10"></i>
                  </div>
                  <span className="pt-2">Mon to Sat<br/>10:00 am to 06:00 pm</span>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-white text-lg font-bold mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full"></div>
                Resources
              </h4>
              <ul className="space-y-3">
                <li><Link href="/blog" className="group flex items-center gap-2 hover:text-primary-400 transition-all duration-300">
                  <i className="fas fa-chevron-right text-xs text-primary-500 group-hover:translate-x-1 transition-transform"></i>
                  Blog
                </Link></li>
                <li><Link href="/portfolio" className="group flex items-center gap-2 hover:text-primary-400 transition-all duration-300">
                  <i className="fas fa-chevron-right text-xs text-primary-500 group-hover:translate-x-1 transition-transform"></i>
                  Portfolio
                </Link></li>
                <li><Link href="/about-us" className="group flex items-center gap-2 hover:text-primary-400 transition-all duration-300">
                  <i className="fas fa-chevron-right text-xs text-primary-500 group-hover:translate-x-1 transition-transform"></i>
                  About Us
                </Link></li>
                <li><Link href="/contact" className="group flex items-center gap-2 hover:text-primary-400 transition-all duration-300">
                  <i className="fas fa-chevron-right text-xs text-primary-500 group-hover:translate-x-1 transition-transform"></i>
                  Contact Us
                </Link></li>
                <li><Link href="/payment-options" className="group flex items-center gap-2 hover:text-primary-400 transition-all duration-300">
                  <i className="fas fa-chevron-right text-xs text-primary-500 group-hover:translate-x-1 transition-transform"></i>
                  Payment Options
                </Link></li>
                <li><Link href="/guest-post" className="group flex items-center gap-2 hover:text-primary-400 transition-all duration-300">
                  <i className="fas fa-chevron-right text-xs text-primary-500 group-hover:translate-x-1 transition-transform"></i>
                  Guest Post
                </Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800/50 bg-gray-950">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm">
              <p className="text-gray-400 mb-4 md:mb-0">
                <i className="far fa-copyright text-primary-500"></i> 2025 <span className="font-bold text-white">Rs999 Web Services</span> • All Rights Reserved.
              </p>
              <div className="flex flex-wrap gap-6 justify-center">
                <Link href="/privacy-policy" className="text-gray-400 hover:text-primary-400 transition-colors hover:underline">Privacy Policy</Link>
                <Link href="/refund-policy" className="text-gray-400 hover:text-primary-400 transition-colors hover:underline">Refund Policy</Link>
                <Link href="/terms-conditions" className="text-gray-400 hover:text-primary-400 transition-colors hover:underline">Terms & Conditions</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
