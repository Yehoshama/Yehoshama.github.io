/**
 * Yehoshama.com — Main JavaScript
 * Navigation, particles, animations, chatbot toggle, i18n, blog tree, form validation
 */

document.addEventListener('DOMContentLoaded', () => {

    // ── Disclaimer Popup ──
    // Note: Do not show on the license page itself to avoid a loop.
    if (!window.location.pathname.includes('license.html')) {
        const disclaimerAgreed = sessionStorage.getItem('yehoshama-disclaimer-agreed');
        if (!disclaimerAgreed) {
            const overlay = document.createElement('div');
            overlay.className = 'disclaimer-overlay';
            overlay.innerHTML = `
                <div class="disclaimer-modal">
                    <h2>⚠️ Construction Warning ⚠️</h2>
                    <p>This website is currently under active development. The information contained herein may be inaccurate, incomplete, or merely placeholder text.</p>
                    <p>By proceeding, you agree to our <a href="license.html" style="color: var(--primary); text-decoration: underline;">Temporary License & Disclaimer</a> and acknowledge that we hold no liability for anything presented here.</p>
                    <div class="disclaimer-buttons">
                        <button id="btn-decline" class="btn btn-outline" style="min-width: 140px;">I Disagree</button>
                        <button id="btn-accept" class="btn btn-primary" style="min-width: 140px;">I Understand and Agree</button>
                    </div>
                </div>
            `;
            document.body.appendChild(overlay);
            document.body.style.overflow = 'hidden'; // Prevent scrolling

            document.getElementById('btn-accept').addEventListener('click', () => {
                sessionStorage.setItem('yehoshama-disclaimer-agreed', 'true');
                overlay.remove();
                document.body.style.overflow = '';
            });

            document.getElementById('btn-decline').addEventListener('click', () => {
                // Redirect user to an external page explaining why they can't browse
                alert("You must agree to the terms to view this website while it is under construction.");
                window.location.href = "https://en.wikipedia.org/wiki/Disclaimer";
            });
        }
    }

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
 * Colorful floating dots with connecting lines — techy background effect
 * Particles react to mouse position (push away)
 */
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    // Disable particle system completely on mobile for performance
    if (window.innerWidth < 768) {
        canvas.style.display = 'none';
        return;
    }

    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];
    let width, height;

    // High-saturation techy color palette
    const colors = [
        { r: 0, g: 255, b: 255 },     // Cyan
        { r: 255, g: 0, b: 200 },      // Magenta / Hot Pink
        { r: 0, g: 255, b: 128 },      // Lime / Mint
        { r: 80, g: 120, b: 255 },     // Electric Blue
        { r: 255, g: 160, b: 0 },      // Orange
        { r: 160, g: 80, b: 255 },     // Purple
        { r: 0, g: 200, b: 255 },      // Sky Cyan
        { r: 255, g: 80, b: 80 },      // Coral Red
        { r: 128, g: 255, b: 0 },      // Neon Green
        { r: 255, g: 255, b: 0 },      // Yellow
    ];

    // Configuration
    const config = {
        particleCount: 150,
        maxSpeed: 0.35,
        minSize: 1.5,
        maxSize: 3,
        glowRadius: 18,       // Glow halo radius multiplier
        lineDistance: 140,
        lineWidth: 1,
        lineGlow: 12,         // Increased shadow blur for line glow
        lineOpacity: 0.35,    // Increased line opacity
        mouseRadius: 250,
        mouseForce: 3,
        homeForce: 0.003,
    };

    let mouse = { x: null, y: null };

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function createParticle(index, total) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        // Distribute home positions evenly across the canvas
        const cols = Math.ceil(Math.sqrt(total * (width / height)));
        const rows = Math.ceil(total / cols);
        const col = index % cols;
        const row = Math.floor(index / cols);
        const homeX = (col + 0.5) * (width / cols) + (Math.random() - 0.5) * (width / cols) * 0.6;
        const homeY = (row + 0.5) * (height / rows) + (Math.random() - 0.5) * (height / rows) * 0.6;
        return {
            x: homeX,
            y: homeY,
            homeX: homeX,
            homeY: homeY,
            vx: (Math.random() - 0.5) * config.maxSpeed * 2,
            vy: (Math.random() - 0.5) * config.maxSpeed * 2,
            size: Math.random() * (config.maxSize - config.minSize) + config.minSize,
            opacity: Math.random() * 0.5 + 0.4,
            color: color,
        };
    }

    function init() {
        resize();
        particles = [];
        for (let i = 0; i < config.particleCount; i++) {
            particles.push(createParticle(i, config.particleCount));
        }
    }

    function drawParticle(p) {
        const { r, g, b } = p.color;

        // Outer glow halo (radial gradient) - reduced opacity by ~50%
        const glowR = p.size * config.glowRadius;
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${p.opacity * 0.25})`);
        gradient.addColorStop(0.15, `rgba(${r}, ${g}, ${b}, ${p.opacity * 0.1})`);
        gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${p.opacity * 0.02})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Bright core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.opacity * 0.9})`;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.8)`;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    function drawLines() {
        ctx.save();
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < config.lineDistance) {
                    const opacity = (1 - (dist / config.lineDistance)) * config.lineOpacity;
                    const ci = particles[i].color;
                    const cj = particles[j].color;
                    const mr = Math.round((ci.r + cj.r) / 2);
                    const mg = Math.round((ci.g + cj.g) / 2);
                    const mb = Math.round((ci.b + cj.b) / 2);
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(${mr}, ${mg}, ${mb}, ${opacity})`;
                    ctx.lineWidth = config.lineWidth;
                    ctx.shadowColor = `rgba(${mr}, ${mg}, ${mb}, ${opacity * 2})`;
                    ctx.shadowBlur = config.lineGlow;
                    ctx.stroke();
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
                    const opacity = (1 - (dist / config.mouseRadius)) * 0.3;
                    const c = particles[i].color;
                    ctx.beginPath();
                    ctx.moveTo(mouse.x, mouse.y);
                    ctx.lineTo(particles[i].x, particles[i].y);
                    ctx.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.shadowColor = `rgba(${c.r}, ${c.g}, ${c.b}, ${opacity * 2})`;
                    ctx.shadowBlur = 10;
                    ctx.stroke();
                }
            }
        }
        ctx.restore();
    }

    function update() {
        for (const p of particles) {
            // Mouse repulsion — particles push away from cursor
            if (mouse.x !== null) {
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < config.mouseRadius && dist > 0) {
                    const force = (config.mouseRadius - dist) / config.mouseRadius * config.mouseForce;
                    p.vx += (dx / dist) * force * 0.02;
                    p.vy += (dy / dist) * force * 0.02;
                }
            }

            // Redistribution: gently pull back toward home position
            const hx = p.homeX - p.x;
            const hy = p.homeY - p.y;
            p.vx += hx * config.homeForce;
            p.vy += hy * config.homeForce;

            // Apply velocity with damping
            p.vx *= 0.98;
            p.vy *= 0.98;

            // Clamp speed
            const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            if (speed > config.maxSpeed * 3) {
                p.vx = (p.vx / speed) * config.maxSpeed * 3;
                p.vy = (p.vy / speed) * config.maxSpeed * 3;
            }

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
