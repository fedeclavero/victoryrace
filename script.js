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
    initLightning();
    initLightbox();
    initForm();
});

// --- FORM LOGIC ---
function initForm() {
    const form = document.getElementById('inscription-form');
    const disclaimer = document.getElementById('disclaimer');
    const submitBtn = document.getElementById('submit-btn');
    const partnerFields = document.getElementById('partner-fields');
    const categoriesCheckboxes = document.querySelectorAll('input[name="categorias"]');
    const container = document.getElementById('registration-container');
    const spinner = document.getElementById('loading-spinner');

    // Habilitar botón si disclaimer está marcado
    disclaimer.addEventListener('change', () => {
        submitBtn.disabled = !disclaimer.checked;
    });

    // Mostrar campos de compañero si se selecciona equipo
    categoriesCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            const hasTeam = Array.from(categoriesCheckboxes)
                .filter(c => c.checked)
                .some(c => c.parentElement.classList.contains('team-option'));

            if (hasTeam) {
                anime({
                    targets: partnerFields,
                    height: [0, 200],
                    opacity: [0, 1],
                    duration: 500,
                    begin: () => partnerFields.style.display = 'block',
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

    // Submit logica
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        // Categorias multiple
        data.categorias = Array.from(formData.getAll('categorias'));

        // UI feedback
        form.style.display = 'none';
        spinner.style.display = 'block';

        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Apps Script requiere no-cors a veces para redirecciones, pero perdemos el response
            body: JSON.stringify(data)
        }).then(() => {
            showConfirmation(data.nombre);
        }).catch(err => {
            console.error(err);
            alert("Error al enviar. Por favor intenta de nuevo o contactanos por WhatsApp.");
            form.style.display = 'block';
            spinner.style.display = 'none';
        });
    });

    function showConfirmation(nombre) {
        spinner.style.display = 'none';

        const confirmationHTML = `
            <div class="confirmation-screen" id="confirmation-screen">
                <div class="confetti-container" id="confetti"></div>
                <h3 class="conf-title">¡INSCRIPCIÓN RECIBIDA, ${nombre.toUpperCase()}!</h3>
                <p>Tu pre-inscripción fue registrada correctamente.</p>
                <div class="payment-steps">
                    <h4>PARA CONFIRMAR TU LUGAR:</h4>
                    <div class="step">
                        <span class="step-num">1</span>
                        <p>Realizá una transferencia bancaria al alias:<br><strong>${BANK_ALIAS}</strong></p>
                    </div>
                    <div class="step">
                        <span class="step-num">2</span>
                        <p>Enviá la captura de pantalla del comprobante por WhatsApp:</p>
                        <a href="https://wa.me/${WHATSAPP_NUMBER}" class="btn btn-accent" target="_blank">ENVIAR COMPROBANTE</a>
                    </div>
                </div>
                <p class="final-note">Una vez confirmado el pago, recibirás un email de confirmación oficial.</p>
            </div>
        `;

        container.innerHTML = confirmationHTML;

        anime({
            targets: '#confirmation-screen',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800,
            easing: 'easeOutExpo'
        });

        initConfetti();
    }
}

function initConfetti() {
    // Simple confetti with anime.js
    const container = document.getElementById('confetti');
    if (!container) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'confetti-particle';
        particle.style.backgroundColor = i % 2 === 0 ? '#00aaff' : '#ffffff';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = -10 + 'px';
        container.appendChild(particle);

        anime({
            targets: particle,
            translateY: [0, 500],
            translateX: () => (Math.random() - 0.5) * 200,
            rotate: () => Math.random() * 360,
            opacity: [1, 0],
            duration: 1500 + Math.random() * 2000,
            easing: 'easeOutQuad',
            complete: () => particle.remove()
        });
    }
}

// --- LIGHTBOX ---
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-lightbox');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            lightboxImg.src = imgSrc;
            lightbox.style.display = 'block';

            anime({
                targets: '#lightbox',
                opacity: [0, 1],
                duration: 400,
                easing: 'easeOutQuad'
            });

            anime({
                targets: '.lightbox-content',
                scale: [0.8, 1],
                opacity: [0, 1],
                duration: 500,
                easing: 'easeOutElastic(1, .8)'
            });
        });
    });

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    function closeLightbox() {
        anime({
            targets: '#lightbox',
            opacity: 0,
            duration: 300,
            easing: 'easeInQuad',
            complete: () => {
                lightbox.style.display = 'none';
            }
        });
    }
}

// --- SCROLL REVEAL ---
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: apply staggered delay for grids
                if (entry.target.classList.contains('pillar-card') || entry.target.classList.contains('category-card')) {
                    // Handled by CSS transition or specialized anime.js call if needed
                }
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.15
    });

    reveals.forEach(el => revealObserver.observe(el));
}

// --- LIGHTNING EFFECT ---
function initLightning() {
    const container = document.getElementById('lightning-container');
    if (!container) return;

    function createLightning() {
        const bolt = document.createElement('div');
        bolt.className = 'lightning-bolt';

        const left = Math.random() * 100;
        const width = 1 + Math.random() * 2;
        const opacity = 0.3 + Math.random() * 0.7;

        bolt.style.left = `${left}%`;
        bolt.style.width = `${width}px`;
        bolt.style.opacity = opacity;

        container.appendChild(bolt);

        anime({
            targets: bolt,
            opacity: [opacity, 0],
            duration: 100 + Math.random() * 400,
            easing: 'easeOutExpo',
            complete: () => bolt.remove()
        });
    }

    // Occasional flashes
    setInterval(() => {
        if (Math.random() > 0.95) {
            createLightning();
            if (Math.random() > 0.5) setTimeout(createLightning, 100); // Double flash
        }
    }, 200);
}
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    menuToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');

        if (isOpen) {
            anime({
                targets: '.nav-links li',
                opacity: [0, 1],
                translateX: [20, 0],
                delay: anime.stagger(100),
                easing: 'easeOutExpo'
            });
        }
    });

    // Close menu when link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// --- HERO ANIMATIONS ---
function initHeroAnimations() {
    // Fade in Title
    anime({
        targets: '#main-title',
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 1200,
        easing: 'easeOutExpo',
        delay: 500
    });

    // Fade in Subtitle
    anime({
        targets: '#sub-title',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1000,
        easing: 'easeOutExpo',
        delay: 800
    });

    // Fade in Info
    anime({
        targets: '#hero-info',
        opacity: [0, 1],
        duration: 1000,
        easing: 'linear',
        delay: 1200
    });

    // Fade in Countdown
    anime({
        targets: '#countdown',
        opacity: [0, 1],
        duration: 1000,
        easing: 'linear',
        delay: 1400
    });
}

// --- COUNTDOWN TIMER ---
function initCountdown() {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateTimer() {
        const now = new Date().getTime();
        const distance = RACE_DATE - now;

        if (distance < 0) {
            clearInterval(timerInterval);
            // Handle race day or past race
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.innerText = String(days).padStart(2, '0');
        hoursEl.innerText = String(hours).padStart(2, '0');
        minutesEl.innerText = String(minutes).padStart(2, '0');
        secondsEl.innerText = String(seconds).padStart(2, '0');
    }

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer(); // Initial call
}
