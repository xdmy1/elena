/**
 * Salon Elena - Animation System
 * 
 * This script handles both initial page load animations and scroll-triggered animations
 * using the Intersection Observer API for optimal performance.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initial page load animations - add animation classes to elements
    initPageLoadAnimations();
    
    // Set up scroll animations using Intersection Observer
    initScrollAnimations();
  });
  
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