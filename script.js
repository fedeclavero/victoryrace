/**
 * VICTORY RACE II — Main Script
 */

// --- CONFIGURACIÓN ---
const GOOGLE_SCRIPT_URL = "REEMPLAZAR_CON_URL_DEL_SCRIPT"; // VERIFICAR: Setear URL real post-deploy
const BANK_ALIAS = "erick.cabrera.11";
const WHATSAPP_NUMBER = "5493541690852";
const RACE_DATE = new Date("2026-09-11T00:00:00").getTime();

// --- DATA ---
const CATEGORIES = [
    { id: 'cat-1', name: 'Indiv - Open Recreativo', type: 'individual', level: 'recreativo', sex: 'Hombre / Mujer' },
    { id: 'cat-2', name: 'Indiv - Intermedio', type: 'individual', level: 'intermedio', sex: 'Hombre / Mujer' },
    { id: 'cat-3', name: 'Indiv - Avanzado', type: 'individual', level: 'avanzado', sex: 'Hombre / Mujer' },
    { id: 'cat-4', name: 'Eq - Principiante', type: 'team', level: 'principiante', sex: 'H&H / M&M / Mixto' },
    { id: 'cat-5', name: 'Eq - Intermedio', type: 'team', level: 'intermedio', sex: 'H&H / M&M / Mixto' }
];

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initHeroAnimations();
    initCountdown();
    initScrollReveal();
    initLightbox();
    initForm();
    highlightActiveLink();
    renderCategories();
    initLazyLoading();
    initShareButton();
});

// --- RENDER DYNAMIC CONTENT ---
function renderCategories() {
    // Render in categories.html
    const gridIndividual = document.querySelector('#categorias [data-type="individual"]')?.parentElement;
    const gridTeam = document.querySelector('#categorias [data-type="team"]')?.parentElement;

    if (gridIndividual && gridTeam) {
        gridIndividual.innerHTML = '';
        gridTeam.innerHTML = '';

        CATEGORIES.forEach(cat => {
            const card = `
                <div class="category-card reveal" data-type="${cat.type}">
                    <div class="cat-badge">${cat.type === 'individual' ? 'INDIVIDUAL' : 'EQUIPO'}</div>
                    <h4>${cat.name.replace('Indiv - ', '').replace('Eq - ', '')}</h4>
                    <div class="cat-level ${cat.level}">${cat.level.charAt(0).toUpperCase() + cat.level.slice(1)}</div>
                    <p class="cat-sex">${cat.sex}</p>
                </div>
            `;
            if (cat.type === 'individual') gridIndividual.innerHTML += card;
            else gridTeam.innerHTML += card;
        });
    }

    // Render in inscription form
    const formGrid = document.querySelector('.categories-selection');
    if (formGrid) {
        formGrid.innerHTML = '';
        CATEGORIES.forEach(cat => {
            const option = `
                <div class="cat-option ${cat.type === 'team' ? 'team-option' : ''}">
                    <input type="checkbox" id="${cat.id}" name="categorias" value="${cat.name}">
                    <label for="${cat.id}">${cat.name}</label>
                </div>
            `;
            formGrid.innerHTML += option;
        });
        // Re-bind team logic after render
        bindTeamLogic();
    }
}

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
    const container = document.getElementById('registration-container');
    const spinner = document.getElementById('loading-spinner');

    let currentStep = 1;

    // Load persisted data
    loadFormData(form);

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

    // Persistence on change
    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => saveFormData(form));
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

        if (step === 2) {
            const checked = Array.from(document.querySelectorAll('input[name="categorias"]')).some(cb => cb.checked);
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

        updateProgressBar(step);

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

    disclaimer.addEventListener('change', () => {
        submitBtn.disabled = !disclaimer.checked;
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        data.categorias = Array.from(formData.getAll('categorias'));

        document.querySelector('.form-steps-container').style.display = 'none';
        spinner.style.display = 'block';

        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response => {
            if (response.ok || response.type === 'opaque') {
                localStorage.removeItem('vr_form_data');
                showConfirmation(data.nombre);
            } else {
                throw new Error("Error en servidor");
            }
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
                    <div class="step anime-item"><span class="step-num">1</span><p>Transferí al alias: <strong id="bank-alias">${BANK_ALIAS}</strong> <button class="copy-btn" onclick="copyAlias()">COPIAR</button></p></div>
                    <div class="step anime-item"><span class="step-num">2</span><p>Monto pre-inscripción: <strong>$50.000</strong></p></div>
                    <div class="step anime-item"><span class="step-num">3</span><p>WhatsApp captura: <a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" class="btn btn-accent btn-sm">ENVIAR AQUÍ</a></p></div>
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

function bindTeamLogic() {
    const partnerFields = document.getElementById('partner-fields');
    const categoriesCheckboxes = document.querySelectorAll('input[name="categorias"]');
    if (!partnerFields) return;

    categoriesCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            const hasTeam = Array.from(categoriesCheckboxes)
                .filter(c => c.checked)
                .some(c => c.parentElement.classList.contains('team-option'));

            if (hasTeam) {
                partnerFields.style.display = 'block';
                anime({ targets: partnerFields, height: [0, 'auto'], opacity: [0, 1], duration: 500, easing: 'easeOutQuad' });
            } else {
                anime({
                    targets: partnerFields, opacity: 0, height: 0, duration: 300, easing: 'easeInQuad',
                    complete: () => partnerFields.style.display = 'none'
                });
            }
        });
    });
}

