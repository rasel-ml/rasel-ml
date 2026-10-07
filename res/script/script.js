/* ── Greeting + animated name ── */
(function() {
    const hour = new Date().getHours();
    let greeting = 'Welcome !!';
    if (hour >= 5 && hour < 12) greeting = 'Good Morning !!';
    else if (hour >= 14 && hour < 18) greeting = 'Good Afternoon !!';
    else if (hour >= 18 && hour < 21) greeting = 'Good Evening !!';
    const g = document.getElementById('greeting');
    if (g) g.textContent = greeting;

    const full = 'Md. Rasel Molla';
    const el = document.getElementById('name');
    if (!el) return;
    el.setAttribute('aria-label', full);
    let i = 0;
    full.split(' ').forEach((word, w, words) => {
        // each word is a nowrap block, so lines only break between words
        const wordEl = document.createElement('span');
        wordEl.className = 'word';
        wordEl.setAttribute('aria-hidden', 'true');
        [...word].forEach(ch => {
            const s = document.createElement('span');
            s.className = 'char';
            s.textContent = ch;
            s.style.animationDelay = (0.3 + i++ * 0.045) + 's';
            wordEl.appendChild(s);
        });
        el.appendChild(wordEl);
        if (w < words.length - 1) el.appendChild(document.createTextNode(' '));
        i++; // keep the animation rhythm across the space
    });
})();

/* ── Counter animation ── */
function animateCounters() {
    document.querySelectorAll('.stat-n').forEach(el => {
        const target = +el.dataset.target;
        const duration = 900;
        const start = performance.now();
        const tick = now => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            const val = Math.round(target * eased);
            el.textContent = p < 1 ? val : target + '+';
            if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    });
}
let counted = false;
const heroSec = document.getElementById('myself');
if (heroSec) {
    // threshold 0.25: the hero can be taller than the screen on phones
    new IntersectionObserver(([e], obs) => {
        if (e.isIntersecting && !counted) {
            counted = true;
            animateCounters();
            obs.disconnect();
        }
    }, {
        threshold: 0.25
    }).observe(heroSec);
}

/* ── Sidebar scroll progress ── */
const sbProg = document.getElementById('sbProg');
window.addEventListener('scroll', () => {
    const s = window.scrollY,
        t = document.body.scrollHeight - window.innerHeight;
    if (sbProg) sbProg.style.height = (t > 0 ? s / t * 100 : 0) + '%';
}, {
    passive: true
});

/* ── Active nav (section crossing the middle of the screen) ── */
const navLinks = document.querySelectorAll('.sidebar .nav-link');
const secObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
        }
    });
}, {
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0
});
document.querySelectorAll('section[id]').forEach(s => secObs.observe(s));

/* ── Reveal on scroll ── */
const rvObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('in');
            rvObs.unobserve(e.target);
        }
    });
}, {
    threshold: 0.1
});
document.querySelectorAll('.rv').forEach(el => rvObs.observe(el));

/* ── Skill bars ── */
const barObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.style.width = e.target.dataset.pct + '%';
            barObs.unobserve(e.target);
        }
    });
}, {
    threshold: 0.3
});
document.querySelectorAll('.skill-fill').forEach(b => barObs.observe(b));

/* ── Tabs ── */
function activateTab(btn, panelId, tabSel, panelSel) {
    document.querySelectorAll(tabSel).forEach(t => t.classList.remove('active'));
    document.querySelectorAll(panelSel).forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(panelId).classList.add('active');
}

function switchaTab(btn, panelId) {
    activateTab(btn, panelId, '.a-tab', '.info-cards');
}

function switchTab(btn, panelId) {
    activateTab(btn, panelId, '.c-tab', '.c-panel');
}

/* ── Drawer ── */
function toggleDrawer() {
    const open = document.getElementById('drawer').classList.toggle('open');
    document.body.style.overflow = open ? 'hidden' : '';
}

/* ── Modals ── */
function openM(id) {
    document.getElementById(id).classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal(id) {
    document.getElementById(id).classList.remove('open');
    document.body.style.overflow = '';
}

function closeM(e, id) {
    if (e.target === document.getElementById(id)) closeModal(id);
}

/* ── Escape closes modal / drawer ── */
document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.modal-bg.open').forEach(m => closeModal(m.id));
    const d = document.getElementById('drawer');
    if (d && d.classList.contains('open')) toggleDrawer();
});

/* ── Close drawer if the window grows past the mobile layout ── */
window.addEventListener('resize', () => {
    const d = document.getElementById('drawer');
    if (window.innerWidth > 980 && d && d.classList.contains('open')) toggleDrawer();
});