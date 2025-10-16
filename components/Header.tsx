'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about-us' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-all"></div>
              <div className="relative w-16 h-16 bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-all">
                <span className="text-3xl font-black text-white">RS</span>
              </div>
            </div>
            <div>
              <div className="text-3xl font-black">
                <span className="text-gray-900"></span>
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  999
                </span>
              </div>
              <div className="text-xs text-gray-500 font-bold uppercase tracking-widest -mt-1">
                Web Services
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary-600 font-bold text-base transition-all relative group"
              >
                {item.name}
                <span className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 group-hover:w-full transition-all rounded-full"></span>
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="tel:+918888589767"
              className="px-6 py-3 border-2 border-primary-600 text-primary-600 font-bold rounded-full hover:bg-primary-50 transition-all transform hover:scale-105 flex items-center space-x-2"
            >
              <i className="fas fa-phone"></i>
              <span>Call Now</span>
            </a>
            <button
              onClick={() => {
                // Will be connected to QuoteFormPopup
                if (typeof window !== 'undefined' && (window as any).QuoteForm) {
                  (window as any).QuoteForm.open();
                }
              }}
              className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold rounded-full hover:shadow-2xl transition-all transform hover:scale-105 flex items-center space-x-2"
            >
              <i className="fas fa-paper-plane"></i>
              <span>Get Quote</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-300 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-3 text-gray-700 hover:text-primary-600 font-bold rounded-lg hover:bg-primary-50 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (typeof window !== 'undefined' && (window as any).QuoteForm) {
                    (window as any).QuoteForm.open();
                  }
                }}
                className="w-full px-4 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold rounded-full text-center flex items-center justify-center space-x-2"
              >
                <i className="fas fa-paper-plane"></i>
                <span>Get Free Quote</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
