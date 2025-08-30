// BookNest AI - Main JavaScript
// Handles smooth scrolling and additional interactions

document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Update the URL hash
        window.location.hash = targetId;
        
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Accessible Accordion Functionality
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      const targetId = this.getAttribute('aria-controls');
      const content = document.getElementById(targetId);
      
      // Toggle this accordion item
      this.setAttribute('aria-expanded', !isExpanded);
      content.setAttribute('aria-hidden', isExpanded);
      
      // Update max-height for smooth animation
      if (!isExpanded) {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = '0px';
      }
    });
    
    // Handle keyboard navigation
    header.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
  
  // Initialize accordion content heights
  const accordionContents = document.querySelectorAll('.accordion-content[aria-hidden="true"]');
  accordionContents.forEach(content => {
    content.style.maxHeight = '0px';
  });
  
  // Timeline IntersectionObserver for scroll reveals
  const timelineSteps = document.querySelectorAll('.timeline-step');
  
  if (timelineSteps.length > 0) {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          // Once animated in, stop observing to prevent re-triggering
          timelineObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    timelineSteps.forEach(step => {
      timelineObserver.observe(step);
    });
  }
  
  // Industry Tabs Functionality - only if elements exist in #solutions
  const industryTabs = document.querySelectorAll('#solutions .industry-tab');
  const industryPanels = document.querySelectorAll('#solutions .industry-panel');
  
  if (industryTabs.length > 0) {
    industryTabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        switchTab(tab);
      });
      
      tab.addEventListener('keydown', (e) => {
        handleTabKeydown(e, index);
      });
    });
    
    function switchTab(selectedTab) {
      // Update tab states
      industryTabs.forEach(tab => {
        tab.setAttribute('aria-selected', 'false');
      });
      selectedTab.setAttribute('aria-selected', 'true');
      
      // Update panel visibility
      industryPanels.forEach(panel => {
        panel.setAttribute('aria-hidden', 'true');
      });
      
      const targetPanelId = selectedTab.getAttribute('aria-controls');
      const targetPanel = document.getElementById(targetPanelId);
      if (targetPanel) {
        targetPanel.setAttribute('aria-hidden', 'false');
      }
    }
    
    function handleTabKeydown(e, currentIndex) {
      let targetIndex;
      
      switch(e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          targetIndex = currentIndex > 0 ? currentIndex - 1 : industryTabs.length - 1;
          break;
        case 'ArrowRight':
          e.preventDefault();
          targetIndex = currentIndex < industryTabs.length - 1 ? currentIndex + 1 : 0;
          break;
        case 'Home':
          e.preventDefault();
          targetIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          targetIndex = industryTabs.length - 1;
          break;
        default:
          return;
      }
      
      industryTabs[targetIndex].focus();
      switchTab(industryTabs[targetIndex]);
    }
  }
  
  console.log('BookNest AI - Site loaded');
});

// T08 - Industry Solutions Tabs (DEPRECATED: guarded for integrations)
document.addEventListener('DOMContentLoaded', function() {
  // Only run if tab elements exist in #solutions (they won't for integrations grid)
  const industryTabs = document.querySelectorAll('#solutions .industry-tab');
  const industryPanels = document.querySelectorAll('#solutions .industry-panel');

  if (industryTabs.length === 0) {
    return; // Exit early if no tabs found (integrations grid is active)
  }

  function switchTab(activeTab) {
    const targetPanelId = activeTab.getAttribute('aria-controls');

    // Update tab states
    industryTabs.forEach(tab => {
      const isActive = tab === activeTab;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive.toString());
    });

    // Update panel states
    industryPanels.forEach(panel => {
      const isActive = panel.id === targetPanelId;
      panel.classList.toggle('hidden', !isActive);
      panel.setAttribute('aria-hidden', (!isActive).toString());
      
      if (isActive) {
        panel.focus({ preventScroll: true });
      }
    });
  }

  // Add click event listeners
  industryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      switchTab(tab);
    });

    // Add keyboard navigation
    tab.addEventListener('keydown', (e) => {
      let targetIndex = -1;
      const currentIndex = Array.from(industryTabs).indexOf(tab);

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          targetIndex = currentIndex > 0 ? currentIndex - 1 : industryTabs.length - 1;
          break;
        case 'ArrowRight':
          e.preventDefault();
          targetIndex = currentIndex < industryTabs.length - 1 ? currentIndex + 1 : 0;
          break;
        case 'Home':
          e.preventDefault();
          targetIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          targetIndex = industryTabs.length - 1;
          break;
        default:
          return;
      }
      
      industryTabs[targetIndex].focus();
      switchTab(industryTabs[targetIndex]);
    });
  });

  // Initialize with first tab active
  if (industryTabs.length > 0) {
    switchTab(industryTabs[0]);
  }

  // Image switching for solutions section
  const solutionsImage = document.getElementById('solutions-image');
  const industryImageMap = {
    'spa-tab': {
      src: 'quantam-assets/contact/photo-1.png',
      alt: 'Medical & Wellness Spa'
    },
    'realestate-tab': {
      src: 'quantam-assets/about/about-image-right.png', 
      alt: 'Real Estate Solutions'
    },
    'clinic-tab': {
      src: 'quantam-assets/content/image-center.png',
      alt: 'Medical Clinic Solutions'
    }
  };

  function updateSolutionsImage(tabId) {
    if (solutionsImage && industryImageMap[tabId]) {
      const imageData = industryImageMap[tabId];
      solutionsImage.src = imageData.src;
      solutionsImage.alt = imageData.alt;
    }
  }

  // Add image switching to existing tab functionality
  industryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      updateSolutionsImage(tab.id);
    });
  });

  // Initialize with first image
  if (industryTabs.length > 0) {
    updateSolutionsImage(industryTabs[0].id);
  }
});

