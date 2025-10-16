// Perfex CRM API Integration for Rs999 Static Site
// This file handles form submissions and creates leads in Perfex CRM

const PERFEX_CONFIG = {
  baseUrl: 'https://www.jikut.com/core/api',
  apiKey: 'YOUR_PERFEX_API_KEY_HERE', // Replace with your actual API key from Perfex CRM
  source: 1, // Lead source ID (1 = Website, adjust as needed)
  status: 1, // Lead status ID (1 = New, adjust as needed)
  assigned: 1, // Staff ID to assign leads to
  defaultCountry: 'IN'
};

/**
 * Submit form data to Perfex CRM as a new lead
 * @param {Object} formData - Form data object
 * @param {string} formType - Type of form ('hero' or 'contact')
 * @returns {Promise<Object>} API response
 */
async function submitToPerfexCRM(formData, formType = 'contact') {
  try {
    // Prepare lead data according to Perfex CRM API format
    const leadData = {
      // Required fields
      name: formData.name || '',
      title: formType === 'hero' ? 'Quick Quote Request' : 'Contact Form Submission',
      description: formData.message || formData.requirement || '',
      
      // Contact information
      email: formData.email || '',
      phonenumber: formData.mobile || formData.phone || '',
      website: formData.website || '',
      
      // Address information
      city: formData.city || '',
      state: formData.state || '',
      country: PERFEX_CONFIG.defaultCountry,
      zip: formData.zip || '',
      address: formData.address || '',
      
      // Lead settings
      source: PERFEX_CONFIG.source, // Website
      status: PERFEX_CONFIG.status, // New
      assigned: PERFEX_CONFIG.assigned, // Staff member ID
      
      // Custom fields (optional)
      custom_fields: {
        leads: {
          // Add custom field mappings here if needed
          // Example: budget: formData.budget,
        }
      },
      
      // Additional information
      default_language: 'english',
      contacted_today: 1,
      is_public: 0,
      
      // Tags (optional)
      tags: formType === 'hero' ? 'quick-quote,homepage' : 'contact-form'
    };

    // Add form-specific fields
    if (formType === 'hero') {
      leadData.description = `
Quick Quote Request from Homepage

Name: ${formData.name}
Email: ${formData.email}
Mobile: ${formData.mobile || 'Not provided'}
Service: ${formData.service || 'Not specified'}
Requirements: ${formData.requirement || 'Not specified'}

Submitted from: ${window.location.href}
Date: ${new Date().toLocaleString('en-IN')}
      `.trim();
    } else {
      leadData.description = `
Contact Form Submission

Name: ${formData.name}
Email: ${formData.email}
Mobile: ${formData.mobile || 'Not provided'}
City: ${formData.city || 'Not provided'}
Message: ${formData.message}

Submitted from: ${window.location.href}
Date: ${new Date().toLocaleString('en-IN')}
      `.trim();
    }

    // Make API request to Perfex CRM
    const response = await fetch(`${PERFEX_CONFIG.baseUrl}/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authtoken': PERFEX_CONFIG.apiKey
      },
      body: JSON.stringify(leadData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Perfex CRM API error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    
    console.log('✅ Lead created in Perfex CRM:', result);
    
    return {
      success: true,
      leadId: result.id || result.leadid,
      message: 'Lead created successfully',
      data: result
    };
    
  } catch (error) {
    console.error('❌ Error submitting to Perfex CRM:', error);
    
    return {
      success: false,
      error: error.message,
      message: 'Failed to create lead in CRM'
    };
  }
}

/**
 * Get lead sources from Perfex CRM
 * @returns {Promise<Array>} List of lead sources
 */
async function getPerfexLeadSources() {
  try {
    const response = await fetch(`${PERFEX_CONFIG.baseUrl}/lead_sources`, {
      method: 'GET',
      headers: {
        'authtoken': PERFEX_CONFIG.apiKey
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch lead sources: ${response.status}`);
    }

    const sources = await response.json();
    return sources;
  } catch (error) {
    console.error('Error fetching lead sources:', error);
    return [];
  }
}

/**
 * Get lead statuses from Perfex CRM
 * @returns {Promise<Array>} List of lead statuses
 */
