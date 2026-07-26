// MILLA ABOGADOS — Premium Animation Engine. Scroll reveal, parallax, glassmorphism, menu, forms.

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isFinePointer = window.matchMedia('(pointer: fine)').matches;
const lerp = (start, end, factor) => start + (end - start) * factor;

document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initForm();
  if (!prefersReducedMotion) {
    initEnhancedReveal();
    initHeaderScroll();
    initActiveSection();
    initSmoothScroll();
    initAccordion();
    initRipple();
    initCounter();
    if (isFinePointer) { initCursorGlow(); initParallax(); }
  } else {
    initBasicReveal();
    initSmoothScrollBasic();
  }
  init3DSculpture();
});

function initMenu() {
  const menuButton = document.querySelector('.menu-button');
  const mobilePanel = document.querySelector('.mobile-panel');
  function setMenu(open) {
    if (!menuButton || !mobilePanel) return;
    menuButton.setAttribute('aria-expanded', String(open));
    mobilePanel.classList.toggle('is-open', open);
    mobilePanel.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  }
  menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  mobilePanel?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  window.closeMobileMenu = () => setMenu(false);
}

function initForm() {
  const legalInbox = document.querySelector('.legal-inbox');
  const formStatus = document.querySelector('.form-status');
  legalInbox?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!legalInbox.checkValidity()) { legalInbox.reportValidity(); return; }
    if (formStatus) formStatus.textContent = 'Demo local: formulario validado. Falta conectar el endpoint seguro del servidor.';
  });
}

function initBasicReveal() {
  document.querySelectorAll('.reveal,.section-index,.team-card,.method-steps li,.differentiators-grid article').forEach(el => {
    el.classList.add('is-visible'); el.style.opacity = '1'; el.style.transform = 'none';
  });
}

function initEnhancedReveal() {
  const style = document.createElement('style');
  style.textContent = '.reveal-fade-up{opacity:0;transform:translateY(30px) scale(.98);transition:opacity .8s ease-out,transform .8s ease-out}.reveal-slide-left{opacity:0;transform:translateX(-40px);transition:opacity .8s ease-out,transform .8s ease-out}.reveal-slide-up{opacity:0;transform:translateY(40px);transition:opacity .8s ease-out,transform .8s ease-out}.reveal-grid{opacity:0;transform:scale(.95);transition:opacity .6s ease-out,transform .6s ease-out}.is-visible.reveal-fade-up,.is-visible.reveal-slide-left,.is-visible.reveal-slide-up,.is-visible.reveal-grid{opacity:1;transform:none}';
  document.head.appendChild(style);
  document.querySelectorAll('.firm-intro-content').forEach(el => el.classList.add('reveal-fade-up'));
  document.querySelectorAll('.corporate-grid>div').forEach((el,i) => { el.classList.add('reveal-slide-left'); el.style.transitionDelay = `${i*100}ms`; });
  document.querySelectorAll('.method-steps li').forEach((el,i) => { el.classList.add('reveal-slide-left'); el.style.transitionDelay = `${i*150}ms`; });
  document.querySelectorAll('.team-card').forEach((el,i) => { el.classList.add('reveal-slide-up'); el.style.transitionDelay = `${i*150}ms`; });
  document.querySelectorAll('.differentiators-grid article').forEach((el,i) => { el.classList.add('reveal-grid'); el.style.transitionDelay = `${i*100}ms`; });
  document.querySelectorAll('.contact-card').forEach((el,i) => { el.classList.add('reveal-slide-up'); el.style.transitionDelay = `${i*150}ms`; });
  const elements = document.querySelectorAll('.reveal,.reveal-fade-up,.reveal-slide-left,.reveal-slide-up,.reveal-grid');
  const observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }); }, { threshold: 0.15 });
  elements.forEach(item => { observer.observe(item); });
}

function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  let isScrolled = false, ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) { window.requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      if (scrollY > 80 && !isScrolled) { header.classList.add('is-scrolled'); header.style.background = 'linear-gradient(to bottom,rgba(17,25,35,.92),rgba(17,25,35,.85))'; header.style.boxShadow = '0 10px 30px rgba(0,0,0,.15)'; header.style.backdropFilter = 'blur(12px)'; isScrolled = true; }
      else if (scrollY <= 80 && isScrolled) { header.classList.remove('is-scrolled'); header.style.background = ''; header.style.boxShadow = ''; header.style.backdropFilter = ''; isScrolled = false; }
      ticking = false;
    }); ticking = true; }
  }, { passive: true });
}

