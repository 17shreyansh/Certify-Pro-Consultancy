/*===== MENU SHOW/HIDE =====*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelectorAll('.luxury-nav__link');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');
        navToggle.classList.toggle('active');
    });
}

// Handle dropdown toggles
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const dropdown = toggle.closest('.dropdown');
        const isActive = dropdown.classList.contains('active');
        
        // On mobile, close all other dropdowns first
        if (window.innerWidth <= 968) {
            document.querySelectorAll('.dropdown').forEach(d => {
                if (d !== dropdown) {
                    d.classList.remove('active');
                }
            });
        }
        
        // Toggle current dropdown
        dropdown.classList.toggle('active', !isActive);
    });
});

// Close menu when clicking on non-dropdown links
if (navLinks.length > 0) {
    navLinks.forEach(link => {
        if (!link.classList.contains('dropdown-toggle')) {
            link.addEventListener('click', () => {
                if (navMenu) navMenu.classList.remove('show-menu');
                if (navToggle) navToggle.classList.remove('active');
                // Close all dropdowns
                document.querySelectorAll('.dropdown').forEach(d => {
                    d.classList.remove('active');
                });
            });
        }
    });
}

// Handle dropdown menu item clicks
document.querySelectorAll('.dropdown__menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) navMenu.classList.remove('show-menu');
        if (navToggle) navToggle.classList.remove('active');
        document.querySelectorAll('.dropdown').forEach(d => {
            d.classList.remove('active');
        });
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const isClickInsideNav = navMenu && navMenu.contains(e.target);
    const isClickOnToggle = navToggle && navToggle.contains(e.target);
    const isClickOnDropdown = e.target.closest('.dropdown');
    
    // Close mobile menu if clicking outside
    if (!isClickInsideNav && !isClickOnToggle) {
        if (navMenu) navMenu.classList.remove('show-menu');
        if (navToggle) navToggle.classList.remove('active');
    }
    
    // Close dropdowns if clicking outside (mobile only)
    if (window.innerWidth <= 968 && !isClickOnDropdown) {
        document.querySelectorAll('.dropdown').forEach(d => {
            d.classList.remove('active');
        });
    }
});

/*===== DESKTOP DROPDOWN HOVER =====*/
// Add hover functionality for desktop only
let desktopDropdownListeners = [];

function initDesktopDropdowns() {
    // Clear existing listeners
    desktopDropdownListeners.forEach(({ element, type, handler }) => {
        element.removeEventListener(type, handler);
    });
    desktopDropdownListeners = [];
    
    if (window.innerWidth > 968) {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            const mouseEnterHandler = () => {
                dropdown.classList.add('active');
            };
            
            const mouseLeaveHandler = () => {
                dropdown.classList.remove('active');
            };
            
            dropdown.addEventListener('mouseenter', mouseEnterHandler);
            dropdown.addEventListener('mouseleave', mouseLeaveHandler);
            
            // Store listeners for cleanup
            desktopDropdownListeners.push(
                { element: dropdown, type: 'mouseenter', handler: mouseEnterHandler },
                { element: dropdown, type: 'mouseleave', handler: mouseLeaveHandler }
            );
        });
    } else {
        // Close all dropdowns on mobile
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
}

// Initialize on load and resize
window.addEventListener('load', initDesktopDropdowns);
window.addEventListener('resize', debounce(initDesktopDropdowns, 250));

/*===== SCROLL HEADER =====*/
function scrollHeader() {
    const header = document.getElementById('header');
    const luxuryHeader = document.querySelector('.luxury-header');
    
    if (header && this.scrollY >= 50) header.classList.add('scroll-header');
    else if (header) header.classList.remove('scroll-header');
    
    if (luxuryHeader) luxuryHeaderScroll();
}
window.addEventListener('scroll', scrollHeader);

/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');
        const activeLink = document.querySelector('.luxury-nav__menu a[href*=' + sectionId + ']') || document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if (activeLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                activeLink.classList.add('active-link');
            } else {
                activeLink.classList.remove('active-link');
            }
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*===== SMOOTH SCROLLING =====*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/*===== HERO SLIDER =====*/
const heroSwiper = new Swiper('.hero-slider', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    speed: 1000,
});

