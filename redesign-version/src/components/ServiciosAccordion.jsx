// MILLA ABOGADOS — ServiciosAccordion: 5 áreas de práctica interactivas con topic sync al formulario.
import { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const practices = [
  { id: 'corporativo', name: 'Corporativo', desc: 'Acompañamiento jurídico para ordenar la operación, anticipar riesgos y dar soporte a decisiones empresariales.' },
  { id: 'civil-familiar', name: 'Civil y Familiar', desc: 'Atención jurídica para decisiones personales, relaciones familiares, obligaciones y patrimonio.' },
  { id: 'laboral-mercantil', name: 'Laboral y Mercantil', desc: 'Soporte para ordenar relaciones laborales y comerciales, formalizar operaciones y atender controversias.' },
  { id: 'fiscal', name: 'Fiscal', desc: 'Análisis preventivo y atención de procedimientos para comprender obligaciones, documentación y saldos.' },
  { id: 'amparo', name: 'Amparo', desc: 'Evaluación constitucional de actos de autoridad para determinar oportunidad, vía y efectos.' },
];

export function ServiciosAccordion({ onSelectTopic }) {
  const [openId, setOpenId] = useState(null);

  return (
    <section className="services-section" id="servicios">
      <div className="services-heading">
        <h2>Una visión integral.<span>Un centro corporativo.</span></h2>
        <p>La práctica se organiza para comprender el conflicto completo, no sólo una rama aislada.</p>
      </div>
      <div className="practice-list">
        {practices.map(p => (
          <div key={p.id} className={`practice-item ${openId === p.id ? 'open' : ''}`}>
            <button className="practice-header" onClick={() => { setOpenId(openId === p.id ? null : p.id); onSelectTopic?.(p.name); }}>
              <span className="practice-name">{p.name}</span>
              <ChevronDown className={`practice-trigger ${openId === p.id ? 'rotate-180' : ''}`} />
            </button>
            {openId === p.id && <div className="practice-content"><p>{p.desc}</p></div>}
          </div>
        ))}
      </div>
    </section>
  );
}
