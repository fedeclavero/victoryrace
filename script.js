/**
 * VICTORY RACE II — Modernized Script v2.0
 * Aesthetic: Neo-Brutalist / industrial
 */

// --- CONFIGURATION ---
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzBWqLv7mToPvKJU5dwcWHGyByXh_Q1MgNUsMdRQjPc13EjRUP-Swqi3ZvM4z-2fv3R/exec';
const BANK_ALIAS = "erick.cabrera.11";
const RACE_DATE = new Date("2026-09-11T08:00:00").getTime();
const PRICE_INDIVIDUAL = 50000;
const PRICE_TEAM = 90000;

// --- DYNAMIC DATA ---
const CATEGORY_TREE = {
    individual: {
        recreativo: ['Hombre', 'Mujer'],
        intermedio: ['Hombre', 'Mujer'],
        avanzado: ['Hombre', 'Mujer']
    },
    equipo: {
        principiante: ['Masculino', 'Femenino', 'Mixto'],
        intermedio: ['Masculino', 'Femenino', 'Mixto']
    }
};

let registrationData = {
    tipo: '',
    nivel: '',
    genero: '',
    aptos: {
        atleta1: '',
        atleta2: ''
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initCountdown();
    initScrollReveal();
    initNavCtaAnimation();
    initCtaAnimation();
    if (document.getElementById('inscription-form')) {
        initForm();
        initCategoryFlow();
        initFileUploads();
    }
    highlightActiveLink();
    if (document.getElementById('lightbox')) {
        initLightbox();
    }
});

// --- NAV CTA — ULTRA VIBRANT ANIMATION ---
function initNavCtaAnimation() {
    const navCtaBtn = document.querySelector('.nav-cta .btn');
    if (!navCtaBtn) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Entrance: scale from 0.8 + fade in
    navCtaBtn.style.opacity = '0';
    navCtaBtn.style.transform = 'scale(0.8)';
    anime({
        targets: navCtaBtn,
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 600,
        easing: 'easeOutBack',
        complete: () => startUrgentPulse()
    });

    let urgencyLoop = null;

    function startUrgentPulse() {
        // Urgent pulse every 4 seconds: quick scale burst + intense glow surge
        urgencyLoop = setInterval(() => {
            if (document.hidden) return;
            anime({
                targets: navCtaBtn,
                scale: [1, 1.12, 1],
                boxShadow: [
                    '0 0 8px rgba(0, 242, 255, 0.3)',
                    '0 0 30px rgba(0, 242, 255, 0.9)',
                    '0 0 10px rgba(0, 242, 255, 0.3)'
                ],
                duration: 500,
                easing: 'easeOutQuint'
            });
        }, 4000);
    }

    // Cleanup on page hide
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && urgencyLoop) {
            clearInterval(urgencyLoop);
            urgencyLoop = null;
        } else if (!document.hidden && !urgencyLoop) {
            startUrgentPulse();
        }
    });
}

// --- HERO CTA ANIMATION ---
function initCtaAnimation() {
    const heroActions = document.querySelector('.hero-actions');
    if (!heroActions) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const buttons = heroActions.querySelectorAll('.btn');
    if (!buttons.length) return;

    // Create a glitch/scan overlay for the primary button
    const primaryBtn = buttons[0];
    primaryBtn.style.opacity = '0';
    primaryBtn.style.transform = 'translateY(20px)';

    // Clip-path reveal animation with glitch layers
    setTimeout(() => {
        anime({
            targets: primaryBtn,
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800,
            easing: 'easeOutQuint',
            complete: () => {
                // Glitch pulse after entrance
                anime({
                    targets: primaryBtn,
                    scale: [1, 1.03, 1],
                    boxShadow: [
                        '0 0 10px rgba(0, 242, 255, 0.2)',
                        '0 0 30px rgba(0, 242, 255, 0.6)',
                        '0 0 10px rgba(0, 242, 255, 0.2)'
                    ],
                    duration: 600,
                    easing: 'easeInOutQuad'
                });
            }
        });

        // Secondary button staggers in
        if (buttons[1]) {
            anime({
                targets: buttons[1],
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 600,
                delay: 200,
                easing: 'easeOutQuint'
            });
        }
    }, 800);
}

