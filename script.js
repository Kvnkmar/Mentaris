// ==================== MENTARIS - Premium Website JavaScript ====================
// Particle animations, Neural logo, Scroll effects, Premium interactions

// ==================== Preloader ====================
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    
    // Minimum display time of 2.5 seconds for smooth animation completion
    setTimeout(() => {
        preloader.classList.add('fade-out');
        
        // Remove preloader from DOM after fade out
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 600);
    }, 2500);
});

// ==================== Particle Canvas Animation ====================
const canvas = document.getElementById('particleCanvas');
if (!canvas) {
    console.warn('Particle canvas not found');
}
const ctx = canvas ? canvas.getContext('2d') : null;

// Set canvas size
function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
if (canvas) {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
}

// Particle class
class Particle {
    constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
        if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(8, 216, 201, ${this.opacity})`;
        ctx.fill();
    }
}

// Create particles
const particles = [];
const particleCount = 60;

if (canvas && ctx) {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

// Connect nearby particles with optimized distance check
const connectionDistance = 150;
const connectionDistanceSq = connectionDistance * connectionDistance;

function connectParticles() {
    if (!ctx) return;
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distanceSq = dx * dx + dy * dy;

            if (distanceSq < connectionDistanceSq) {
                const distance = Math.sqrt(distanceSq);
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(8, 216, 201, ${0.15 * (1 - distance / connectionDistance)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}

// Animation loop
function animateParticles() {
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    connectParticles();

    requestAnimationFrame(animateParticles);
}

if (canvas && ctx) {
    animateParticles();
}

// ==================== Navbar Scroll Effect ====================
const navbar = document.querySelector('.navbar-luxury');

function handleNavbarScroll() {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}


// ==================== Fade Reveal Animation (Subtle Left Slide) ====================
function initFadeReveal() {
    const fadeElements = document.querySelectorAll('.fade-reveal');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Don't unobserve so animation can repeat if needed
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
}

// ==================== Mobile Menu Toggle ====================
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (!menuToggle || !mobileMenu) return;
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu on outside click
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        }
    });
}

// ==================== Service Card Hover Effects ====================
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card-premium');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ==================== Value Card Hover Effects ====================
function initValueCards() {
    const valueCards = document.querySelectorAll('.value-card-luxury');
    
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ==================== Cursor Trail Effect (Desktop Only) ====================
let cursorTrail = [];
const maxTrailLength = 8;

function createCursorTrail(e) {
    if (window.innerWidth > 1024) {
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: rgba(8, 216, 201, 0.4);
            pointer-events: none;
            z-index: 9999;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            transform: translate(-50%, -50%);
            animation: trailFade 0.6s ease-out forwards;
        `;
        
        document.body.appendChild(trail);
        cursorTrail.push(trail);
        
        if (cursorTrail.length > maxTrailLength) {
            const oldTrail = cursorTrail.shift();
            oldTrail.remove();
        }
        
        setTimeout(() => {
            trail.remove();
        }, 600);
    }
}

// Add cursor trail animation
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    @keyframes trailFade {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
        }
    }
`;
document.head.appendChild(cursorStyle);

// ==================== Button Ripple Effect ====================
function createRipple(event) {
    const button = event.currentTarget;
    
    // Skip if button already has a ripple
    if (button.querySelector('.ripple-effect')) return;
    
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.25);
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        animation: rippleEffect 0.6s ease-out;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleEffect {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(2.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Apply ripple to all buttons
function initRippleEffect() {
    const buttons = document.querySelectorAll('.button-primary, .button-secondary, .btn-luxury-light, .btn-luxury-ghost');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
}


// ==================== Magnetic Button Effect (Desktop) ====================
function initMagneticButtons() {
    if (window.innerWidth <= 1024) return;
    
    const buttons = document.querySelectorAll('.button-primary, .btn-luxury-light');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) translateY(-4px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
}

// ==================== Contact Form Handler ====================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function() {
        // Get form button
        const submitBtn = form.querySelector('.btn-submit-premium');
        const btnText = submitBtn.querySelector('.btn-submit-text');

        // Show loading state (form will submit naturally via FormSubmit)
        btnText.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
    });

    // Add focus effects to form inputs
    const formInputs = form.querySelectorAll('.form-input, .form-select, .form-textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
}

// ==================== Scroll to Top Button ====================
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (!scrollToTopBtn) return;

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function handleScrollToTopVisibility() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (!scrollToTopBtn) return;

    if (window.pageYOffset > 400) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
}

// ==================== Initialize Everything ====================
function init() {
    // Initialize fade reveal
    initFadeReveal();

    // Initialize mobile menu
    initMobileMenu();

    // Initialize card effects
    initServiceCards();
    initValueCards();

    // Initialize ripple effect
    initRippleEffect();

    // Initialize magnetic buttons
    initMagneticButtons();

    // Initialize contact form
    initContactForm();

    // Initialize scroll to top button
    initScrollToTop();

    // Add event listeners
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        handleScrollToTopVisibility();
    });

    // Cursor trail (throttled)
    let throttleTimer;
    document.addEventListener('mousemove', (e) => {
        if (!throttleTimer) {
            throttleTimer = setTimeout(() => {
                createCursorTrail(e);
                throttleTimer = null;
            }, 60);
        }
    });

    // Initial calls
    handleNavbarScroll();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ==================== Page Load Animation ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// Set initial body opacity
document.body.style.opacity = '0';