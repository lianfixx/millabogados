// MILLA ABOGADOS — MethodVisualizer: 4-step interactive process with document stack.
import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: '01', title: 'Escuchamos', desc: 'Conocemos el contexto, la urgencia y el resultado que realmente necesitas.' },
  { num: '02', title: 'Diagnosticamos', desc: 'Ordenamos hechos y documentos para identificar riesgos, opciones y prioridades.' },
  { num: '03', title: 'Diseñamos', desc: 'Presentamos una estrategia comprensible, alcance definido y ruta de actuación.' },
  { num: '04', title: 'Acompañamos', desc: 'Ejecutamos, comunicamos avances y ajustamos la estrategia cuando el asunto lo exige.' },
];

export function MethodVisualizer() {
  const [active, setActive] = useState(0);
  const container = useRef();

  useGSAP(() => {
    gsap.from('.method-step', { x: -30, opacity: 0, stagger: 0.2, duration: 0.7, scrollTrigger: { trigger: container.current, start: 'top 70%' } });
  }, { scope: container });

  return (
    <section ref={container} className="method-section" id="diferenciadores">
      <div className="method-title-wrap">
        <p className="section-kicker">Método de trabajo</p>
        <h2>Claridad en cada etapa.</h2>
        <div className="method-visual">
          <div className={`method-document method-document-back ${active >= 2 ? 'shifted' : ''}`}><span>Contexto</span></div>
          <div className={`method-document method-document-front ${active >= 3 ? 'shifted' : ''}`}><span>Estrategia</span><strong>{String(active + 1).padStart(2, '0')}</strong></div>
        </div>
      </div>
      <div className="method-steps">
        {steps.map((s, i) => (
          <div key={s.num} className={`method-step ${active === i ? 'active' : ''}`} onClick={() => setActive(i)} onKeyDown={e => e.key === 'Enter' && setActive(i)} tabIndex={0} role="button">
            <span>{s.num}</span>
            <strong>{s.title}</strong>
            {active === i && <p>{s.desc}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
