/**
 * Salon Elena - Animation System
 * 
 * This script handles both initial page load animations, scroll-triggered animations
 * using the Intersection Observer API, and mobile sidebar toggle animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize mobile sidebar functionality
  initMobileSidebar();
  
  // Initial page load animations - add animation classes to elements
  initPageLoadAnimations();
  
  // Set up scroll animations using Intersection Observer
  initScrollAnimations();
});

/**
 * Initialize mobile sidebar toggle functionality
 */
function initMobileSidebar() {
  const burgerIcon = document.querySelector('.phone-nav img[alt="burger"]');
  const sidebar = document.getElementById('mobileSidebar');
  const closeBtn = document.getElementById('closeSidebarBtn');
  
  if (burgerIcon && sidebar && closeBtn) {
    // Open sidebar when burger icon is clicked
    burgerIcon.addEventListener('click', () => {
      sidebar.classList.remove('translate-x-full');
      document.body.classList.add('sidebar-open');
      
      // Add animation classes to sidebar items
      const sidebarItems = sidebar.querySelectorAll('.sidebar-item');
      sidebarItems.forEach(item => {
        item.classList.add('animated');
      });
    });
    
    // Close sidebar when close button is clicked
    closeBtn.addEventListener('click', closeSidebar);
    
    // Also close when clicking sidebar menu items
    sidebar.querySelectorAll('.sidebar-item a').forEach(link => {
      link.addEventListener('click', closeSidebar);
    });
  }
  
  function closeSidebar() {
    document.body.classList.add('sidebar-closing');
    document.body.classList.remove('sidebar-open');
    
    // Add a small delay to let the animation play
    setTimeout(() => {
      sidebar.classList.add('translate-x-full');
      document.body.classList.remove('sidebar-closing');
    }, 500);
  }
}

/**
 * Initialize page load animations by adding classes to elements
 */
function initPageLoadAnimations() {
  // Animate navigation elements
  document.querySelectorAll('.phone-nav, .desktop-nav').forEach(nav => {
    nav.classList.add('nav-animate');
  });

  // Animate hero section elements
  const heroSection = document.querySelector('.h-\\[93vh\\]');
  if (heroSection) {
    // Find and animate the title
    const heading = heroSection.querySelector('h1');
    if (heading) heading.classList.add('hero-heading');
    
    // Find and animate the paragraph
    const paragraph = heroSection.querySelector('p');
    if (paragraph) paragraph.classList.add('hero-paragraph');
    
    // Find and animate the CTA section
    const cta = heroSection.querySelector('.onest.flex.items-center.gap-2');
    if (cta) cta.classList.add('hero-cta');
    
    // Animate images
    heroSection.querySelectorAll('img[alt="woman"]').forEach(img => {
      img.classList.add('hero-image');
    });
    
    heroSection.querySelectorAll('img[alt="flower"], img[alt="circle"], img[alt="brush"]').forEach(img => {
      img.classList.add('hero-element');
    });
  }
}

/**
 * Initialize scroll animations using Intersection Observer
 */
function initScrollAnimations() {
  // Add animation classes to elements we want to animate on scroll
  setupAnimationTargets();
  
  // Create the intersection observer
  const observerOptions = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.15 // Trigger when at least 15% of the element is visible
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Get the animation class from the data attribute
        const animationClass = entry.target.dataset.animation;
        if (animationClass) {
          entry.target.classList.add(animationClass);
        }
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, observerOptions);
  
  // Start observing all elements with the 'animate' class
  document.querySelectorAll('.animate').forEach(element => {
    observer.observe(element);
  });
}

/**
 * Setup animation targets by adding appropriate classes and data attributes
 */