async function getPerfexLeadStatuses() {
  try {
    const response = await fetch(`${PERFEX_CONFIG.baseUrl}/lead_statuses`, {
      method: 'GET',
      headers: {
        'authtoken': PERFEX_CONFIG.apiKey
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch lead statuses: ${response.status}`);
    }

    const statuses = await response.json();
    return statuses;
  } catch (error) {
    console.error('Error fetching lead statuses:', error);
    return [];
  }
}

/**
 * Show loading state on form submission
 * @param {HTMLFormElement} form - Form element
 * @param {HTMLButtonElement} button - Submit button
 */
function showFormLoading(form, button) {
  if (button) {
    button.disabled = true;
    button.dataset.originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Submitting...';
  }
  
  if (form) {
    form.classList.add('opacity-75', 'pointer-events-none');
  }
}

/**
 * Hide loading state after form submission
 * @param {HTMLFormElement} form - Form element
 * @param {HTMLButtonElement} button - Submit button
 */
function hideFormLoading(form, button) {
  if (button) {
    button.disabled = false;
    button.innerHTML = button.dataset.originalText || 'Submit';
  }
  
  if (form) {
    form.classList.remove('opacity-75', 'pointer-events-none');
  }
}

/**
 * Show notification message
 * @param {string} message - Message to display
 * @param {string} type - Type of notification ('success', 'error', 'info')
 */
function showNotification(message, type = 'success') {
  // Remove any existing notifications
  const existingNotifications = document.querySelectorAll('.crm-notification');
  existingNotifications.forEach(n => n.remove());

  const notification = document.createElement('div');
  notification.className = `crm-notification fixed top-20 right-4 z-50 px-6 py-4 rounded-lg shadow-2xl transform transition-all duration-300 max-w-md ${
    type === 'success' ? 'bg-green-500' : 
    type === 'error' ? 'bg-red-500' : 
    'bg-blue-500'
  } text-white font-semibold`;
  
  const icon = type === 'success' ? 'check-circle' : 
               type === 'error' ? 'exclamation-circle' : 
               'info-circle';
  
  notification.innerHTML = `
    <div class="flex items-center">
      <i class="fas fa-${icon} mr-3 text-xl"></i>
      <span>${message}</span>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 10);
  
  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (Indian format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid
 */
function isValidPhone(phone) {
  if (!phone) return true; // Optional field
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

/**
 * Initialize contact form handler
 */
function initContactFormHandler() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = contactForm.querySelector('button[type="submit"]');
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
      name: formData.get('name')?.trim(),
      email: formData.get('email')?.trim(),
      mobile: formData.get('mobile')?.trim(),
      city: formData.get('city')?.trim(),
      message: formData.get('message')?.trim()
    };
    
    // Validation
    if (!data.name || data.name.length < 2) {
      showNotification('Please enter a valid name', 'error');
      return;
    }
    
    if (!data.email || !isValidEmail(data.email)) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }
    
    if (data.mobile && !isValidPhone(data.mobile)) {
      showNotification('Please enter a valid 10-digit mobile number', 'error');
      return;
    }
    
    if (!data.message || data.message.length < 10) {
      showNotification('Please enter a detailed message (at least 10 characters)', 'error');
      return;
    }
    
    // Show loading state
    showFormLoading(contactForm, submitButton);
    
    // Submit to Perfex CRM
    const result = await submitToPerfexCRM(data, 'contact');
    
    // Hide loading state
    hideFormLoading(contactForm, submitButton);
    
    if (result.success) {
      showNotification('Thank you! Your inquiry has been submitted successfully. We will contact you soon.', 'success');
      contactForm.reset();
      
      // Optional: Track conversion with Google Analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submission', {
          event_category: 'Contact',
          event_label: 'Contact Form',
          value: 1
        });
      }
    } else {
      showNotification('Sorry, there was an error submitting your request. Please try WhatsApp or call us directly.', 'error');
      console.error('CRM submission error:', result.error);
    }
  });
}

/**
 * Initialize hero quote form handler
 */
function initHeroQuoteFormHandler() {
  const heroForm = document.getElementById('heroQuoteForm');
  if (!heroForm) return;

  heroForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = heroForm.querySelector('button[type="submit"]');
    
    // Get form data
    const formData = new FormData(heroForm);
    const data = {
      name: formData.get('name')?.trim(),
      email: formData.get('email')?.trim(),
      mobile: formData.get('mobile')?.trim(),
      service: formData.get('service')?.trim(),
      requirement: formData.get('requirement')?.trim()
    };
    
    // Validation
    if (!data.name || data.name.length < 2) {
      showNotification('Please enter a valid name', 'error');
      return;
    }
    
    if (!data.email || !isValidEmail(data.email)) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }
    
    if (data.mobile && !isValidPhone(data.mobile)) {
      showNotification('Please enter a valid 10-digit mobile number', 'error');
      return;
    }
    
    // Show loading state
    showFormLoading(heroForm, submitButton);
    
    // Submit to Perfex CRM
    const result = await submitToPerfexCRM(data, 'hero');
    
    // Hide loading state
    hideFormLoading(heroForm, submitButton);
    
    if (result.success) {
      showNotification('Thank you! We have received your quote request. Our team will contact you shortly.', 'success');
      heroForm.reset();
      
      // Optional: Track conversion with Google Analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submission', {
          event_category: 'Lead',
          event_label: 'Hero Quote Form',
          value: 1
        });
      }
    } else {
      showNotification('Sorry, there was an error. Please try WhatsApp or call us directly.', 'error');
      console.error('CRM submission error:', result.error);
    }
  });
}

// Initialize all form handlers when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initContactFormHandler();
  initHeroQuoteFormHandler();
  
  console.log('✅ Perfex CRM integration initialized');
});

// Export functions for external use
window.PerfexCRM = {
  submitToPerfexCRM,
  getPerfexLeadSources,
  getPerfexLeadStatuses,
  showNotification,
  isValidEmail,
  isValidPhone
};