// --- CORE UTILITIES ---
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const menuTrigger = document.getElementById('mobile-menu-trigger');
    const navLinks = document.querySelector('.nav-links');
    const isMobile = () => window.innerWidth <= 1000;

    // Scroll behavior: hide on scroll down, show on scroll up (mobile only)
    let lastScrollY = window.scrollY;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentY = window.scrollY;
                const scrolled = currentY > 50;

                // Toggle .scrolled class for visual change
                if (scrolled) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }

                // Hide/show on scroll direction (mobile only)
                if (isMobile() && currentY > 100) {
                    if (currentY > lastScrollY) {
                        // Scrolling down → hide
                        navbar.classList.add('navbar-hidden');
                    } else {
                        // Scrolling up → show
                        navbar.classList.remove('navbar-hidden');
                    }
                } else if (!isMobile()) {
                    navbar.classList.remove('navbar-hidden');
                }

                lastScrollY = currentY;
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    if (menuTrigger) {
        menuTrigger.addEventListener('click', () => {
            menuTrigger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Also support keyboard enter/space
        menuTrigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                menuTrigger.classList.toggle('active');
                navLinks.classList.toggle('active');
                document.body.classList.toggle('no-scroll');
            }
        });
    }

    // Close menu when clicking links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuTrigger?.classList.remove('active');
            navLinks?.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks?.classList.contains('active')) {
            menuTrigger?.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
}

function initCountdown() {
    const countdownEl = document.getElementById('countdown');
    if (!countdownEl) return;

    const update = () => {
        const now = new Date().getTime();
        const dist = RACE_DATE - now;

        if (dist < 0) {
            countdownEl.innerHTML = "EL DESAFÍO HA COMENZADO";
            return;
        }

        const d = Math.floor(dist / (1000 * 60 * 60 * 24));
        const h = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((dist % (1000 * 60)) / 1000);

        countdownEl.innerHTML = `${d}D / ${h}H / ${m}M / ${s}S`;
    };

    update();
    setInterval(update, 1000);
}

function initScrollReveal() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');

                if (prefersReducedMotion) {
                    // Skip animations for users who prefer reduced motion
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'none';
                } else if (entry.target.classList.contains('gallery-item') || entry.target.classList.contains('card')) {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateY: [50, 0],
                        scale: [0.95, 1],
                        duration: 1000,
                        easing: 'easeOutExpo',
                        delay: anime.stagger(150, {start: 100})
                    });
                } else {
                    entry.target.classList.add('active');
                }
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach(el => {
        if (el.classList.contains('gallery-item') || el.classList.contains('card')) {
            el.style.opacity = '0';
        }
        observer.observe(el);
    });

    // Disconnect observer after all elements have been revealed (one-shot)
    return observer;
}

function highlightActiveLink() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === path) link.classList.add('active');
    });
}

// --- FORM LOGIC ---
function initForm() {
    const form = document.getElementById('inscription-form');
    const steps = document.querySelectorAll('.form-step');
    const nextBtns = document.querySelectorAll('.next-step');
    const prevBtns = document.querySelectorAll('.prev-step');
    const progressBar = document.querySelector('.registration-progress-bar');
    let currentStepIndex = 0;

    const goToStep = (index) => {
        const currentStep = steps[currentStepIndex];
        const nextStep = steps[index];

        anime({
            targets: currentStep,
            opacity: 0,
            translateY: -20,
            duration: 400,
            easing: 'easeInQuad',
            complete: () => {
                currentStep.classList.remove('active');
                nextStep.classList.add('active');
                currentStepIndex = index;
                progressBar.style.width = `${((index + 1) / steps.length) * 100}%`;
                window.scrollTo({ top: 100, behavior: 'smooth' });

                anime({
                    targets: nextStep,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 600,
                    easing: 'easeOutExpo'
                });
            }
        });
    };

    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (validateStep(currentStepIndex + 1)) {
                goToStep(currentStepIndex + 1);
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            goToStep(currentStepIndex - 1);
        });
    });

    // Disclaimer Logic
    const deslindeScroll = document.getElementById('deslindeScroll');
    const acceptCheck = document.getElementById('accept-disclaimer');
    if (deslindeScroll) {
        deslindeScroll.addEventListener('scroll', () => {
            const isBottom = deslindeScroll.scrollTop + deslindeScroll.clientHeight >= deslindeScroll.scrollHeight - 10;
            if (isBottom) acceptCheck.disabled = false;
        });
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = document.getElementById('submit-btn');
        submitBtn.disabled = true;
        document.getElementById('loading-spinner').style.display = 'block';
        form.querySelector('.form-steps-container').style.opacity = '0.3';

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const payload = {
            tipo: registrationData.tipo,
            categoria: `${registrationData.nivel} ${registrationData.genero}`,
            ...data,
            aptoMedico1: registrationData.aptos.atleta1,
            aptoMedico2: registrationData.aptos.atleta2
        };

        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify(payload),
                mode: 'no-cors'
            });
            // With no-cors, response is opaque — assume success
            showConfirmation(data.nombre);
        } catch (err) {
            console.error(err);
            // Replace alert with inline error message
            var errorEl = document.getElementById('form-error-message') || (function() {
                var el = document.createElement('div');
                el.id = 'form-error-message';
                el.style.cssText = 'background: rgba(255,50,50,0.1); border: 1px solid rgba(255,50,50,0.4); padding: 15px 20px; border-radius: 8px; margin-bottom: 20px; color: #ff6b6b; font-family: var(--font-tech); font-size: 0.75rem; text-align: center;';
                form.insertBefore(el, form.firstChild);
                return el;
            })();
            errorEl.textContent = 'Error al enviar. Por favor reintentá o escribinos por WhatsApp.';
            submitBtn.disabled = false;
            document.getElementById('loading-spinner').style.display = 'none';
            form.querySelector('.form-steps-container').style.opacity = '1';
        }
    });
}

