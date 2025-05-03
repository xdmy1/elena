/**
 * Truly Smooth Infinite Carousel
 * 
 * This implementation ensures there are no glitches or jumps
 * when the carousel loops around.
 */
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const burgerBtn = document.querySelector('.phone-nav img[alt="burger"]');
    const sidebar = document.getElementById('mobileSidebar');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    
    // Open sidebar when burger is clicked
    burgerBtn.addEventListener('click', function() {
        // Prevent background scrolling
        document.body.style.overflow = 'hidden';
        
        // Show sidebar
        sidebar.classList.remove('translate-x-full');
        sidebar.classList.add('translate-x-0');
        
        // Animate items
        setTimeout(() => {
            sidebarItems.forEach(item => {
                item.classList.remove('opacity-0', 'translate-y-5');
                item.classList.add('opacity-100', 'translate-y-0');
            });
        }, 300);
    });
    
    // Close sidebar
    closeSidebarBtn.addEventListener('click', closeSidebar);
    
    // Close sidebar when clicking menu items (optional)
    sidebarItems.forEach(item => {
        item.addEventListener('click', closeSidebar);
    });
    
    function closeSidebar() {
        // Fade out items first
        sidebarItems.forEach(item => {
            item.classList.remove('opacity-100', 'translate-y-0');
            item.classList.add('opacity-0', 'translate-y-5');
        });
        
        // Then slide out sidebar
        setTimeout(() => {
            sidebar.classList.remove('translate-x-0');
            sidebar.classList.add('translate-x-full');
            
            // Re-enable scrolling
            document.body.style.overflow = '';
            
            // Reset items after animation completes
            setTimeout(() => {
                sidebarItems.forEach(item => {
                    item.classList.add('opacity-0', 'translate-y-5');
                    item.classList.remove('opacity-100', 'translate-y-0');
                });
            }, 500);
        }, 300);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Only initialize on mobile
    if (window.innerWidth < 768) {
      initSmoothCarousel();
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth < 768) {
        initSmoothCarousel();
      }
    });
  });
  
  function initSmoothCarousel() {
    const carousel = document.querySelector('.continuous-carousel');
    if (!carousel) return;
    
    // Get carousel items and calculate total width
    const items = document.querySelectorAll('.carousel-item');
    if (!items.length) return;
    
    // Clone extra items if needed to ensure smooth looping
    const itemCount = items.length;
    const originalItemsWidth = Array.from(items).reduce((total, item) => total + item.offsetWidth, 0);
    
    // Speed in pixels per second - lower for slower movement
    const pixelsPerSecond = 20;
    
    // Animation variables
    let position = 0;
    let animationId = null;
    let lastTimestamp = 0;
    let totalWidth = originalItemsWidth / 2; // Half because we already have duplicates in HTML
    
    // Set up animation loop using requestAnimationFrame for smooth performance
    function animate(timestamp) {
      // Initialize timestamp on first call
      if (!lastTimestamp) {
        lastTimestamp = timestamp;
      }
      
      // Calculate time elapsed since last frame
      const elapsed = timestamp - lastTimestamp;
      
      // Move the carousel based on elapsed time and speed
      position -= (pixelsPerSecond * elapsed) / 1000;
      
      // If we've scrolled past one full item width, reset position
      // This is the key to smooth looping - resetting at the right moment
      if (Math.abs(position) >= totalWidth) {
        position = 0;
      }
      
      // Apply the transform with GPU acceleration
      carousel.style.transform = `translate3d(${position}px, 0, 0)`;
      
      // Update timestamp for next frame
      lastTimestamp = timestamp;
      
      // Continue the animation loop
      animationId = requestAnimationFrame(animate);
    }
    
    // Start the animation
    animationId = requestAnimationFrame(animate);
    
    // Pause animation when tab is not visible to save resources
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        lastTimestamp = 0; // Reset to prevent jumping
        animationId = requestAnimationFrame(animate);
      }
    });
    
    // Optimize carousel based on current view
    function optimizeCarousel() {
      // Ensure smooth animation with proper acceleration
      carousel.style.willChange = 'transform';
      carousel.style.backfaceVisibility = 'hidden';
    }
    
    // Initial optimization
    optimizeCarousel();
  }
  
/**
 * Service Carousel
 * A responsive carousel for displaying services with various features:
 * - Touch support for mobile
 * - Keyboard navigation
 * - Indicator dots
 * - Responsive design
 * - Accessibility features
 */