// T12 - Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
  const leadForm = document.getElementById('lead-form');
  const submitBtn = document.getElementById('submit-btn');
  const submitText = document.getElementById('submit-text');
  const submitLoading = document.getElementById('submit-loading');
  const toastContainer = document.getElementById('toast-container');

  if (!leadForm) return;

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Form validation functions
  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + '-error');
    
    if (field && errorElement) {
      field.classList.add('field-error');
      errorElement.textContent = message;
      errorElement.classList.add('show');
      field.setAttribute('aria-invalid', 'true');
      field.setAttribute('aria-describedby', fieldId + '-error');
    }
  }

  function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + '-error');
    
    if (field && errorElement) {
      field.classList.remove('field-error');
      errorElement.classList.remove('show');
      field.setAttribute('aria-invalid', 'false');
      field.removeAttribute('aria-describedby');
    }
  }

  function validateField(fieldId, value, rules) {
    clearError(fieldId);
    
    if (rules.required && (!value || value.trim().length === 0)) {
      showError(fieldId, rules.requiredMessage || 'This field is required.');
      return false;
    }
    
    if (rules.email && value && !emailRegex.test(value)) {
      showError(fieldId, 'Please enter a valid email address.');
      return false;
    }
    
    if (rules.minLength && value && value.trim().length < rules.minLength) {
      showError(fieldId, `Must be at least ${rules.minLength} characters long.`);
      return false;
    }
    
    return true;
  }

  function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    let isValid = true;
    
    // Validate required fields
    isValid = validateField('name', name, { 
      required: true, 
      minLength: 2,
      requiredMessage: 'Please enter your full name.' 
    }) && isValid;
    
    isValid = validateField('email', email, { 
      required: true, 
      email: true,
      requiredMessage: 'Please enter your email address.' 
    }) && isValid;
    
    return isValid;
  }

  // Show toast notification
  function showToast(message, type = 'info', duration = 5000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <div class="flex items-center justify-between">
        <span>${message}</span>
        <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Show toast with animation
    setTimeout(() => {
      toast.classList.add('show');
    }, 100);
    
    // Auto-remove toast
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentElement) {
          toast.parentElement.removeChild(toast);
        }
      }, 300);
    }, duration);
  }

  // Real-time validation
  ['name', 'email'].forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field) {
      field.addEventListener('blur', function() {
        const rules = fieldId === 'email' 
          ? { required: true, email: true }
          : { required: true, minLength: 2 };
        validateField(fieldId, this.value, rules);
      });
      
      field.addEventListener('input', function() {
        if (this.classList.contains('field-error')) {
          clearError(fieldId);
        }
      });
    }
  });

  // Form submission
  leadForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Check honeypot field
    const honeypot = document.querySelector('input[name="website"]');
    if (honeypot && honeypot.value) {
      // Bot detected, fail silently
      console.log('Bot detected via honeypot');
      return;
    }
    
    // Validate form
    if (!validateForm()) {
      showToast('Please fix the errors above and try again.', 'error');
      return;
    }
    
    // Disable submit button and show loading state
    submitBtn.disabled = true;
    submitText.classList.add('hidden');
    submitLoading.classList.remove('hidden');
    
    try {
      // Collect form data
      const formData = new FormData(leadForm);
      const data = Object.fromEntries(formData.entries());
      
      // Remove honeypot field from data
      delete data.website;
      
      // Simulate API call (since /api/lead doesn't exist)
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok || response.status === 404) {
        // Success (or simulated success for 404)
        showToast('Thank you! We\'ll be in touch within 24 hours to schedule your demo.', 'success', 7000);
        leadForm.reset();
        
        // Track form submission (placeholder for analytics)
        if (typeof gtag !== 'undefined') {
          gtag('event', 'form_submit', {
            event_category: 'engagement',
            event_label: 'lead_form'
          });
        }
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
    } catch (error) {
      console.log('Form submission error (expected for demo):', error);
      
      // For demo purposes, show success even on error since /api/lead doesn't exist
      showToast('Thank you! We\'ll be in touch within 24 hours to schedule your demo.', 'success', 7000);
      leadForm.reset();
    } finally {
      // Re-enable submit button
      submitBtn.disabled = false;
      submitText.classList.remove('hidden');
      submitLoading.classList.add('hidden');
    }
  });
});