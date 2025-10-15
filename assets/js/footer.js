// Universal Footer Component
function loadFooter() {
  const footerHTML = `
    <!-- Call to Action Section -->
    <section class="relative py-20 overflow-hidden bg-gradient-to-r from-primary-600 to-secondary-600">
      <!-- Geometric Pattern Background -->
      <div class="absolute inset-0 opacity-10">
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cta-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="white"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-pattern)"/>
        </svg>
      </div>
      <!-- Gradient Overlays -->
      <div class="absolute inset-0">
        <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-secondary-700/30 to-transparent"></div>
        <div class="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-primary-700/30 to-transparent"></div>
      </div>
      
      <div class="container mx-auto px-4 text-center relative z-10">
        <div class="inline-block bg-white/20 backdrop-blur-lg px-6 py-2 rounded-full mb-6 border border-white/30">
          <span class="text-white font-bold uppercase text-sm tracking-wider">Ready to Start?</span>
        </div>
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
          Get Your Website Designed<br>by <span class="bg-white text-primary-600 px-4 rounded-xl inline-block">Experts</span>
        </h2>
        <p class="text-xl md:text-2xl mb-10 text-white/90 max-w-3xl mx-auto">Start your online journey today with affordable web solutions</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="pages/contact.html" class="group relative bg-white text-primary-600 px-10 py-5 rounded-2xl font-black text-lg hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-3 transform hover:scale-105">
            <i class="fas fa-paper-plane"></i>
            Request A Quote
            <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </a>
          <a href="tel:+918888589767" class="group bg-white/10 backdrop-blur-lg border-2 border-white text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-primary-600 transition-all duration-300 inline-flex items-center gap-3 transform hover:scale-105">
            <i class="fas fa-phone-alt"></i>
            Call Now
          </a>
        </div>
      </div>
    </section>

    <!-- Main Footer -->
    <footer class="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      <!-- Decorative Top Border -->
      <div class="h-1 bg-gradient-to-r from-primary-500 via-green-400 to-secondary-500"></div>
      
      <div class="container mx-auto px-4 py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          <!-- Company Info -->
          <div>
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg relative">
                <i class="fas fa-code text-white text-xl relative z-10"></i>
              </div>
              <h3 class="text-2xl font-black text-white">Rs999</h3>
            </div>
            <p class="text-gray-400 mb-6 text-sm leading-relaxed">
              Rs999 is subsidiary of Jikut Technologies Pvt. & leading affordable website design company in India. 
              We provide Ecommerce Website, SEO, Digital Marketing, Android App, Domain & Web Hosting services starting from Rs.999.
            </p>
            <div class="flex space-x-3 mt-6">
              <a href="https://www.facebook.com/rs999india/" target="_blank" rel="noopener" aria-label="Visit Rs999 on Facebook" class="group relative w-11 h-11 bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl flex items-center justify-center hover:from-primary-600 hover:to-primary-700 transition-all duration-300 transform hover:scale-110 shadow-lg">
                <i class="fab fa-facebook-f text-gray-300 group-hover:text-white transition-colors relative z-10"></i>
              </a>
              <a href="https://twitter.com/Rs999india" target="_blank" rel="noopener" aria-label="Visit Rs999 on Twitter" class="group relative w-11 h-11 bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl flex items-center justify-center hover:from-secondary-600 hover:to-secondary-700 transition-all duration-300 transform hover:scale-110 shadow-lg">
                <i class="fab fa-twitter text-gray-300 group-hover:text-white transition-colors relative z-10"></i>
              </a>
              <a href="https://instagram.com/rs999india" target="_blank" rel="noopener" aria-label="Visit Rs999 on Instagram" class="group relative w-11 h-11 bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl flex items-center justify-center hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-110 shadow-lg">
                <i class="fab fa-instagram text-gray-300 group-hover:text-white transition-colors relative z-10"></i>
              </a>
              <a href="https://www.youtube.com/channel/UC-VnPbq_hHDqmygf2uen6Zw" target="_blank" rel="noopener" aria-label="Visit Rs999 on YouTube" class="group relative w-11 h-11 bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl flex items-center justify-center hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-110 shadow-lg">
                <i class="fab fa-youtube text-gray-300 group-hover:text-white transition-colors relative z-10"></i>
              </a>
            </div>
          </div>

          <!-- Services -->
          <div>
            <h4 class="text-white text-lg font-bold mb-6 flex items-center gap-2">
              <div class="w-1 h-6 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full"></div>
              Services
            </h4>
            <ul class="space-y-3">
              <li><a href="pages/services.html" class="group flex items-center gap-2 hover:text-primary-400 transition-all duration-300">
                <i class="fas fa-chevron-right text-xs text-primary-500 group-hover:translate-x-1 transition-transform"></i>
                Website Designing
              </a></li>
              <li><a href="pages/services.html" class="group flex items-center gap-2 hover:text-primary-400 transition-all duration-300">
                <i class="fas fa-chevron-right text-xs text-primary-500 group-hover:translate-x-1 transition-transform"></i>
                Web App Development
              </a></li>
              <li><a href="pages/services.html" class="group flex items-center gap-2 hover:text-primary-400 transition-all duration-300">
                <i class="fas fa-chevron-right text-xs text-primary-500 group-hover:translate-x-1 transition-transform"></i>
                Mobile App Development
              </a></li>
              <li><a href="pages/services.html" class="group flex items-center gap-2 hover:text-primary-400 transition-all duration-300">
                <i class="fas fa-chevron-right text-xs text-primary-500 group-hover:translate-x-1 transition-transform"></i>
                Digital Marketing
              </a></li>
              <li><a href="pages/services.html" class="group flex items-center gap-2 hover:text-primary-400 transition-all duration-300">
                <i class="fas fa-chevron-right text-xs text-primary-500 group-hover:translate-x-1 transition-transform"></i>
                Graphic Design
              </a></li>
              <li><a href="pages/services.html" class="group flex items-center gap-2 hover:text-primary-400 transition-all duration-300">
                <i class="fas fa-chevron-right text-xs text-primary-500 group-hover:translate-x-1 transition-transform"></i>
                Maintenance Services
              </a></li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h4 class="text-white text-lg font-bold mb-6 flex items-center gap-2">
              <div class="w-1 h-6 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full"></div>
              Contact
            </h4>
            <ul class="space-y-4 text-sm">
              <li class="group flex items-start gap-3">
                <div class="w-10 h-10 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:from-primary-500 group-hover:to-secondary-500 transition-all duration-300 relative">
                  <i class="fas fa-map-marker-alt text-primary-400 group-hover:text-white relative z-10"></i>
                </div>
                <a href="https://maps.app.goo.gl/y6E3dtE9enwjxPpQ8" target="_blank" class="hover:text-primary-400 transition-colors pt-2">
                  Manjari BK, Pune, MH India
                </a>
              </li>
              <li class="group flex items-center gap-3">
                <div class="w-10 h-10 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:from-primary-500 group-hover:to-secondary-500 transition-all duration-300 relative">
                  <i class="fas fa-envelope text-primary-400 group-hover:text-white relative z-10"></i>
                </div>
                <a href="mailto:sales@jikut.com" class="hover:text-primary-400 transition-colors">sales@jikut.com</a>
              </li>
              <li class="group flex items-center gap-3">
                <div class="w-10 h-10 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:from-primary-500 group-hover:to-secondary-500 transition-all duration-300 relative">
                  <i class="fas fa-phone-alt text-primary-400 group-hover:text-white relative z-10"></i>
                </div>
                <a href="tel:+918888589767" class="hover:text-primary-400 transition-colors">+91 8888 589767</a>
              </li>
              <li class="group flex items-start gap-3">
                <div class="w-10 h-10 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:from-primary-500 group-hover:to-secondary-500 transition-all duration-300 relative">
                  <i class="fas fa-clock text-primary-400 group-hover:text-white relative z-10"></i>
                </div>
                <span class="pt-2">Mon to Sat<br>10:00 am to 06:00 pm</span>
              </li>
            </ul>
          </div>

          <!-- Resources -->
          <div>
            <h4 class="text-white text-lg font-bold mb-6 flex items-center gap-2">
              <div class="w-1 h-6 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full"></div>
              Resources
            </h4>
            <ul class="space-y-3">
              <li><a href="pages/blog.html" class="group flex items-center gap-2 hover:text-primary-400 transition-all duration-300">
                <i class="fas fa-chevron-right text-xs text-primary-500 group-hover:translate-x-1 transition-transform"></i>
                Blog
              </a></li>
              <li><a href="pages/portfolio.html" class="group flex items-center gap-2 hover:text-primary-400 transition-all duration-300">
                <i class="fas fa-chevron-right text-xs text-primary-500 group-hover:translate-x-1 transition-transform"></i>
                Portfolio
              </a></li>
              <li><a href="pages/about.html" class="group flex items-center gap-2 hover:text-primary-400 transition-all duration-300">
                <i class="fas fa-chevron-right text-xs text-primary-500 group-hover:translate-x-1 transition-transform"></i>
                About Us
              </a></li>
              <li><a href="pages/contact.html" class="group flex items-center gap-2 hover:text-primary-400 transition-all duration-300">
                <i class="fas fa-chevron-right text-xs text-primary-500 group-hover:translate-x-1 transition-transform"></i>
                Contact Us
              </a></li>
              <li><a href="#" class="group flex items-center gap-2 hover:text-primary-400 transition-all duration-300">
                <i class="fas fa-chevron-right text-xs text-primary-500 group-hover:translate-x-1 transition-transform"></i>
                Payment Options
              </a></li>
              <li><a href="#" class="group flex items-center gap-2 hover:text-primary-400 transition-all duration-300">
                <i class="fas fa-chevron-right text-xs text-primary-500 group-hover:translate-x-1 transition-transform"></i>
                Guest Post
              </a></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-800/50 bg-gray-950">
        <div class="container mx-auto px-4 py-6">
          <div class="flex flex-col md:flex-row justify-between items-center text-sm">
            <p class="text-gray-400 mb-4 md:mb-0">
              <i class="far fa-copyright text-primary-500"></i> 2025 <span class="font-bold text-white">Rs999 Web Services</span> • All Rights Reserved.
            </p>
            <div class="flex flex-wrap gap-6 justify-center">
              <a href="#" class="text-gray-400 hover:text-primary-400 transition-colors hover:underline">Privacy Policy</a>
              <a href="#" class="text-gray-400 hover:text-primary-400 transition-colors hover:underline">Refund Policy</a>
              <a href="#" class="text-gray-400 hover:text-primary-400 transition-colors hover:underline">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </div>
    </footer>

    <!-- WhatsApp Floating Button -->
    <a href="https://wa.me/918888589767?text=I'm%20inquiring%20about%20website%20designing" 
       target="_blank"
       rel="noopener"
       aria-label="Chat with us on WhatsApp"
       class="fixed bottom-6 left-6 bg-gradient-to-br from-green-500 to-green-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl hover:shadow-green-500/50 transition-all duration-300 z-50 hover:scale-110 group">
      <i class="fab fa-whatsapp text-3xl group-hover:scale-110 transition-transform relative z-10"></i>
      <div class="absolute inset-0 bg-white rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
    </a>

    <!-- Scroll to Top Button -->
    <button id="scroll-top" 
            class="fixed bottom-24 right-6 bg-primary-600 text-white w-12 h-12 rounded-full items-center justify-center shadow-xl hover:bg-primary-700 transition-all duration-300 z-50 hidden">
      <i class="fas fa-arrow-up"></i>
    </button>
  `;

  document.getElementById('footer').innerHTML = footerHTML;

  // Scroll to top functionality
  const scrollTopBtn = document.getElementById('scroll-top');
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.remove('hidden');
      scrollTopBtn.classList.add('flex');
    } else {
      scrollTopBtn.classList.add('hidden');
      scrollTopBtn.classList.remove('flex');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Tawk.to Chat Widget - Delayed Load for Performance
function loadTawkTo() {
  window.addEventListener('load', function() {
    setTimeout(function() {
      var Tawk_API = Tawk_API || {};
      Tawk_API.visitor = JSON.parse("{\"name\":\"Rs999 Web Services Team\",\"email\":\"info@rs999.in\"}");
      var Tawk_LoadStart = new Date();
      (function(){
        var s1 = document.createElement('script'), s0 = document.getElementsByTagName('script')[0];
        s1.async = true;
        s1.src = 'https://embed.tawk.to/687a0e7386520d191450085b/1j0ecrtbf';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode.insertBefore(s1, s0);
      })();
    }, 2000); // Load after 2 seconds for better performance
  });
}

// Load footer when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    loadFooter();
    loadTawkTo();
  });
} else {
  loadFooter();
  loadTawkTo();
}
