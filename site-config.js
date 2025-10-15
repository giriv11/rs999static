/**
 * Rs999 Site Configuration
 * Universal settings for the entire website
 * Update these values and they will reflect across all pages
 */

const SITE_CONFIG = {
  // Company Information
  company: {
    name: "Rs999 Web Services",
    tagline: "Affordable Website Design & Development",
    description: "India's #1 Low Cost Website Design & Development Company",
    foundedYear: "2015"
  },

  // Contact Information
  contact: {
    phone: "+91 8888 589767",
    phoneDisplay: "+91 8888 589767",
    email: "sales@jikut.com",
    supportEmail: "support@jikut.com",
    address: {
      street: "Manjari BK",
      city: "Pune",
      state: "Maharashtra",
      country: "India",
      zipCode: "412307",
      googleMapsLink: "https://maps.app.goo.gl/y6E3dtE9enwjxPpQ8"
    },
    workingHours: {
      days: "Monday to Saturday",
      time: "10:00 AM to 06:00 PM",
      timezone: "IST (Indian Standard Time)"
    }
  },

  // Social Media Links
  social: {
    facebook: "https://www.facebook.com/rs999india/",
    twitter: "https://twitter.com/Rs999india",
    instagram: "https://instagram.com/rs999india",
    youtube: "https://www.youtube.com/channel/UC-VnPbq_hHDqmygf2uen6Zw",
    linkedin: "https://www.linkedin.com/company/rs999-web-services/",
    whatsapp: "https://wa.me/918888589767?text=I'm%20inquiring%20about%20website%20designing"
  },

  // Website URLs
  urls: {
    main: "https://www.rs999.in",
    blog: "https://www.rs999.in/pages/blog.html",
    cdn: "https://www.rs999.in" // For images and assets
  },

  // SEO Default Settings
  seo: {
    defaultTitle: "Rs999 Web Services | Affordable Website Design Company",
    defaultDescription: "India's #1 Low Cost Website Design & Development Company! Rs999 offers professional websites starting from ₹3599 with domain, hosting, email & SSL included",
    defaultKeywords: "website design, web development, affordable websites, cheap web design, India",
    ogImage: "https://www.rs999.in/wp-content/uploads/2023/03/Rs999-Web-Services-team-blog-profile-picture.jpg",
    twitterHandle: "@Rs999india",
    fbAppId: "" // Add if you have Facebook App ID
  },

  // Analytics & Tracking
  analytics: {
    googleAnalyticsId: "G-PKX2SEY7ZL",
    googleSiteVerification: "l7Oq1CGoY58la1UETyIkXQ68uZkcP5EgBna8TySG7ak",
    bingVerification: "8EBA27786D9F66B981AA38FEC4B83BFD",
    yandexVerification: "3c4633d5cb9be755",
    pinterestVerification: "cae3c6143ebf58d21edc856dace4e222"
  },

  // Business Details
  business: {
    type: "Web Design & Development Company",
    categories: ["Web Design", "Web Development", "SEO", "Digital Marketing", "Mobile App Development"],
    serviceAreas: ["India", "USA", "UK", "Australia", "UAE"],
    languages: ["English", "Hindi", "Marathi"],
    paymentMethods: ["Credit Card", "Debit Card", "Net Banking", "UPI", "PayPal", "Bank Transfer"]
  },

  // Pricing
  pricing: {
    startingPrice: "₹3599",
    currency: "INR",
    currencySymbol: "₹",
    usdEquivalent: "$99"
  }
};

// Make config globally available
if (typeof window !== 'undefined') {
  window.SITE_CONFIG = SITE_CONFIG;
}

// For Node.js environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SITE_CONFIG;
}