class ServiceCarousel {
    /**
     * Initialize the carousel
     * @param {Object} options - Configuration options
     */
    constructor(options = {}) {
        // Default configuration
        this.config = {
            trackSelector: '#carouselTrack',
            slideSelector: '.carousel-slide',
            prevBtnSelector: '#prevBtn',
            nextBtnSelector: '#nextBtn',
            indicatorsSelector: '#carouselIndicators',
            slidesToShow: {
                mobile: 1,
                desktop: 4
            },
            autoplay: false,
            autoplaySpeed: 5000,
            breakpoint: 768,
            ...options
        };

        // DOM elements
        this.track = document.querySelector(this.config.trackSelector);
        this.slides = Array.from(document.querySelectorAll(this.config.slideSelector));
        this.prevBtn = document.querySelector(this.config.prevBtnSelector);
        this.nextBtn = document.querySelector(this.config.nextBtnSelector);
        this.indicatorsContainer = document.querySelector(this.config.indicatorsSelector);
        
        // State variables
        this.currentIndex = 0;
        this.slideWidth = 0;
        this.slidesToShow = 1;
        this.isMobile = window.innerWidth < this.config.breakpoint;
        this.isDragging = false;
        this.startPos = 0;
        this.currentTranslate = 0;
        this.prevTranslate = 0;
        this.animationID = 0;
        this.autoplayInterval = null;
        
        // Initialize the carousel
        this.init();
    }
    
    /**
     * Initialize the carousel and set up event listeners
     */
    init() {
        // Skip initialization if elements are missing
        if (!this.track || !this.slides.length) {
            console.error('Carousel elements not found');
            return;
        }
        
        // Set up the carousel
        this.setupSlides();
        this.createIndicators();
        this.setupEventListeners();
        this.updateCarousel();
        
        // Set up autoplay if enabled
        if (this.config.autoplay) {
            this.startAutoplay();
        }
        
        // Set initial aria attributes for accessibility
        this.updateAriaAttributes();
        
        // Log successful initialization
        console.log('Service carousel initialized');
    }
    
    /**
     * Set up the initial state of slides
     */
    setupSlides() {
        // Determine responsive settings
        this.updateResponsiveSettings();
        
        // Calculate the slide width
        this.calculateSlideWidth();
        
        // Set initial positions
        this.slides.forEach((slide, index) => {
            slide.setAttribute('aria-hidden', index !== this.currentIndex ? 'true' : 'false');
            slide.setAttribute('tabindex', index !== this.currentIndex ? '-1' : '0');
        });
    }
    
    /**
     * Calculate the width of each slide
     */
    calculateSlideWidth() {
        // Get the first slide to calculate width
        const firstSlide = this.slides[0];
        if (!firstSlide) return;
        
        // Calculate width based on getBoundingClientRect
        this.slideWidth = firstSlide.getBoundingClientRect().width;
    }
    
    /**
     * Update settings based on screen size
     */
    updateResponsiveSettings() {
        this.isMobile = window.innerWidth < this.config.breakpoint;
        this.slidesToShow = this.isMobile 
            ? this.config.slidesToShow.mobile 
            : this.config.slidesToShow.desktop;
    }
    
