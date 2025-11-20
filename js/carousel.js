// ========================================
// CAROUSEL.JS - Image Carousel Component
// ========================================

class Carousel {
    constructor(element) {
        this.carousel = element;
        this.items = this.carousel.querySelectorAll('.carousel-item');
        this.indicators = this.carousel.querySelectorAll('.carousel-control');
        this.prevBtn = this.carousel.querySelector('.carousel-nav.prev');
        this.nextBtn = this.carousel.querySelector('.carousel-nav.next');
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000; // 5 seconds

        this.init();
    }

    init() {
        if (this.items.length === 0) return;

        // Show first item
        this.showItem(0);

        // Setup navigation
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }

        // Setup indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToItem(index));
        });

        // Auto-play
        this.startAutoPlay();

        // Pause on hover
        this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());

        // Touch support for mobile
        this.initTouchSupport();
    }

    showItem(index) {
        // Remove active from all
        this.items.forEach(item => item.classList.remove('active'));
        this.indicators.forEach(indicator => indicator.classList.remove('active'));

        // Add active to current
        this.items[index].classList.add('active');
        if (this.indicators[index]) {
            this.indicators[index].classList.add('active');
        }

        this.currentIndex = index;
    }

    next() {
        const nextIndex = (this.currentIndex + 1) % this.items.length;
        this.showItem(nextIndex);
    }

    prev() {
        const prevIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.showItem(prevIndex);
    }

    goToItem(index) {
        this.showItem(index);
    }

    startAutoPlay() {
        this.stopAutoPlay(); // Clear any existing interval
        this.autoPlayInterval = setInterval(() => this.next(), this.autoPlayDelay);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    initTouchSupport() {
        let touchStartX = 0;
        let touchEndX = 0;

        this.carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        this.carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });

        const handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
        };

        this.handleSwipe = handleSwipe;
    }
}

// Initialize all carousels on page load
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => new Carousel(carousel));
});
