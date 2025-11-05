/**
 * MULTVIT E-commerce - JavaScript
 * Handles interactions, animations, and dynamic behaviors
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initNewsletterForm();
    initSmoothScroll();
    initHeaderScroll();
});

/**
 * Navigation Menu Toggle (Mobile)
 */
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');

            // Animate toggle button
            const spans = navToggle.querySelectorAll('span');
            if (navToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
    }
}

/**
 * Header Background on Scroll
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add shadow when scrolled
        if (currentScroll > 50) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        }

        lastScroll = currentScroll;
    });
}

/**
 * Scroll Animations - Intersection Observer
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');

                // Add stagger animation for children if they exist
                const children = entry.target.querySelectorAll('.stagger-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Observe cards
    const cards = document.querySelectorAll('.product-card, .feature-item, .testimonial-card');
    cards.forEach(card => {
        card.classList.add('stagger-item');
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Skip if href is just "#"
            if (href === '#' || href === '#quiz') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Newsletter Form Handler
 */
function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const input = form.querySelector('input[type="email"]');
            const button = form.querySelector('button');
            const email = input.value;

            // Simple email validation
            if (validateEmail(email)) {
                // Simulate form submission
                button.textContent = 'Inscrevendo...';
                button.disabled = true;

                setTimeout(() => {
                    button.textContent = 'Inscrito! ✓';
                    button.style.backgroundColor = '#9FCCB8';
                    input.value = '';

                    setTimeout(() => {
                        button.textContent = 'Inscrever';
                        button.disabled = false;
                        button.style.backgroundColor = '';
                    }, 3000);
                }, 1500);
            } else {
                showError(input, 'Por favor, insira um e-mail válido.');
            }
        });
    }
}

/**
 * Email Validation
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Show Error Message
 */
function showError(input, message) {
    // Remove existing error if present
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Create and show error message
    const error = document.createElement('span');
    error.className = 'error-message';
    error.textContent = message;
    error.style.color = '#EF4444';
    error.style.fontSize = '0.875rem';
    error.style.marginTop = '0.5rem';
    error.style.display = 'block';

    input.parentElement.appendChild(error);
    input.style.borderColor = '#EF4444';

    // Remove error after 3 seconds
    setTimeout(() => {
        error.remove();
        input.style.borderColor = '';
    }, 3000);
}

/**
 * Product Card Hover Effects
 */
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

/**
 * Button Click Animations
 */
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.6s ease-out';

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/**
 * Parallax Effect for Hero Background
 */
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');

    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

/**
 * Lazy Loading for Images
 */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/**
 * Scroll Progress Indicator
 */
function updateScrollProgress() {
    const scrollProgress = document.createElement('div');
    scrollProgress.id = 'scroll-progress';
    scrollProgress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #2D5F5D, #9FCCB8);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(scrollProgress);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
}

updateScrollProgress();

/**
 * Add to Cart Functionality (Placeholder)
 */
document.querySelectorAll('.btn-product').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();

        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;

        // Show notification
        showNotification(`${productName} adicionado ao carrinho!`);
    });
});

/**
 * Show Notification
 */
function showNotification(message) {
    // Remove existing notification if present
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background-color: #2D5F5D;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add notification animations
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyle);

/**
 * Console Message
 */
console.log('%cMULTVIT E-commerce', 'font-size: 24px; font-weight: bold; color: #2D5F5D;');
console.log('%cNutrição inteligente. Resultados reais.', 'font-size: 14px; color: #6B7280;');