function initActiveSection() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav a');
  const observer = new IntersectionObserver((entries) => { entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => { link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--gold-300)' : ''; });
    }
  }); }, { rootMargin: '-40% 0px -60% 0px' });
  sections.forEach(sec => observer.observe(sec));
}

function initCursorGlow() {
  const glow = document.createElement('div'); glow.className = 'cursor-glow';
  glow.style.cssText = 'position:fixed;top:0;left:0;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(231,198,111,.08),transparent 70%);pointer-events:none;z-index:9999;transform:translate(-50%,-50%);display:none';
  document.body.appendChild(glow);
  let mouseX = innerWidth/2, mouseY = innerHeight/2, glowX = mouseX, glowY = mouseY, isVisible = false;
  window.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; if (!isVisible) { glow.style.display = 'block'; isVisible = true; } }, { passive: true });
  (function animateGlow() { glowX = lerp(glowX,mouseX,.1); glowY = lerp(glowY,mouseY,.1); glow.style.transform = `translate(calc(${glowX}px - 50%),calc(${glowY}px - 50%))`; requestAnimationFrame(animateGlow); })();
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => { anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href'); if (targetId === '#') return;
    const targetEl = document.querySelector(targetId);
    if (targetEl) { e.preventDefault(); if (window.closeMobileMenu) window.closeMobileMenu(); window.scrollTo({ top: targetEl.getBoundingClientRect().top + window.scrollY - 82, behavior: 'smooth' }); }
  }); });
}

function initSmoothScrollBasic() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => { anchor.addEventListener('click', function(e) {
    const targetEl = document.querySelector(this.getAttribute('href')); if (targetEl) { e.preventDefault(); window.scrollTo({ top: targetEl.offsetTop - 82 }); }
  }); });
}

function initAccordion() {
  document.querySelectorAll('.practice-item').forEach(details => {
    details.addEventListener('click', (e) => { if (e.target.closest('summary')) { e.preventDefault();
      if (details.hasAttribute('open')) { details.removeAttribute('open'); }
      else { document.querySelectorAll('.practice-item[open]').forEach(d => { if (d !== details) d.removeAttribute('open'); }); details.setAttribute('open', ''); }
    }});
  });
}

function initRipple() {
  document.querySelectorAll('.button').forEach(button => { button.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect(), size = Math.max(rect.width, rect.height);
    const ripple = document.createElement('span'); ripple.className = 'ripple';
    ripple.style.cssText = `position:absolute;border-radius:50%;background:rgba(231,198,111,.4);transform:scale(0);animation:ripple-anim .6s linear;pointer-events:none;width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px`;
    this.appendChild(ripple); setTimeout(() => ripple.remove(), 600);
  }); });
}

function initParallax() {
  const hero = document.querySelector('.hero'), orbit1 = document.querySelector('.hero-orbit-one'), orbit2 = document.querySelector('.hero-orbit-two');
  if (!hero||!orbit1||!orbit2) return;
  let mouseX=0,mouseY=0,targetX=0,targetY=0;
  hero.addEventListener('mousemove',(e)=>{const r=hero.getBoundingClientRect();targetX=((e.clientX-r.left)/r.width-.5)*2;targetY=((e.clientY-r.top)/r.height-.5)*2},{passive:true});
  (function animate(){mouseX=lerp(mouseX,targetX,.05);mouseY=lerp(mouseY,targetY,.05);orbit1.style.transform=`translate(${mouseX*20}px,${mouseY*20}px)`;orbit2.style.transform=`translate(${mouseX*-15}px,${mouseY*-15}px)`;requestAnimationFrame(animate)})();
}

async function init3DSculpture() {
  try { const stage = document.querySelector('.sculpture-stage'); if (stage) { const mod = await import('./sculpture3d.js'); if (mod.init) mod.init(stage); } }
  catch (err) { console.warn('3D sculpture failed to load, falling back to SVG:', err); }
}

function initCounter() {
  document.querySelectorAll('.section-index,.practice-number').forEach(el => {
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { const num = parseInt(el.textContent.trim(),10); if (!isNaN(num) && !el.dataset.counted) { el.dataset.counted='true'; let p=0; const anim=t=>{p=Math.min((t-performance.now())/300,1);el.textContent=Math.floor(p*num).toString().padStart(2,'0');if(p<1)requestAnimationFrame(anim);else el.textContent=el.textContent.padStart(2,'0')};requestAnimationFrame(anim);obs.unobserve(el);} } },{threshold:.5});
    obs.observe(el);
  });
}
