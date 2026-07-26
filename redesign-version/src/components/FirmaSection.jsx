// MILLA ABOGADOS — FirmaSection: historia de la firma y principios.
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function FirmaSection() {
  const container = useRef();
  useGSAP(() => {
    gsap.from('.firma-reveal', { y: 30, opacity: 0, stagger: 0.15, duration: 0.8, scrollTrigger: { trigger: container.current, start: 'top 80%' } });
    gsap.from('.firma-metric-card', { y: 20, opacity: 0, stagger: 0.1, duration: 0.6, scrollTrigger: { trigger: container.current, start: 'top 75%' } });
  }, { scope: container });

  return (
    <section ref={container} className="firm-intro" id="firma">
      <div className="section-index">01</div>
      <div className="firm-intro-content">
        <p className="section-kicker firma-reveal">Nuestra forma de ejercer</p>
        <h2 className="firma-reveal">El derecho exige precisión.<span>La confianza, presencia.</span></h2>
        <p className="firma-reveal">MILLA ABOGADOS nace con una idea sencilla: cada asunto merece una estrategia comprensible, una comunicación honesta y un seguimiento verdaderamente personal.</p>
        <div className="firma-metrics">
          <div className="firma-metric-card"><strong>Rigor</strong><p>Análisis profundo y estructurado</p></div>
          <div className="firma-metric-card"><strong>Claridad</strong><p>Estrategias sin lenguaje innecesario</p></div>
          <div className="firma-metric-card"><strong>Confidencialidad</strong><p>Protección absoluta de la información</p></div>
        </div>
      </div>
    </section>
  );
}