    /**
     * Create indicator dots
     */
    createIndicators() {
        if (!this.indicatorsContainer) return;
        
        // Clear existing indicators
        this.indicatorsContainer.innerHTML = '';
        
        // Create indicator for each slide
        this.slides.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.classList.add('indicator');
            indicator.setAttribute('aria-label', `Go to service ${index + 1}`);
            indicator.setAttribute('data-index', index);
            
            if (index === this.currentIndex) {
                indicator.classList.add('active');
                indicator.setAttribute('aria-current', 'true');
            }
            
            // Add click event listener
            indicator.addEventListener('click', () => this.goToSlide(index));
            
            // Append to container
            this.indicatorsContainer.appendChild(indicator);
        });
    }
    
    /**
     * Set up all event listeners
     */
    setupEventListeners() {
        // Navigation buttons
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', this.prev.bind(this));
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', this.next.bind(this));
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeydown.bind(this));
        
        // Touch events for mobile
        this.track.addEventListener('touchstart', this.touchStart.bind(this), { passive: true });
        this.track.addEventListener('touchmove', this.touchMove.bind(this), { passive: false });
        this.track.addEventListener('touchend', this.touchEnd.bind(this), { passive: true });
        
        // Window resize
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // Visibility change (pause autoplay when tab is inactive)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && this.config.autoplay) {
                this.stopAutoplay();
            } else if (!document.hidden && this.config.autoplay) {
                this.startAutoplay();
            }
        });
    }
    
    /**
     * Handle keyboard navigation
     * @param {KeyboardEvent} e - Keyboard event
     */
    handleKeydown(e) {
        if (e.key === 'ArrowLeft') {
            this.prev();
        } else if (e.key === 'ArrowRight') {
            this.next();
        }
    }
    
    /**
     * Navigate to the previous slide
     */
    prev() {
        this.goToSlide(this.currentIndex - 1);
    }
    
    /**
     * Navigate to the next slide
     */
    next() {
        this.goToSlide(this.currentIndex + 1);
    }
    
    /**
     * Navigate to a specific slide
     * @param {number} index - Index of the target slide
     */
    goToSlide(index) {
        // Handle edge cases with looping
        if (index < 0) {
            index = this.slides.length - this.slidesToShow;
        } else if (index > this.slides.length - this.slidesToShow) {
            index = 0;
        }
        
        // Update current index
        this.currentIndex = index;
        
        // Update carousel display
        this.updateCarousel();
        
        // Reset autoplay if enabled
        if (this.config.autoplay) {
            this.resetAutoplay();
        }
    }
    
    /**
     * Update the carousel display
     */
    updateCarousel() {
        // Calculate new position
        const newPosition = -this.currentIndex * this.slideWidth;
        
        // Apply the transform
        this.track.style.transform = `translateX(${newPosition}px)`;
        
        // Update indicators
        this.updateIndicators();
        
        // Update aria attributes
        this.updateAriaAttributes();
    }
    
    /**
     * Update the indicator dots
     */
    updateIndicators() {
        if (!this.indicatorsContainer) return;
        
        // Get all indicators
        const indicators = this.indicatorsContainer.querySelectorAll('.indicator');
        
        // Update active state
        indicators.forEach((indicator, index) => {
            if (index === this.currentIndex) {
                indicator.classList.add('active');
                indicator.setAttribute('aria-current', 'true');
            } else {
                indicator.classList.remove('active');
                indicator.removeAttribute('aria-current');
            }
        });
    }
    
    /**
     * Update aria attributes for accessibility
     */
    updateAriaAttributes() {
        this.slides.forEach((slide, index) => {
            const isVisible = index === this.currentIndex;
            slide.setAttribute('aria-hidden', isVisible ? 'false' : 'true');
            slide.setAttribute('tabindex', isVisible ? '0' : '-1');
        });
    }
    
    /**
     * Handle touch start event
     * @param {TouchEvent} e - Touch event
     */
    touchStart(e) {
        this.isDragging = true;
        this.startPos = e.touches[0].clientX;
        this.animationID = requestAnimationFrame(this.animation.bind(this));
        
        // Stop autoplay during dragging
        if (this.config.autoplay) {
            this.stopAutoplay();
        }
    }
    
    /**
     * Handle touch move event
     * @param {TouchEvent} e - Touch event
     */
    touchMove(e) {
        if (!this.isDragging) return;
        
        const currentPosition = e.touches[0].clientX;
        this.currentTranslate = this.prevTranslate + currentPosition - this.startPos;
        
        // Prevent scrolling while dragging
        e.preventDefault();
    }
    
    /**
     * Handle touch end event
     */
    touchEnd() {
        this.isDragging = false;
        cancelAnimationFrame(this.animationID);
        
        // Calculate movement
        const movedBy = this.currentTranslate - this.prevTranslate;
        
        // Determine if the movement is enough to change slide
        if (movedBy < -50) {
            this.next();
        } else if (movedBy > 50) {
            this.prev();
        } else {
            // Go back to current slide if movement wasn't significant
            this.goToSlide(this.currentIndex);
        }
        
        // Restart autoplay if enabled
        if (this.config.autoplay) {
            this.startAutoplay();
        }
    }
    
    /**
     * Animation loop for smooth dragging
     */
    animation() {
        if (this.isDragging) {
            this.track.style.transform = `translateX(${this.currentTranslate}px)`;
            requestAnimationFrame(this.animation.bind(this));
        }
    }
    
    /**
     * Handle window resize
     */
    handleResize() {
        // Clear transition during resize to prevent jumpiness
        this.track.style.transition = 'none';
        
        // Update carousel based on new dimensions
        this.updateResponsiveSettings();
        this.calculateSlideWidth();
        
        // Make sure current index is valid after resize
        if (this.currentIndex > this.slides.length - this.slidesToShow) {
            this.currentIndex = this.slides.length - this.slidesToShow;
        }
        
        // Update carousel display
        this.updateCarousel();
        
        // Reset transition after a small delay
        setTimeout(() => {
            this.track.style.transition = 'transform 0.4s ease-in-out';
        }, 50);
    }
    
    /**
     * Start autoplay
     */
    startAutoplay() {
        if (!this.config.autoplay) return;
        
        this.autoplayInterval = setInterval(() => {
            this.next();
        }, this.config.autoplaySpeed);
    }
    
    /**
     * Stop autoplay
     */
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
    
    /**
     * Reset autoplay timer
     */
    resetAutoplay() {
        this.stopAutoplay();
        this.startAutoplay();
    }
}

// Initialize the carousel when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const carousel = new ServiceCarousel({
        // You can override default options here
        autoplay: false,
        autoplaySpeed: 4000
    });
});

  