/*===== TESTIMONIALS SLIDER =====*/
const testimonialsSwiper = new Swiper('.testimonials-slider', {
    loop: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.testimonials-slider .swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.testimonials-slider .swiper-button-next',
        prevEl: '.testimonials-slider .swiper-button-prev',
    },
    slidesPerView: 1,
    spaceBetween: 30,
    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

/*===== CONTACT FORM =====*/
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show success message
        showNotification('Message sent successfully! We will get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

/*===== NOTIFICATION SYSTEM =====*/
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__message">${message}</span>
            <button class="notification__close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 400px;
        }
        .notification--success {
            border-left: 4px solid #4CAF50;
        }
        .notification--error {
            border-left: 4px solid #f44336;
        }
        .notification__content {
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .notification__message {
            color: #333;
            font-weight: 500;
        }
        .notification__close {
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: #999;
            margin-left: 15px;
        }
        .notification.show {
            transform: translateX(0);
        }
    `;
    document.head.appendChild(style);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto hide
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
    
    // Close button
    notification.querySelector('.notification__close').addEventListener('click', () => {
        hideNotification(notification);
    });
}

function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

/*===== PARTICLES ANIMATION =====*/
function createParticles() {
    const particlesContainer = document.querySelector('.hero__particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        particlesContainer.appendChild(particle);
    }
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.5; }
            50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

/*===== PROCESS ANIMATION =====*/
function animateProcess() {
    const processSteps = document.querySelectorAll('.process__step');
    const processLines = document.querySelectorAll('.process__line');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Animate connecting line
                    if (processLines[index]) {
                        setTimeout(() => {
                            processLines[index].style.width = 'calc(100% - 100px)';
                        }, 300);
                    }
                }, index * 200);
            }
        });
    }, { threshold: 0.5 });
    
    processSteps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(50px)';
        step.style.transition = 'all 0.6s ease';
        observer.observe(step);
    });
    
    processLines.forEach(line => {
        line.style.width = '0';
        line.style.transition = 'width 0.8s ease';
    });
}

/*===== COUNTER ANIMATION =====*/
function animateCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-counter'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current);
                }, 16);
                
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

/*===== FORM ENHANCEMENTS =====*/
function enhanceForms() {
    const formInputs = document.querySelectorAll('.form__input');
    
    formInputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Add validation
        input.addEventListener('input', function() {
            validateField(this);
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;
    
    // Remove existing error
    field.classList.remove('error');
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Validation rules
    if (field.hasAttribute('required') && value === '') {
        isValid = false;
        showFieldError(field, 'This field is required');
    } else if (type === 'email' && value !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            showFieldError(field, 'Please enter a valid email address');
        }
    } else if (type === 'tel' && value !== '') {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) {
            isValid = false;
            showFieldError(field, 'Please enter a valid phone number');
        }
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('error');
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    field.parentElement.appendChild(errorElement);
    
    // Add error styles
    const style = document.createElement('style');
    style.textContent = `
        .form__input.error {
            border-color: #f44336;
            box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.1);
        }
        .error-message {
            color: #f44336;
            font-size: 0.875rem;
            margin-top: 0.5rem;
            display: block;
        }
        .form__group.focused .form__input {
            border-color: var(--primary-color);
        }
    `;
    if (!document.querySelector('#form-validation-styles')) {
        style.id = 'form-validation-styles';
        document.head.appendChild(style);
    }
}

/*===== LOADING ANIMATION =====*/
function showLoading() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <p>Loading...</p>
        </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.95);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            transition: opacity 0.3s ease;
        }
        .loader-content {
            text-align: center;
        }
        .loader-spinner {
            width: 50px;
            height: 50px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(loader);
    
    return loader;
}

function hideLoading(loader) {
    loader.style.opacity = '0';
    setTimeout(() => {
        if (loader.parentNode) {
            loader.parentNode.removeChild(loader);
        }
    }, 300);
}

/*===== LUXURY HERO ANIMATIONS =====*/
function initLuxuryHero() {
    const slides = document.querySelectorAll('.content-slide');
    const heroBg = document.querySelector('.luxury-hero__bg');
    let currentSlide = 0;
    
    function changeSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    // Auto-change slides
    setInterval(changeSlide, 4000);
    
    // GSAP Timeline for initial animation
    const tl = gsap.timeline();
    
    gsap.set('.luxury-hero__glass', { scale: 0.8, opacity: 0 });
    gsap.set('.luxury-hero__buttons', { x: -30, opacity: 0 });
    gsap.set('.scroll-indicator', { y: 20, opacity: 0 });
    gsap.set('.service-card', { x: 100, opacity: 0 });
    
    tl.to('.luxury-hero__glass', {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out'
    })
    .to('.luxury-hero__buttons', {
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out'
    }, '-=0.3')
    .to('.service-card', {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
    }, '-=0.4')
    .to('.scroll-indicator', {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out'
    }, '-=0.2');
    
    // Floating orbs animation
    gsap.to('.gradient-orb--1', {
        x: 50,
        y: -50,
        rotation: 180,
        duration: 20,
        ease: 'none',
        repeat: -1,
        yoyo: true
    });
    
    gsap.to('.gradient-orb--2', {
        x: -30,
        y: 30,
        rotation: -120,
        duration: 25,
        ease: 'none',
        repeat: -1,
        yoyo: true
    });
    
    gsap.to('.gradient-orb--3', {
        x: 20,
        y: -20,
        rotation: 90,
        duration: 30,
        ease: 'none',
        repeat: -1,
        yoyo: true
    });
}

/*===== LUXURY HEADER SCROLL =====*/
function luxuryHeaderScroll() {
    const header = document.querySelector('.luxury-header');
    if (!header) return;
    
    if (window.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}

/*===== LUXURY BUTTON INTERACTIONS =====*/
function initLuxuryButtons() {
    const buttons = document.querySelectorAll('.btn-luxury');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('click', () => {
            gsap.to(button, {
                scale: 0.95,
                duration: 0.1,
                ease: 'power2.out',
                yoyo: true,
                repeat: 1
            });
        });
    });
}

/*===== INITIALIZE =====*/
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile touch enhancements
    initMobileTouchEnhancements();
    
    // Initialize luxury animations
    if (document.querySelector('.luxury-hero')) {
        initLuxuryHero();
        initLuxuryButtons();
    }
    
    // Initialize AOS for other sections
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
    
    // Initialize animations
    createParticles();
    animateProcess();
    animateCounters();
    enhanceForms();
    
    // Initialize dropdown functionality
    initDesktopDropdowns();
    
    // Page loaded
    window.addEventListener('load', function() {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            hideLoading(loader);
        }
    });
});

/*===== PERFORMANCE OPTIMIZATIONS =====*/
// Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    scrollHeader();
    scrollActive();
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Close dropdowns on scroll (mobile only)
window.addEventListener('scroll', debounce(() => {
    if (window.innerWidth <= 968) {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
}, 100));

/*===== MOBILE TOUCH ENHANCEMENTS =====*/
// Add touch-friendly behavior for mobile devices
function initMobileTouchEnhancements() {
    if ('ontouchstart' in window) {
        // Add touch class to body for CSS targeting
        document.body.classList.add('touch-device');
        
        // Prevent double-tap zoom on buttons
        document.querySelectorAll('button, .btn, .luxury-nav__link').forEach(element => {
            element.addEventListener('touchend', function(e) {
                e.preventDefault();
                this.click();
            });
        });
        
        // Improve dropdown touch behavior
        document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
            toggle.addEventListener('touchstart', function(e) {
                e.stopPropagation();
            });
        });
    }
}

/*===== ACCESSIBILITY ENHANCEMENTS =====*/
// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close mobile menu
        if (navMenu) navMenu.classList.remove('show-menu');
        if (navToggle) navToggle.classList.remove('active');
        
        // Close any open dropdowns
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

// Focus management
function manageFocus() {
    const focusableElements = document.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

manageFocus();