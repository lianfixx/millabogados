// Premium Navigation & Interactions — MILLA ABOGADOS
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-button');
  const mobilePanel = document.querySelector('.mobile-panel');
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    mobilePanel?.classList.toggle('is-open', open);
    mobilePanel?.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mobilePanel?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    mobilePanel.classList.remove('is-open');
    mobilePanel.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    menuButton.setAttribute('aria-expanded', 'false');
  }));
});
