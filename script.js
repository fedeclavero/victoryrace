/**
 * VICTORY RACE II — Main Script
 */

// --- CONFIGURACIÓN ---
const GOOGLE_SCRIPT_URL = "REEMPLAZAR_CON_URL_DEL_SCRIPT";
const BANK_ALIAS = "VICTORY.RACE.2026";
const WHATSAPP_NUMBER = "5493541690852";
const RACE_DATE = new Date("2026-09-11T00:00:00").getTime();

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initHeroAnimations();
    initCountdown();
    initScrollReveal();
    // initLightning(); // Disabled in favor of new SVG v4 system
    initLightbox();
    initForm();
    highlightActiveLink();
});

// --- NAV ACTIVE STATE ---
function highlightActiveLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// --- FORM LOGIC (MULTI-STEP) ---
function initForm() {
    const form = document.getElementById('inscription-form');
    if (!form) return;

    const steps = document.querySelectorAll('.form-step');
    const nextBtns = document.querySelectorAll('.next-step');
    const prevBtns = document.querySelectorAll('.prev-step');
    const disclaimer = document.getElementById('disclaimer');
    const submitBtn = document.getElementById('submit-btn');
    const partnerFields = document.getElementById('partner-fields');
    const categoriesCheckboxes = document.querySelectorAll('input[name="categorias"]');
    const container = document.getElementById('registration-container');
    const spinner = document.getElementById('loading-spinner');

    let currentStep = 1;

    // Next Step Logic
    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                goToStep(currentStep + 1);
            }
        });
    });

    // Prev Step Logic
    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            goToStep(currentStep - 1);
        });
    });

    function validateStep(step) {
        const activeStepEl = document.querySelector(`.form-step[data-step="${step}"]`);
        const inputs = activeStepEl.querySelectorAll('input[required]');
        let valid = true;

        inputs.forEach(input => {
            if (!input.value) {
                valid = false;
                input.style.borderColor = 'red';
                anime({
                    targets: input,
                    translateX: [0, -10, 10, -10, 10, 0],
                    duration: 400,
                    easing: 'easeInOutQuad'
                });
            } else {
                input.style.borderColor = '';
            }
        });

        // Step 2 validation (at least one category)
        if (step === 2) {
            const checked = Array.from(categoriesCheckboxes).some(cb => cb.checked);
            if (!checked) {
                valid = false;
                alert("Seleccioná al menos una categoría.");
            }
        }

        return valid;
    }

    function goToStep(step) {
        const currentEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
        const nextEl = document.querySelector(`.form-step[data-step="${step}"]`);

        anime({
            targets: currentEl,
            opacity: 0,
            translateX: -20,
            duration: 300,
            easing: 'easeInQuad',
            complete: () => {
                currentEl.classList.remove('active');
                nextEl.classList.add('active');
                currentStep = step;

                anime({
                    targets: nextEl,
                    opacity: [0, 1],
                    translateX: [20, 0],
                    duration: 500,
                    easing: 'easeOutExpo'
                });

                // Stagger items inside the new step
                anime({
                    targets: nextEl.querySelectorAll('.anime-item'),
                    opacity: [0, 1],
                    translateY: [20, 0],
                    delay: anime.stagger(100),
                    easing: 'easeOutExpo'
                });
            }
        });
    }

    // Disclaimer
    disclaimer.addEventListener('change', () => {
        submitBtn.disabled = !disclaimer.checked;
    });

    // Team logic
    categoriesCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            const hasTeam = Array.from(categoriesCheckboxes)
                .filter(c => c.checked)
                .some(c => c.parentElement.classList.contains('team-option'));

            if (hasTeam) {
                partnerFields.style.display = 'block';
                anime({
                    targets: partnerFields,
                    height: [0, 'auto'],
                    opacity: [0, 1],
                    duration: 500,
                    easing: 'easeOutQuad'
                });
            } else {
                anime({
                    targets: partnerFields,
                    opacity: 0,
                    height: 0,
                    duration: 300,
                    easing: 'easeInQuad',
                    complete: () => partnerFields.style.display = 'none'
                });
            }
        });
    });

    // Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        data.categorias = Array.from(formData.getAll('categorias'));

        document.querySelector('.form-steps-container').style.display = 'none';
        spinner.style.display = 'block';

        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify(data)
        }).then(() => {
            showConfirmation(data.nombre);
        }).catch(() => {
            alert("Error al enviar. Intenta de nuevo.");
            document.querySelector('.form-steps-container').style.display = 'block';
            spinner.style.display = 'none';
        });
    });

    function showConfirmation(nombre) {
        spinner.style.display = 'none';
        const confirmationHTML = `
            <div class="confirmation-screen" id="confirmation-screen">
                <div class="confetti-container" id="confetti"></div>
                <h3 class="conf-title">¡ÉPICO, ${nombre.toUpperCase()}!</h3>
                <p>Estás a un paso de la gloria. Tu pre-inscripción fue registrada.</p>
                <div class="payment-steps">
                    <div class="step anime-item"><span class="step-num">1</span><p>Transferí al alias: <strong>${BANK_ALIAS}</strong></p></div>
                    <div class="step anime-item"><span class="step-num">2</span><p>WhatsApp captura: <a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" class="btn btn-accent btn-sm">ENVIAR AQUÍ</a></p></div>
                </div>
            </div>
        `;
        container.innerHTML = confirmationHTML;
        anime({
            targets: '#confirmation-screen',
            opacity: [0, 1],
            scale: [0.9, 1],
            duration: 1000,
            easing: 'easeOutElastic(1, .8)'
        });
        initConfetti();
    }
}

