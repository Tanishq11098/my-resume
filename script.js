/* ===========================================
   EXECUTIVE PORTFOLIO - JAVASCRIPT
   =========================================== */

'use strict';

// ============================================
// Dynamic Year in Footer
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// ============================================
// Smooth Scrolling for Navigation Links
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// Accessible Image Lightbox Modal
// ============================================

class ImageLightbox {
    constructor() {
        this.modal = document.getElementById('imageModal');
        this.modalImage = document.getElementById('modalImage');
        this.closeBtn = document.getElementById('closeBtn');
        this.galleryImages = document.querySelectorAll('.gallery-image');
        
        if (!this.modal || !this.closeBtn) {
            console.warn('Modal elements not found');
            return;
        }

        this.init();
    }

    init() {
        // Click on gallery images to open modal
        this.galleryImages.forEach(img => {
            img.addEventListener('click', (e) => this.openModal(e.target));
            
            // Keyboard accessibility: Enter or Space to open
            img.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.openModal(e.target);
                }
            });
        });

        // Close button
        this.closeBtn.addEventListener('click', () => this.closeModal());

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });

        // Close on background click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
    }

    openModal(imageElement) {
        this.modalImage.src = imageElement.src;
        this.modalImage.alt = imageElement.alt;
        this.modal.classList.add('active');
        this.modal.setAttribute('aria-hidden', 'false');
        
        // Focus close button for keyboard users
        this.closeBtn.focus();
        
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.classList.remove('active');
        this.modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}

// Initialize lightbox
document.addEventListener('DOMContentLoaded', function() {
    new ImageLightbox();
});

// ============================================
// Navbar Scroll Detection (Optional Enhancement)
// ============================================

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (navbar) {
        if (currentScroll > 50) {
            navbar.style.borderBottomColor = 'rgba(100, 181, 246, 0.2)';
        } else {
            navbar.style.borderBottomColor = 'rgba(100, 181, 246, 0.1)';
        }
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// ============================================
// Performance: Intersection Observer for Lazy Loading
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// Utility: Log Performance Metrics
// ============================================

window.addEventListener('load', function() {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const resourcesLoadTime = perfData.responseEnd - perfData.fetchStart;
        
        console.log('Page Load Time: ' + pageLoadTime + 'ms');
        console.log('Resources Load Time: ' + resourcesLoadTime + 'ms');
    }
});

// ============================================
// Accessibility: Keyboard Navigation Enhancement
// ============================================

document.addEventListener('keydown', function(e) {
    // Skip to main content shortcut (Alt + M)
    if (e.altKey && e.key === 'm') {
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.focus();
        }
    }
});

// ============================================
// Error Handling: Image Fallback
// ============================================

document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        console.warn('Image failed to load: ' + this.src);
        // Optional: Set a placeholder or fallback
        this.style.backgroundColor = 'rgba(100, 181, 246, 0.1)';
        this.alt = 'Image unavailable';
    });
});