function validateStep(step) {
    const activeStep = document.querySelector(`.form-step[data-step="${step}"]`);
    const inputs = activeStep.querySelectorAll('input[required]');
    let valid = true;

    // Clear previous error messages
    activeStep.querySelectorAll('.field-error').forEach(el => el.remove());
    inputs.forEach(input => {
        input.style.borderColor = '';
        input.removeAttribute('aria-invalid');
    });

    inputs.forEach(input => {
        if (!input.value.trim()) {
            valid = false;
            input.style.borderColor = '#ff6b6b';
            input.setAttribute('aria-invalid', 'true');

            // Add inline error message
            var errorMsg = document.createElement('div');
            errorMsg.className = 'field-error';
            errorMsg.style.cssText = 'color: #ff6b6b; font-family: var(--font-tech); font-size: 0.6rem; margin-top: 5px;';
            errorMsg.textContent = 'Este campo es obligatorio';
            input.parentNode.appendChild(errorMsg);
        } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
            valid = false;
            input.style.borderColor = '#ff6b6b';
            input.setAttribute('aria-invalid', 'true');
            var errorMsg = document.createElement('div');
            errorMsg.className = 'field-error';
            errorMsg.style.cssText = 'color: #ff6b6b; font-family: var(--font-tech); font-size: 0.6rem; margin-top: 5px;';
            errorMsg.textContent = 'Email inválido';
            input.parentNode.appendChild(errorMsg);
        } else if (input.type === 'tel' && input.value && !/^\+?[0-9\s]{8,}$/.test(input.value)) {
            valid = false;
            input.style.borderColor = '#ff6b6b';
            input.setAttribute('aria-invalid', 'true');
            var errorMsg = document.createElement('div');
            errorMsg.className = 'field-error';
            errorMsg.style.cssText = 'color: #ff6b6b; font-family: var(--font-tech); font-size: 0.6rem; margin-top: 5px;';
            errorMsg.textContent = 'Teléfono inválido';
            input.parentNode.appendChild(errorMsg);
        }
    });
    return valid;
}

