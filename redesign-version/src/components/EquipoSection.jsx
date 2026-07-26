// MILLA ABOGADOS — EquipoSection: glassmorphism cards con cursor-tracked golden glints.
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const team = [
  { initials: 'YG', role: 'Socio Director', name: 'Yohualli Emiliano García Milla', cred: 'Licenciado en Derecho · Maestrante en Alta Dirección' },
  { initials: 'EM', role: 'Abogada Titular', name: 'Erika Berenice Milla Sánchez', cred: 'Cédula profesional 12960091 · Maestrante' },
  { initials: 'HE', role: 'Directora de Operaciones', name: 'Hannia Michelle Estrada Alcalá', cred: 'Licenciada en Psicología · Maestrante en Alta Dirección' },
];

export function EquipoSection() {
  const container = useRef();
  useGSAP(() => {
    gsap.from('.team-card', { y: 40, opacity: 0, stagger: 0.15, duration: 0.8, scrollTrigger: { trigger: container.current, start: 'top 75%' } });
  }, { scope: container });

  return (
    <section ref={container} className="team-section" id="equipo">
      <div className="team-heading">
        <p className="section-kicker">Equipo</p>
        <h2>Responsabilidad con nombre propio.</h2>
      </div>
      <div className="team-grid">
        {team.map(m => (
          <article key={m.initials} className="team-card">
            <div className="member-mark">{m.initials}</div>
            <div className="member-copy">
              <p className="member-role">{m.role}</p>
              <h3>{m.name}</h3>
              <p className="member-credential">{m.cred}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