function setupAnimationTargets() {
  // Pink feature bar with icons
  const featureBar = document.querySelector('.bg-\\[\\#FFD3D9\\].py-10');
  if (featureBar) {
    const features = featureBar.querySelectorAll('div.flex.flex-col');
    features.forEach((feature, index) => {
      feature.classList.add('animate');
      feature.dataset.animation = 'fade-in-up';
      feature.classList.add(`animate-stagger-${index + 1}`);
    });
  }
  
  // Products section
  const productsSection = document.querySelector('section.py-20');
  if (productsSection) {
    // Left image
    const leftImage = productsSection.querySelector('img[alt="women"].rounded-md');
    if (leftImage) {
      leftImage.classList.add('animate');
      leftImage.dataset.animation = 'fade-in-left';
    }
    
    // Text content
    const textContent = productsSection.querySelector('div.text-center.flex.flex-col');
    if (textContent) {
      const heading = textContent.querySelector('h2');
      if (heading) {
        heading.classList.add('animate');
        heading.dataset.animation = 'fade-in-up';
      }
      
      const paragraph = textContent.querySelector('p.onest');
      if (paragraph) {
        paragraph.classList.add('animate');
        paragraph.dataset.animation = 'fade-in-up';
        paragraph.classList.add('animate-stagger-1');
      }
      
      const cta = textContent.querySelector('a');
      if (cta) {
        cta.classList.add('animate');
        cta.dataset.animation = 'fade-in-up';
        cta.classList.add('animate-stagger-2');
      }
    }
    
    // Horizontal image and decorative elements
    const horizontalImage = productsSection.querySelector('img[alt="women"].hidden');
    if (horizontalImage) {
      horizontalImage.classList.add('animate');
      horizontalImage.dataset.animation = 'fade-in-right';
    }
    
    const radiusImage = productsSection.querySelector('img[alt="radius"]');
    if (radiusImage) {
      radiusImage.classList.add('animate');
      radiusImage.dataset.animation = 'scale';
    }
  }

  // Services Section
  const servicesSection = document.querySelector('.container.px-4.py-10.mx-auto');
  if (servicesSection) {
    // Animate the header
    const servicesHeader = servicesSection.querySelector('header');
    if (servicesHeader) {
      servicesHeader.classList.add('animate');
      servicesHeader.dataset.animation = 'fade-in-up';
    }

    // Animate the carousel
    const carousel = servicesSection.querySelector('.service-carousel');
    if (carousel) {
      carousel.classList.add('animate');
      carousel.dataset.animation = 'fade-in-up';
      carousel.classList.add('animate-stagger-1');
    }

    // Animate individual slides with staggered delay
    const slides = servicesSection.querySelectorAll('.carousel-slide');
    slides.forEach((slide, index) => {
      slide.classList.add('animate-on-visible');
      slide.dataset.stagger = index + 1;
    });

    // Animate the "View All" button
    const viewAllBtn = servicesSection.querySelector('.view-all-button');
    if (viewAllBtn) {
      viewAllBtn.classList.add('animate');
      viewAllBtn.dataset.animation = 'fade-in-up';
      viewAllBtn.classList.add('animate-stagger-2');
    }
  }

  // Services Page - Enhance epilare list if on services page
  const epilareList = document.querySelector('.epilare-list');
  if (epilareList) {
    epilareList.classList.add('animate');
    epilareList.dataset.animation = 'fade-in-up';

    // Animate each item in the list
    const epilareItems = epilareList.querySelectorAll('.epilare-item');
    epilareItems.forEach((item, index) => {
      item.classList.add('animate-on-visible');
      item.dataset.stagger = Math.min(index + 1, 5); // Cap at 5 for performance
    });

    // Animate location and contact info
    const locationInfo = epilareList.querySelector('.location-info');
    if (locationInfo) {
      locationInfo.classList.add('animate');
      locationInfo.dataset.animation = 'fade-in-up';
      locationInfo.classList.add('animate-stagger-3');
    }

    const contactInfo = epilareList.querySelector('.contact-info');
    if (contactInfo) {
      contactInfo.classList.add('animate');
      contactInfo.dataset.animation = 'fade-in-up';
      contactInfo.classList.add('animate-stagger-4');
    }
  }

  // Service categories on services page
  const serviceCategories = document.querySelectorAll('.service-category-title');
  serviceCategories.forEach(category => {
    category.classList.add('animate');
    category.dataset.animation = 'fade-in-left';
  });

  // Service cards on services page
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach((card, index) => {
    card.classList.add('animate');
    card.dataset.animation = 'fade-in-up';
    card.classList.add(`animate-stagger-${(index % 3) + 1}`);
  });

  // CTA Section
  const ctaSection = document.querySelector('section.text-center.py-10.relative');
  if (ctaSection) {
    const ctaContainer = ctaSection.querySelector('.relative.z-10');
    if (ctaContainer) {
      ctaContainer.classList.add('animate');
      ctaContainer.dataset.animation = 'fade-in-up';

      // Animate CTA content elements
      const ctaHeading = ctaContainer.querySelector('h2');
      if (ctaHeading) {
        ctaHeading.classList.add('animate-on-visible');
        ctaHeading.dataset.stagger = 1;
      }

      const ctaParagraph = ctaContainer.querySelector('p');
      if (ctaParagraph) {
        ctaParagraph.classList.add('animate-on-visible');
        ctaParagraph.dataset.stagger = 2;
      }

      const ctaButton = ctaContainer.querySelector('a');
      if (ctaButton) {
        ctaButton.classList.add('animate-on-visible');
        ctaButton.dataset.stagger = 3;
      }
    }
  }

  // Footer
  const footer = document.querySelector('footer');
  if (footer) {
    footer.classList.add('animate');
    footer.dataset.animation = 'fade-in-up';

    // Animate footer sections
    const footerLogo = footer.querySelector('img[alt="logo"]');
    if (footerLogo) {
      footerLogo.classList.add('animate-on-visible');
      footerLogo.dataset.stagger = 1;
    }

    const footerSections = footer.querySelectorAll('.flex.flex-col.gap-2');
    footerSections.forEach((section, index) => {
      section.classList.add('animate-on-visible');
      section.dataset.stagger = index + 2;
    });
  }

  // Initialize animation for elements with animate-on-visible class
  initAnimateOnVisible();
}

/**
 * Initialize animation for elements with animate-on-visible class
 * These are child elements that animate when their parent becomes visible
 */
function initAnimateOnVisible() {
  document.querySelectorAll('.animate').forEach(parent => {
    const children = parent.querySelectorAll('.animate-on-visible');
    
    if (children.length) {
      // Create observer for the parent
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // When parent is visible, animate children with staggered delays
            children.forEach(child => {
              const stagger = child.dataset.stagger || 1;
              setTimeout(() => {
                child.classList.add('child-visible');
              }, stagger * 150); // 150ms increment per stagger level
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      
      observer.observe(parent);
    }
  });
}

/**
 * Helper function to add multiple classes to an element
 * @param {HTMLElement} element - The DOM element to add classes to
 * @param {string[]} classes - Array of class names to add
 */
function addClasses(element, classes) {
  if (element && classes && classes.length) {
    element.classList.add(...classes);
  }
}