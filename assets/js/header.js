// Universal Header Component
function loadHeader() {
  const headerHTML = `
    <!-- Modern Header with Centered Layout -->
    <header class="bg-white shadow-md sticky top-0 z-50">
      <!-- Main Navigation -->
      <nav class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <!-- Logo -->
          <a href="/index.html" class="flex items-center space-x-3 group">
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-all"></div>
              <div class="relative w-16 h-16 bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-all">
                <span class="text-3xl font-black text-white">RS</span>
              </div>
            </div>
            <div>
              <div class="text-3xl font-black">
                <span class="text-gray-900"></span><span class="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">999</span>
              </div>
              <div class="text-xs text-gray-500 font-bold uppercase tracking-widest -mt-1">Web Services</div>
            </div>
          </a>

          <!-- Desktop Navigation -->
          <div class="hidden lg:flex items-center space-x-10">
            <a href="/index.html" class="text-gray-700 hover:text-primary-600 font-bold text-base transition-all relative group">
              Home
              <span class="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 group-hover:w-full transition-all rounded-full"></span>
            </a>
            <a href="/pages/services.html" class="text-gray-700 hover:text-primary-600 font-bold text-base transition-all relative group">
              Services
              <span class="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 group-hover:w-full transition-all rounded-full"></span>
            </a>
            <a href="/pages/portfolio.html" class="text-gray-700 hover:text-primary-600 font-bold text-base transition-all relative group">
              Portfolio
              <span class="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 group-hover:w-full transition-all rounded-full"></span>
            </a>
            <a href="/pages/blog.html" class="text-gray-700 hover:text-primary-600 font-bold text-base transition-all relative group">
              Blog
              <span class="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 group-hover:w-full transition-all rounded-full"></span>
            </a>
            <a href="/pages/about.html" class="text-gray-700 hover:text-primary-600 font-bold text-base transition-all relative group">
              About
              <span class="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 group-hover:w-full transition-all rounded-full"></span>
            </a>
            <a href="/pages/contact.html" class="text-gray-700 hover:text-primary-600 font-bold text-base transition-all relative group">
              Contact
              <span class="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 group-hover:w-full transition-all rounded-full"></span>
            </a>
          </div>

          <!-- CTA Button -->
          <div class="hidden lg:flex items-center space-x-4">
            <a href="tel:+918888589767" class="px-6 py-3 border-2 border-primary-600 text-primary-600 font-bold rounded-full hover:bg-primary-50 transition-all transform hover:scale-105 flex items-center space-x-2">
              <i class="fas fa-phone"></i>
              <span>Call Now</span>
            </a>
            <a href="/pages/contact.html" class="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold rounded-full hover:shadow-2xl transition-all transform hover:scale-105 flex items-center space-x-2">
              <i class="fas fa-rocket"></i>
              <span>Get Started</span>
            </a>
          </div>

          <!-- Mobile Menu Button -->
          <button id="mobile-menu-button" class="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-300 focus:outline-none">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden lg:hidden pb-4">
          <div class="flex flex-col space-y-2">
            <a href="/index.html" class="px-4 py-3 text-gray-700 hover:text-primary-600 font-bold rounded-lg hover:bg-primary-50 transition-all">Home</a>
            <a href="/pages/services.html" class="px-4 py-3 text-gray-700 hover:text-primary-600 font-bold rounded-lg hover:bg-primary-50 transition-all">Services</a>
            <a href="/pages/portfolio.html" class="px-4 py-3 text-gray-700 hover:text-primary-600 font-bold rounded-lg hover:bg-primary-50 transition-all">Portfolio</a>
            <a href="/pages/blog.html" class="px-4 py-3 text-gray-700 hover:text-primary-600 font-bold rounded-lg hover:bg-primary-50 transition-all">Blog</a>
            <a href="/pages/about.html" class="px-4 py-3 text-gray-700 hover:text-primary-600 font-bold rounded-lg hover:bg-primary-50 transition-all">About</a>
            <a href="/pages/contact.html" class="px-4 py-3 text-gray-700 hover:text-primary-600 font-bold rounded-lg hover:bg-primary-50 transition-all">Contact</a>
            <a href="/pages/contact.html" class="px-4 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold rounded-full text-center flex items-center justify-center space-x-2">
              <i class="fas fa-paper-plane"></i>
              <span>Get Free Quote</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  `;

  document.getElementById('header').innerHTML = headerHTML;

  // Mobile menu toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

// Load header when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadHeader);
} else {
  loadHeader();
}