// --- CATEGORY SELECTION ---
function initCategoryFlow() {
    const typeCards = document.querySelectorAll('#level-type .categoria-card');
    const rankLevel = document.getElementById('level-rank');
    const genderLevel = document.getElementById('level-gender');
    const rankOptions = document.getElementById('rank-options');
    const genderOptions = document.getElementById('gender-options');

    typeCards.forEach(card => {
        card.addEventListener('click', () => {
            typeCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            registrationData.tipo = card.dataset.value;
            renderRanks();
            rankLevel.classList.add('active');
            genderLevel.classList.remove('active');
            updatePriceDisplay();
            toggleSecondAthlete();
        });
    });

    function renderRanks() {
        const ranks = Object.keys(CATEGORY_TREE[registrationData.tipo]);
        rankOptions.innerHTML = ranks.map(r => `
            <div class="categoria-card" data-value="${r}">
                <span class="heading">${r}</span>
            </div>
        `).join('');

        rankOptions.querySelectorAll('.categoria-card').forEach(card => {
            card.addEventListener('click', () => {
                rankOptions.querySelectorAll('.categoria-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                registrationData.nivel = card.dataset.value;
                renderGenders();
                genderLevel.classList.add('active');
            });
        });
    }

    function renderGenders() {
        const genders = CATEGORY_TREE[registrationData.tipo][registrationData.nivel];
        genderOptions.innerHTML = genders.map(g => `
            <div class="categoria-card" data-value="${g}">
                <span class="heading">${g}</span>
            </div>
        `).join('');

        genderOptions.querySelectorAll('.categoria-card').forEach(card => {
            card.addEventListener('click', () => {
                genderOptions.querySelectorAll('.categoria-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                registrationData.genero = card.dataset.value;
                document.getElementById('step2-next').disabled = false;
            });
        });
    }
}

function updatePriceDisplay() {
    const priceDisplay = document.getElementById('price-display');
    const priceValue = priceDisplay.querySelector('.price-value');
    priceDisplay.style.display = 'block';
    priceValue.innerText = registrationData.tipo === 'individual' ? `$${PRICE_INDIVIDUAL.toLocaleString()}` : `$${PRICE_TEAM.toLocaleString()}`;
}

function toggleSecondAthlete() {
    const fields = document.getElementById('second-athlete-fields');
    fields.style.display = registrationData.tipo === 'equipo' ? 'block' : 'none';
    document.getElementById('upload-atleta2').style.display = registrationData.tipo === 'equipo' ? 'block' : 'none';
}

// --- FILE UPLOAD ---
function initFileUploads() {
    document.querySelectorAll('.upload-box .categoria-card').forEach(card => {
        card.addEventListener('click', () => {
            const athlete = card.dataset.atleta;
            const type = card.dataset.type;
            const container = document.getElementById(`upload-${athlete}`);
            container.querySelectorAll('.categoria-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');

            const ui = document.getElementById(`ui-upload-${athlete}`);
            if (type === 'upload') {
                ui.style.display = 'block';
                registrationData.aptos[athlete] = '';
            } else {
                ui.style.display = 'none';
                registrationData.aptos[athlete] = 'PAPEL';
                checkStep3Ready();
            }
        });
    });

    // Simulated upload for demo (actual implementation should follow GAS logic)
    document.querySelectorAll('input[type="file"]').forEach(input => {
        input.addEventListener('change', (e) => {
            const id = e.target.id;
            const athlete = id.includes('Atleta1') ? 'atleta1' : 'atleta2';
            const status = document.getElementById(`status${athlete.charAt(0).toUpperCase() + athlete.slice(1)}`);
            const progress = document.getElementById(`progress${athlete.charAt(0).toUpperCase() + athlete.slice(1)}`);
            
            status.innerText = "SUBIENDO...";
            progress.style.width = "60%";
            
            setTimeout(() => {
                status.innerText = "COMPLETADO";
                progress.style.width = "100%";
                registrationData.aptos[athlete] = "UPLOADED_LINK";
                checkStep3Ready();
            }, 1500);
        });
    });
}

function checkStep3Ready() {
    const next = document.getElementById('step3-next');
    if (registrationData.tipo === 'individual') {
        next.disabled = !registrationData.aptos.atleta1;
    } else {
        next.disabled = !(registrationData.aptos.atleta1 && registrationData.aptos.atleta2);
    }
}

// --- CONFIRMATION ---
function showConfirmation(name) {
    const container = document.getElementById('registration-container');
    container.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <div style="font-size: 5rem; margin-bottom: 20px;">🏆</div>
            <h2 class="heading" style="font-size: 3rem; color: var(--cyan);">¡INSCRIPCIÓN RECIBIDA!</h2>
            <p style="margin: 20px 0; font-size: 1.2rem;">Gracias ${name}. Tu lugar está casi asegurado.</p>
            
            <div class="card" style="text-align: left; margin: 40px 0; border-color: var(--cyan);">
                <div class="tech-text" style="margin-bottom: 20px;">PRÓXIMO PASO: PAGO</div>
                <p>Realizá la transferencia a:</p>
                <div style="background: var(--black); padding: 20px; border: 1px solid var(--gray-mid); margin: 20px 0; font-family: monospace; font-size: 1.2rem; color: var(--cyan);">
                    ALIAS: ${BANK_ALIAS}
                </div>
                <p style="font-size: 0.8rem; color: var(--gray-light);">Una vez realizado, enviá el comprobante por WhatsApp.</p>
            </div>
            
            <a href="https://wa.me/5493541690852" class="btn btn-primary" target="_blank">ENVIAR COMPROBANTE</a>
            <div style="margin-top: 30px;">
                <a href="index.html" class="tech-text" style="color: var(--gray-light); text-decoration: none;">VOLVER AL INICIO</a>
            </div>
        </div>
    `;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const close = document.querySelector('.close-lightbox');

    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            lightboxImg.src = item.querySelector('img').src;
            lightbox.style.display = 'flex';
            
            // Glitchy / Cyberpunk entrance
            anime({
                targets: lightboxImg,
                opacity: [0, 1],
                scale: [1.1, 1],
                filter: ['blur(10px) drop-shadow(0 0 50px rgba(0,242,255,0.8))', 'blur(0px) drop-shadow(0 0 20px rgba(0,242,255,0.2))'],
                duration: 800,
                easing: 'easeOutElastic(1, .8)'
            });
            
            anime({
                targets: lightbox,
                opacity: [0, 1],
                duration: 400,
                easing: 'linear'
            });
        });
    });

    const closeLightbox = () => {
        anime({
            targets: [lightbox, lightboxImg],
            opacity: 0,
            duration: 300,
            easing: 'easeInQuad',
            complete: () => {
                lightbox.style.display = 'none';
            }
        });
    };

    close.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}
