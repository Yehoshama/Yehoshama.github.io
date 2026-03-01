/**
 * Yehoshama.com — Main JavaScript
 * Navigation, particles, animations, chatbot toggle, i18n, blog tree, form validation
 */

document.addEventListener('DOMContentLoaded', () => {

    // ── Year Auto-fill ──
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ── Mobile Hamburger Nav ──
    const hamburger = document.getElementById('hamburger-toggle');
    const siteNav = document.getElementById('site-nav');
    const navOverlay = document.getElementById('nav-overlay');

    function openMobileNav() {
        hamburger.classList.add('is-active');
        siteNav.classList.add('is-open');
        if (navOverlay) navOverlay.classList.add('is-visible');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileNav() {
        hamburger.classList.remove('is-active');
        siteNav.classList.remove('is-open');
        if (navOverlay) navOverlay.classList.remove('is-visible');
        document.body.style.overflow = '';
    }

    if (hamburger && siteNav) {
        hamburger.addEventListener('click', () => {
            if (siteNav.classList.contains('is-open')) {
                closeMobileNav();
            } else {
                openMobileNav();
            }
        });

        if (navOverlay) {
            navOverlay.addEventListener('click', closeMobileNav);
        }

        siteNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMobileNav);
        });
    }

    // ── Scroll Reveal Animation ──
    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('is-visible'));
    }

    // ── Chatbot FAB Toggle ──
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotContainer = document.getElementById('chatbot-container');

    if (chatbotToggle && chatbotContainer) {
        chatbotToggle.addEventListener('click', () => {
            chatbotContainer.classList.toggle('is-open');
        });
    }

    // ── Blog Topic Tree Toggle ──
    document.querySelectorAll('.topic-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const isOpen = btn.classList.contains('is-open');
            const children = btn.nextElementSibling;

            if (isOpen) {
                btn.classList.remove('is-open');
                btn.setAttribute('aria-expanded', 'false');
                if (children) children.classList.remove('is-expanded');
            } else {
                btn.classList.add('is-open');
                btn.setAttribute('aria-expanded', 'true');
                if (children) children.classList.add('is-expanded');
            }
        });
    });

    // ── Contact Form Validation ──
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('contact-name');
            const email = document.getElementById('contact-email');
            const message = document.getElementById('contact-message');

            let isValid = true;

            [name, email, message].forEach(field => {
                if (field && !field.value.trim()) {
                    field.style.borderColor = 'var(--error)';
                    isValid = false;
                } else if (field) {
                    field.style.borderColor = 'var(--border-color)';
                }
            });

            if (email && email.value && !email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                email.style.borderColor = 'var(--error)';
                isValid = false;
            }

            if (isValid) {
                const submitBtn = document.getElementById('contact-submit');
                if (submitBtn) {
                    submitBtn.textContent = 'Message Sent ✓';
                    submitBtn.style.background = 'var(--success)';
                    submitBtn.disabled = true;
                }

                setTimeout(() => {
                    contactForm.reset();
                    if (submitBtn) {
                        submitBtn.textContent = 'Send Message';
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }
                }, 3000);
            }
        });

        contactForm.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('input', () => {
                field.style.borderColor = 'var(--border-color)';
            });
        });
    }

    // ── i18n Language Loader ──
    window.loadLanguage = async function (lang = 'en') {
        try {
            // Determine the correct path based on page depth
            const basePath = document.querySelector('link[rel="stylesheet"]')?.href || '';
            let i18nPath;

            if (basePath.includes('/products/') || basePath.includes('/blog/')) {
                i18nPath = `../../i18n/${lang}.json`;
            } else {
                i18nPath = `i18n/${lang}.json`;
            }

            const response = await fetch(i18nPath);
            if (!response.ok) return;

            const strings = await response.json();

            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (strings[key]) {
                    el.textContent = strings[key];
                }
            });

            // Handle RTL languages
            if (['he', 'ar'].includes(lang)) {
                document.documentElement.setAttribute('dir', 'rtl');
            } else {
                document.documentElement.setAttribute('dir', 'ltr');
            }

            // Update active button state
            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.lang === lang);
            });

            localStorage.setItem('yehoshama-lang', lang);
        } catch (err) {
            console.warn('i18n: Could not load language file', err);
        }
    };

    // Language switcher button clicks
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            if (lang) window.loadLanguage(lang);
        });
    });

    // Load saved language preference
    const savedLang = localStorage.getItem('yehoshama-lang');
    if (savedLang && savedLang !== 'en') {
        window.loadLanguage(savedLang);
    }

    // ── Header Scroll Shadow ──
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                header.style.boxShadow = '0 2px 16px rgba(20, 24, 36, 0.06)';
            } else {
                header.style.boxShadow = 'none';
            }
        }, { passive: true });
    }

    // ── Particle System ──
    initParticles();
});


/**
 * Canvas-based particle system
 * Floating dots with connecting lines — subtle techy background effect
 */
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];
    let width, height;

    // Configuration
    const config = {
        particleCount: 60,
        maxSpeed: 0.4,
        particleSize: 2,
        lineDistance: 150,
        lineWidth: 0.5,
        // Uses the teal accent color with low opacity
        particleColor: 'rgba(26, 107, 90, 0.35)',
        lineColor: 'rgba(26, 107, 90, 0.08)',
        mouseRadius: 180,
    };

    // Reduce particles on mobile for performance
    if (window.innerWidth < 768) {
        config.particleCount = 25;
        config.lineDistance = 100;
    }

    let mouse = { x: null, y: null };

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function createParticle() {
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * config.maxSpeed * 2,
            vy: (Math.random() - 0.5) * config.maxSpeed * 2,
            size: Math.random() * config.particleSize + 0.5,
            opacity: Math.random() * 0.5 + 0.3,
        };
    }

    function init() {
        resize();
        particles = [];
        for (let i = 0; i < config.particleCount; i++) {
            particles.push(createParticle());
        }
    }

    function drawParticle(p) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = config.particleColor;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
    }

    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < config.lineDistance) {
                    const opacity = 1 - (dist / config.lineDistance);
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = config.lineColor;
                    ctx.globalAlpha = opacity;
                    ctx.lineWidth = config.lineWidth;
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }

        // Lines from mouse to nearby particles
        if (mouse.x !== null) {
            for (let i = 0; i < particles.length; i++) {
                const dx = mouse.x - particles[i].x;
                const dy = mouse.y - particles[i].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < config.mouseRadius) {
                    const opacity = 1 - (dist / config.mouseRadius);
                    ctx.beginPath();
                    ctx.moveTo(mouse.x, mouse.y);
                    ctx.lineTo(particles[i].x, particles[i].y);
                    ctx.strokeStyle = 'rgba(26, 107, 90, 0.15)';
                    ctx.globalAlpha = opacity * 0.6;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }
    }

    function update() {
        for (const p of particles) {
            p.x += p.vx;
            p.y += p.vy;

            // Bounce off edges
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            // Keep in bounds
            p.x = Math.max(0, Math.min(width, p.x));
            p.y = Math.max(0, Math.min(height, p.y));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        update();
        drawLines();
        for (const p of particles) {
            drawParticle(p);
        }
        animId = requestAnimationFrame(animate);
    }

    // Event listeners
    window.addEventListener('resize', () => {
        resize();
        // Redistribute particles that ended up out of bounds
        for (const p of particles) {
            if (p.x > width) p.x = Math.random() * width;
            if (p.y > height) p.y = Math.random() * height;
        }
    });

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Pause when tab is hidden for performance
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animId);
        } else {
            animate();
        }
    });

    init();
    animate();
}
