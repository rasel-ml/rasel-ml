/* ── Animated name ── */
(function(){
    const hour = new Date().getHours();
    let greeting;
    if (hour < 13) {
        greeting = "Good Morning !!";
    } else if (hour < 18) {
        greeting = "Good Afternoon !!";
    } else {
        greeting = "Good Evening !!";
    }
    document.getElementById("greeting").textContent = greeting;

  const full = "Md. Rasel Molla";
  const el = document.getElementById('heroName');
  [...full].forEach((ch, i) => {
    const s = document.createElement('span');
    s.className = 'char';
    s.textContent = ch === ' ' ? '\u00a0' : ch;
    s.style.animationDelay = (.3 + i * .045) + 's';
    el.appendChild(s);
  });
})();

/* ── Counter animation ── */
function animateCounters(){
  document.querySelectorAll('.stat-n').forEach(el => {
    const target = +el.dataset.target;
    let cur = 0;
    const step = () => { cur++; el.textContent = cur + (cur < target ? '' : '+'); if(cur < target) requestAnimationFrame(step); };
    step();
  });
}
let counted = false;
const heroObs = new IntersectionObserver(([e]) => { if(e.isIntersecting && !counted){ counted=true; animateCounters(); } }, {threshold:.5});
const heroSec = document.getElementById('self');
if(heroSec) heroObs.observe(heroSec);

/* ── Sidebar scroll progress ── */
const sbProg = document.getElementById('sbProg');
window.addEventListener('scroll', () => {
  const s = window.scrollY, t = document.body.scrollHeight - window.innerHeight;
  if(sbProg) sbProg.style.height = (t > 0 ? s/t*100 : 0) + '%';
});

/* ── Active nav ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.sidebar .nav-link');
const secObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id)); });
}, {threshold:.3});
sections.forEach(s => secObs.observe(s));

/* ── Reveal on scroll ── */
const rvEls = document.querySelectorAll('.rv');
const rvObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); rvObs.unobserve(e.target); }});
}, {threshold:.1});
rvEls.forEach(el => rvObs.observe(el));

/* ── Skill bars ── */
const barEls = document.querySelectorAll('.skill-fill');
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.style.width = e.target.dataset.pct + '%'; barObs.unobserve(e.target); }});
}, {threshold:.3});
barEls.forEach(b => barObs.observe(b));


function switchaTab(btn, panelId){
  document.querySelectorAll('.a-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.info-cards').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(panelId).classList.add('active');
}
/* ── Drawer ── */
function toggleDrawer(){ document.getElementById('drawer').classList.toggle('open'); }

/* ── Cert tabs ── */
function switchTab(btn, panelId){
  document.querySelectorAll('.c-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.c-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(panelId).classList.add('active');
}

/* ── Modals ── */
function openM(id){ document.getElementById(id).classList.add('open'); document.body.style.overflow='hidden'; }
function closeM(e, id){ if(e.target === document.getElementById(id)) byId(id); }
function byId(id){ document.getElementById(id).classList.remove('open'); document.body.style.overflow=''; }
