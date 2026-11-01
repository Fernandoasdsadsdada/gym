// IRON FORCE GYM

const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

// MENÚ RESPONSIVE
menuToggle?.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');

    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle?.classList.remove('active');
        menuToggle?.setAttribute('aria-expanded', 'false');
    });
});

// ANIMACIONES AL HACER SCROLL
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => {
    revealObserver.observe(element);
});

// CONTADORES ANIMADOS
const countUp = element => {
    const target = Number(element.dataset.count);
    const suffix = element.dataset.suffix || '';
    const duration = 1500;
    const start = performance.now();

    const tick = now => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);

        element.textContent =
            Math.floor(target * eased).toLocaleString('es-PE') + suffix;

        if (progress < 1) {
            requestAnimationFrame(tick);
        }
    };

    requestAnimationFrame(tick);
};

const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            countUp(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.6 });

document.querySelectorAll('[data-count]').forEach(item => {
    statsObserver.observe(item);
});

// TESTIMONIOS
const testimonials = [
    {
        text: 'Desde que empecé a entrenar aquí, tengo más energía y constancia. El ambiente te impulsa a dar un poco más cada día.',
        name: 'Camila R.',
        detail: 'Miembro desde hace 8 meses',
        initials: 'CR'
    },
    {
        text: 'Los entrenadores se preocupan por tu técnica y tus avances. Ahora entreno con objetivos claros y disfruto mucho más el proceso.',
        name: 'Diego M.',
        detail: 'Miembro desde hace 1 año',
        initials: 'DM'
    },
    {
        text: 'Encontré un espacio donde puedo entrenar a mi ritmo, con buen equipo y una comunidad que siempre te motiva a seguir.',
        name: 'Lucía P.',
        detail: 'Miembro desde hace 5 meses',
        initials: 'LP'
    }
];

let activeQuote = 0;

const renderQuote = () => {
    const quote = testimonials[activeQuote];

    document.querySelector('#quote-text').textContent = quote.text;
    document.querySelector('#quote-name').textContent = quote.name;
    document.querySelector('#quote-detail').textContent = quote.detail;
    document.querySelector('.avatar').textContent = quote.initials;

    document.querySelector('#quote-index').textContent =
        `0${activeQuote + 1} / 0${testimonials.length}`;
};

document.querySelector('#quote-prev')?.addEventListener('click', () => {
    activeQuote =
        (activeQuote - 1 + testimonials.length) % testimonials.length;

    renderQuote();
});

document.querySelector('#quote-next')?.addEventListener('click', () => {
    activeQuote = (activeQuote + 1) % testimonials.length;
    renderQuote();
});

// SELECCIONAR PLAN AUTOMÁTICAMENTE
document.querySelectorAll('[data-plan]').forEach(button => {
    button.addEventListener('click', () => {
        const interest = document.querySelector('#interest');

        if (interest) {
            interest.value = button.dataset.plan;
        }
    });
});

// FORMULARIO DE CONTACTO
document.querySelector('#contact-form')?.addEventListener('submit', event => {
    event.preventDefault();

    const form = event.currentTarget;
    const feedback = document.querySelector('#form-feedback');

    if (!form.reportValidity()) return;

    const name = form.elements.name.value.trim();

    feedback.textContent =
        `¡Gracias, ${name}! Tu consulta está lista. Configura un servicio de envío para recibirla.`;

    form.reset();
});

// AÑO AUTOMÁTICO DEL FOOTER
document.querySelector('#year').textContent = new Date().getFullYear();