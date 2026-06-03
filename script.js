/* ═════════════════════════════════════════════════════════════════
   PROFESSIONAL PORTFOLIO JAVASCRIPT
   Smooth scroll, lightweight lightbox, dynamic copyright year
   ═════════════════════════════════════════════════════════════════ */

// Update footer year dynamically
document.addEventListener('DOMContentLoaded', function() {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

/* ═════════════════════════════════════════════════════════════════
   LIGHTWEIGHT LIGHTBOX
   ═════════════════════════════════════════════════════════════════ */

class LightboxManager {
    constructor() {
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImage = document.getElementById('lightbox-image');
        this.currentIndex = 0;
        this.galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
        this.init();
    }

    init() {
        // Attach click listeners to gallery items
        this.galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => this.open(index));
        });

        // Lightbox controls
        const closeBtn = this.lightbox.querySelector('.lightbox-close');
        const backdrop = this.lightbox.querySelector('.lightbox-backdrop');
        const prevBtn = document.getElementById('lightbox-prev');
        const nextBtn = document.getElementById('lightbox-next');

        closeBtn.addEventListener('click', () => this.close());
        backdrop.addEventListener('click', () => this.close());
        prevBtn.addEventListener('click', () => this.previous());
        nextBtn.addEventListener('click', () => this.next());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
    }

    open(index) {
        this.currentIndex = index;
        const item = this.galleryItems[index];
        const img = item.querySelector('.gallery-image');
        
        this.lightboxImage.src = img.src;
        this.lightboxImage.alt = img.alt;
        
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.galleryItems.length;
        this.open(this.currentIndex);
    }

    previous() {
        this.currentIndex = (this.currentIndex - 1 + this.galleryItems.length) % this.galleryItems.length;
        this.open(this.currentIndex);
    }

    handleKeydown(e) {
        if (!this.lightbox.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape':
                this.close();
                break;
            case 'ArrowRight':
                this.next();
                break;
            case 'ArrowLeft':
                this.previous();
                break;
        }
    }
}

// Initialize lightbox
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new LightboxManager();
    });
} else {
    new LightboxManager();
}
