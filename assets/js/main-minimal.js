// Minimal JavaScript - Only what's needed for homepage

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

// Hero Quote Form Handler
document.addEventListener('DOMContentLoaded', () => {
  const heroForm = document.getElementById('heroQuoteForm');
  if (heroForm) {
    heroForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = {
        name: document.getElementById('heroName').value,
        email: document.getElementById('heroEmail').value,
        phone: document.getElementById('heroPhone').value,
        service: document.getElementById('heroService').value,
        message: document.getElementById('heroMessage')?.value || 'No message provided'
      };
      
      // Create WhatsApp message
      const message = `*New Quote Request from Website*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Service:* ${formData.service}%0A*Message:* ${formData.message}`;
      
      // Open WhatsApp
      window.open(`https://wa.me/918888589767?text=${message}`, '_blank');
      
      // Show success message
      alert('Thank you! We will contact you shortly.');
      this.reset();
    });
  }
});
