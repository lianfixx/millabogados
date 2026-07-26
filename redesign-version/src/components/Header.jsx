// MILLA ABOGADOS — Header con glassmorphism, 6 anchor links, mobile drawer.
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '#firma', label: 'Firma' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#equipo', label: 'Equipo' },
  { href: '#diferenciadores', label: 'Diferenciadores' },
  { href: '#asesoria-virtual', label: 'Asesoría Virtual' },
  { href: '#contacto', label: 'Contacto' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <a href="#inicio" className="brand" aria-label="MILLA ABOGADOS, inicio">
        <img src="/milla-logo-transparent.png" alt="MILLA ABOGADOS" className="brand-logo-image" width={58} height={58} />
      </a>
      <nav className="desktop-nav" aria-label="Navegación principal">
        {links.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
      </nav>
      <a href="#asesoria-virtual" className="header-advisory">Asesoría virtual ↗</a>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Cerrar menú' : 'Abrir menú'}>
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>
      {open && (
        <div className="mobile-panel is-open" role="dialog" aria-modal="true">
          <nav>{links.map((l, i) => <a key={l.href} href={l.href} onClick={() => setOpen(false)}><span>{String(i + 1).padStart(2, '0')}</span>{l.label}</a>)}</nav>
        </div>
      )}
    </header>
  );
}