function initConfetti() {
    const container = document.getElementById('confetti');
    if (!container) return;
    for (let i = 0; i < 60; i++) {
        const particle = document.createElement('div');
        particle.className = 'confetti-particle';
        particle.style.backgroundColor = i % 2 === 0 ? 'var(--blue-electric)' : '#fff';
        particle.style.left = Math.random() * 100 + '%';
        container.appendChild(particle);
        anime({
            targets: particle,
            translateY: [0, 600],
            translateX: () => (Math.random() - 0.5) * 300,
            rotate: () => Math.random() * 720,
            opacity: [1, 0],
            duration: 2000 + Math.random() * 3000,
            easing: 'easeOutQuad',
            complete: () => particle.remove()
        });
    }
}

// --- LIGHTBOX ---
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-lightbox');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            lightboxImg.src = item.querySelector('img').src;
            lightbox.style.display = 'block';
            anime({ targets: '#lightbox', opacity: [0, 1], duration: 400, easing: 'easeOutQuad' });
            anime({ targets: '.lightbox-content', scale: [0.8, 1], opacity: [0, 1], duration: 500, easing: 'easeOutExpo' });
        });
    });

    closeBtn.onclick = () => lightbox.style.display = 'none';
    lightbox.onclick = (e) => { if (e.target === lightbox) lightbox.style.display = 'none'; };
}

// --- LIGHTNING ---
function initLightning() {
    const container = document.getElementById('lightning-container');
    if (!container) return;
    setInterval(() => {
        if (Math.random() > 0.95) {
            const bolt = document.createElement('div');
            bolt.className = 'lightning-bolt';
            bolt.style.left = Math.random() * 100 + '%';
            bolt.style.width = (1 + Math.random() * 2) + 'px';
            container.appendChild(bolt);
            anime({ targets: bolt, opacity: [0.8, 0], duration: 200 + Math.random() * 400, easing: 'easeOutExpo', complete: () => bolt.remove() });
        }
    }, 200);
}

// --- SCROLL REVEAL ---
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));
}

// --- NAVBAR ---
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    if (!navbar) return;
    window.onscroll = () => window.scrollY > 50 ? navbar.classList.add('scrolled') : navbar.classList.remove('scrolled');
    menuToggle.onclick = () => {
        const open = navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        if (open) anime({ targets: '.nav-links li', opacity: [0, 1], translateX: [20, 0], delay: anime.stagger(100), easing: 'easeOutExpo' });
    };
}

// --- HERO ---
function initHeroAnimations() {
    if (!document.getElementById('main-title')) return;
    anime({ targets: '#main-title', opacity: [0, 1], translateY: [50, 0], duration: 1200, easing: 'easeOutExpo', delay: 300 });
    anime({ targets: '#sub-title', opacity: [0, 1], translateY: [30, 0], duration: 1000, easing: 'easeOutExpo', delay: 500 });
    anime({ targets: '.hero-info, #countdown, .hero-content .btn', opacity: [0, 1], duration: 1000, delay: anime.stagger(200, { start: 800 }), easing: 'linear' });
}

// --- COUNTDOWN ---
function initCountdown() {
    const elements = ['days', 'hours', 'minutes', 'seconds'].map(id => document.getElementById(id));
    if (elements.some(el => !el)) return;
    const timer = setInterval(() => {
        const dist = RACE_DATE - new Date().getTime();
        if (dist < 0) return clearInterval(timer);
        elements[0].innerText = String(Math.floor(dist / 864e5)).padStart(2, '0');
        elements[1].innerText = String(Math.floor((dist % 864e5) / 36e5)).padStart(2, '0');
        elements[2].innerText = String(Math.floor((dist % 36e5) / 6e4)).padStart(2, '0');
        elements[3].innerText = String(Math.floor((dist % 6e4) / 1e3)).padStart(2, '0');
    }, 1000);
}