function updateProgressBar(step) {
    const bar = document.querySelector('.registration-progress-bar');
    if (bar) {
        const percent = (step / 3) * 100;
        bar.style.width = percent + '%';
    }
}

function copyAlias() {
    const btn = document.querySelector('.copy-btn');
    navigator.clipboard.writeText(BANK_ALIAS).then(() => {
        const originalText = btn.innerText;
        btn.innerText = '¡COPIADO!';
        btn.classList.add('copied');
        setTimeout(() => {
            btn.innerText = originalText;
            btn.classList.remove('copied');
        }, 2000);
    });
}

function saveFormData(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.categorias = Array.from(formData.getAll('categorias'));
    localStorage.setItem('vr_form_data', JSON.stringify(data));
}

function loadFormData(form) {
    const saved = localStorage.getItem('vr_form_data');
    if (!saved) return;
    const data = JSON.parse(saved);
    Object.keys(data).forEach(key => {
        const input = form.querySelector(`[name="${key}"]`);
        if (input) {
            if (input.type === 'checkbox') {
                if (Array.isArray(data[key])) {
                    const checkboxes = form.querySelectorAll(`[name="${key}"]`);
                    checkboxes.forEach(cb => { if (data[key].includes(cb.value)) cb.checked = true; });
                } else {
                    input.checked = !!data[key];
                }
            } else {
                input.value = data[key];
            }
        }
    });
}

// --- UTILITIES ---
function initShareButton() {
    const footer = document.querySelector('.footer-content');
    if (!footer) return;

    const shareDiv = document.createElement('div');
    shareDiv.className = 'share-container';
    shareDiv.innerHTML = `<button class="btn btn-accent btn-sm" id="share-btn">COMPARTIR EVENTO</button>`;
    footer.appendChild(shareDiv);

    // FIX: Instagram Handle
    const footerLinks = document.querySelectorAll('.footer-socials a');
    footerLinks.forEach(link => {
        if (link.innerText.includes('@victory.race')) {
            link.innerText = link.innerText.replace('@victory.race', '@victoryrace.arg');
        }
    });

    document.getElementById('share-btn').addEventListener('click', () => {
        const shareData = {
            title: 'Victory Race II',
            text: '¡Vuelve la carrera de CrossFit más intensa! Inscribite acá:',
            url: window.location.origin + window.location.pathname.replace(window.location.pathname.split('/').pop(), 'index.html')
        };

        if (navigator.share) {
            navigator.share(shareData);
        } else {
            navigator.clipboard.writeText(shareData.url);
            alert('¡Link copiado al portapapeles!');
        }
    });
}

function initLazyLoading() {
    const images = document.querySelectorAll('.gallery-img');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('lazy-loaded');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    images.forEach(img => observer.observe(img));
}

function initConfetti() {
    const container = document.getElementById('confetti');
    if (!container) return;
    for (let i = 0; i < 60; i++) {
        const particle = document.createElement('div');
        particle.className = 'confetti-particle';
        particle.style.backgroundColor = i % 2 === 0 ? 'var(--accent)' : '#fff';
        particle.style.left = Math.random() * 100 + '%';
        container.appendChild(particle);
        anime({
            targets: particle, translateY: [0, 600], translateX: () => (Math.random() - 0.5) * 300,
            rotate: () => Math.random() * 720, opacity: [1, 0], duration: 2000 + Math.random() * 3000,
            easing: 'easeOutQuad', complete: () => particle.remove()
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
            const img = item.querySelector('img');
            lightboxImg.src = img.src;
            lightbox.style.display = 'block';
            anime({ targets: '#lightbox', opacity: [0, 1], duration: 400, easing: 'easeOutQuad' });
            anime({ targets: '.lightbox-content', scale: [0.8, 1], opacity: [0, 1], duration: 500, easing: 'easeOutExpo' });
        });
    });

    closeBtn.onclick = () => lightbox.style.display = 'none';
    lightbox.onclick = (e) => { if (e.target === lightbox) lightbox.style.display = 'none'; };
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
