// Main JavaScript for interactive features

// Advanced Intersection Observer for animations
const createObserver = (elements, animationClass = 'fade-in-up') => {
  const options = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add(animationClass);
          entry.target.style.opacity = '1';
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, options);

  elements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
};

// FAQ Accordion with smooth animation
document.addEventListener('DOMContentLoaded', () => {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const icon = question.querySelector('i');
      
      // Toggle current FAQ with slide animation
      if (answer.classList.contains('hidden')) {
        answer.classList.remove('hidden');
        answer.style.maxHeight = '0px';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.5s ease-out';
        setTimeout(() => {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }, 10);
      } else {
        answer.style.maxHeight = '0px';
        setTimeout(() => {
          answer.classList.add('hidden');
        }, 500);
      }
      
      icon.classList.toggle('rotate-180');
      icon.style.transition = 'transform 0.3s ease';
      
      // Close other FAQs
      faqQuestions.forEach(otherQuestion => {
        if (otherQuestion !== question) {
          const otherAnswer = otherQuestion.nextElementSibling;
          const otherIcon = otherQuestion.querySelector('i');
          if (!otherAnswer.classList.contains('hidden')) {
            otherAnswer.style.maxHeight = '0px';
            setTimeout(() => {
              otherAnswer.classList.add('hidden');
            }, 500);
            otherIcon.classList.remove('rotate-180');
          }
        }
      });
    });
  });

  // Animate elements on scroll
  const animatedCards = document.querySelectorAll('.card');
  const animatedSections = document.querySelectorAll('section > div > div');
  
  if (animatedCards.length) createObserver(animatedCards);
  if (animatedSections.length) createObserver(animatedSections);

  // Counter animation for stats
  const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        element.textContent = target.toLocaleString() + (element.dataset.suffix || '');
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(start).toLocaleString() + (element.dataset.suffix || '');
      }
    }, 16);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll('[data-count]');
        statNumbers.forEach(stat => {
          const target = parseInt(stat.dataset.count);
          animateCounter(stat, target);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) statsObserver.observe(statsSection);
});

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href !== '') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.card, section > div');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// Form validation and handling (if contact form exists)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.name || !data.email || !data.message) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }
    
    // Show success message
    showNotification('Thank you! We will get back to you soon.', 'success');
    contactForm.reset();
  });
}

// Notification function
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `fixed top-20 right-4 z-50 px-6 py-4 rounded-lg shadow-2xl transform transition-all duration-300 ${
    type === 'success' ? 'bg-green-500' : 'bg-red-500'
  } text-white font-semibold`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Lazy loading for images
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src || img.src;
  });
} else {
  // Fallback for browsers that don't support lazy loading
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}

// Add active class to current page nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  if (link.getAttribute('href').includes(currentPage)) {
    link.classList.add('text-primary-600', 'font-bold');
  }
});
