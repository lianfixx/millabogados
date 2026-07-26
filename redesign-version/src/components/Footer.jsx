// MILLA ABOGADOS — Footer con brand, links legales y redes sociales.
export function Footer() {
  return (
    <footer className="site-footer">
      <a href="#inicio" className="footer-brand">MILLA <span>ABOGADOS</span></a>
      <div className="footer-meta">
        <p>Ciudad de México · Estado de México</p>
        <p>© 2026 MILLA ABOGADOS</p>
      </div>
      <nav className="footer-links">
        <div><span>Legal</span><a href="/aviso-de-privacidad">Aviso de Privacidad</a></div>
        <div><span>Redes</span><a href="https://instagram.com/millabogados">Instagram</a><a href="https://linkedin.com/company/millabogados">LinkedIn</a></div>
        <div><span>Contacto</span><a href="tel:+525561490498">+52 55 6149 0498</a><a href="mailto:socios@millabogados.com">socios@millabogados.com</a></div>
      </nav>
      <p className="footer-legal">El contenido de este sitio es informativo y no constituye asesoría jurídica. La prestación de servicios comienza únicamente mediante la aceptación formal del asunto.</p>
    </footer>
  );
}
